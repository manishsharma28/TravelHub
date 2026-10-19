import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import type { EnquiryResponse } from '@travelhub/shared';
import { asyncRoute } from '../lib/asyncRoute.js';
import { sendEnquiryEmail } from '../lib/mailer.js';
import { findPackage } from '../lib/query.js';

export const enquiriesRouter: Router = Router();

const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80),
  email: z.string().trim().email('Please enter a valid email'),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s-]{7,15}$/, 'Please enter a valid phone number'),
  packageId: z.string().trim().optional(),
  destination: z.string().trim().max(80).optional(),
  travelDate: z.string().trim().optional(),
  travellers: z.coerce.number().int().positive().max(50).optional(),
  message: z.string().trim().max(1000).optional(),
});

/**
 * Each enquiry is emailed to the team (see lib/mailer.ts) — the inbox is the
 * record, since Lambda instances are recycled and keep nothing between runs.
 */
enquiriesRouter.post(
  '/enquiries',
  asyncRoute(async (req, res) => {
    const parsed = enquirySchema.safeParse(req.body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const details = Object.fromEntries(
        Object.entries(fieldErrors).map(([key, msgs]) => [key, msgs?.[0] ?? 'Invalid value']),
      );
      return res.status(400).json({ error: 'Please correct the highlighted fields', details });
    }

    const pkg = parsed.data.packageId ? findPackage(parsed.data.packageId) : undefined;
    if (parsed.data.packageId && !pkg) {
      return res.status(404).json({ error: 'The selected package no longer exists' });
    }

    const record = { ...parsed.data, id: randomUUID(), createdAt: new Date().toISOString() };

    try {
      await sendEnquiryEmail({ ...record, packageTitle: pkg?.title });
    } catch (err) {
      // Without the email nothing is kept, so tell the traveller rather than fake success.
      const reason = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
      console.error(`[travelhub] enquiry email failed for ${record.id}: ${reason}`);
      return res.status(502).json({
        error: 'Sorry, we couldn’t send your enquiry just now. Please try again, or message us on WhatsApp.',
      });
    }

    const body: EnquiryResponse = {
      id: record.id,
      status: 'received',
      createdAt: record.createdAt,
      message: 'Thanks! Our travel expert will call you within 24 hours with a custom quote.',
    };
    return res.status(201).json(body);
  }),
);
