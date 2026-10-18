import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

/** Where enquiry emails go. Unset locally, so `npm run dev` never sends real mail. */
const TO = process.env.ENQUIRY_EMAIL_TO;
/** Must be verified in SES — either this address itself or its whole domain. */
const FROM = process.env.ENQUIRY_EMAIL_FROM ?? TO;

const ses = new SESv2Client({});

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
 * Emails a new enquiry to the team, with Reply-To set to the traveller so a
 * reply from the inbox goes straight back to them.
 */
export const sendEnquiryEmail = async (enquiry: EnquiryDetails): Promise<void> => {
  if (!TO || !FROM) {
    console.log(`[travelhub] ENQUIRY_EMAIL_TO not set; skipping email for enquiry ${enquiry.id}`);
    return;
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

  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: `Unmapped Trips Website <${FROM}>`,
      Destination: { ToAddresses: [TO] },
      ReplyToAddresses: [enquiry.email],
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: 'UTF-8' },
          Body: {
            Text: { Data: text, Charset: 'UTF-8' },
            Html: { Data: html, Charset: 'UTF-8' },
          },
        },
      },
    }),
  );
};
