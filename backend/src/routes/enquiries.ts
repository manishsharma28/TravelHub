import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import type { EnquiryResponse } from '@travelhub/shared';
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
  travelDate: z.string().trim().optional(),
  travellers: z.coerce.number().int().positive().max(50).optional(),
  message: z.string().trim().max(1000).optional(),
});

/**
 * Demo sink for enquiries. Swap this array for DynamoDB / SES in production —
 * Lambda instances are recycled, so nothing written here survives long.
 */
const received: Array<z.infer<typeof enquirySchema> & { id: string; createdAt: string }> = [];

enquiriesRouter.post('/enquiries', (req, res) => {
  const parsed = enquirySchema.safeParse(req.body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const details = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, msgs]) => [key, msgs?.[0] ?? 'Invalid value']),
    );
    return res.status(400).json({ error: 'Please correct the highlighted fields', details });
  }

  if (parsed.data.packageId && !findPackage(parsed.data.packageId)) {
    return res.status(404).json({ error: 'The selected package no longer exists' });
  }

  const record = { ...parsed.data, id: randomUUID(), createdAt: new Date().toISOString() };
  received.push(record);

  const body: EnquiryResponse = {
    id: record.id,
    status: 'received',
    createdAt: record.createdAt,
    message: 'Thanks! Our travel expert will call you within 24 hours with a custom quote.',
  };
  return res.status(201).json(body);
});
