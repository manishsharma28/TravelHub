import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Local dev reads backend/.env. On Lambda the file is absent and the function
// environment, set in Amplify, supplies the same variables.
config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '../../.env') });

/** Enquiry mail always goes to this inbox, from the same address, unless overridden. */
const INBOX = 'info@unmappedtrips.com';
const TO = process.env.ENQUIRY_EMAIL_TO || INBOX;
const FROM = process.env.ENQUIRY_EMAIL_FROM || INBOX;

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.zoho.in';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER || FROM;
const SMTP_PASS = process.env.SMTP_PASS || '';

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

export interface EnquiryDetails {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  destination?: string;
  packageTitle?: string;
  travelDate?: string;
  travellers?: number;
  message?: string;
}

const receivedFormat = new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Asia/Kolkata',
});
const travelDateFormat = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeZone: 'UTC' });

/** "2027-06-12" (from <input type="date">) → "12 Jun 2027"; anything unparseable passes through. */
const formatTravelDate = (value: string) => {
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : travelDateFormat.format(date);
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Emails a new enquiry to the team through the Zoho mailbox. Reply-To is the
 * traveller, so a reply from the inbox goes straight back to them.
 */
export const sendEnquiryEmail = async (enquiry: EnquiryDetails): Promise<void> => {
  if (!SMTP_PASS) {
    throw new Error('SMTP_PASS is not set. Add the Zoho mailbox password to backend/.env');
  }

  const rows: Array<[string, string | undefined]> = [
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Phone', enquiry.phone],
    ['Destination', enquiry.destination],
    ['Package', enquiry.packageTitle],
    ['Travel date', enquiry.travelDate && formatTravelDate(enquiry.travelDate)],
    ['Travellers', enquiry.travellers?.toString()],
    ['Message', enquiry.message],
    ['Received', receivedFormat.format(new Date(enquiry.createdAt))],
    ['Reference', enquiry.id],
  ];

  const topic = enquiry.packageTitle ?? enquiry.destination;
  const subject = `New enquiry: ${enquiry.name}${topic ? ` — ${topic}` : ''}`.replace(/[\r\n]+/g, ' ');

  const text = rows.map(([label, value]) => `${label}: ${value || '—'}`).join('\n');
  const html = `<h2 style="font-family:sans-serif;color:#0d1e2d">New website enquiry</h2>
<table cellpadding="8" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
${rows
  .map(
    ([label, value]) =>
      `<tr><th align="left" valign="top" style="color:#64748b;border-bottom:1px solid #e2e8f0">${label}</th>` +
      `<td style="border-bottom:1px solid #e2e8f0;white-space:pre-wrap">${escapeHtml(value || '—')}</td></tr>`,
  )
  .join('\n')}
</table>
<p style="font-family:sans-serif;font-size:12px;color:#64748b">Reply to this email to respond to ${escapeHtml(enquiry.name)} directly.</p>`;

  await transport.sendMail({
    from: `Unmapped Trips Website <${FROM}>`,
    to: TO,
    replyTo: enquiry.email,
    subject,
    text,
    html,
  });
};
