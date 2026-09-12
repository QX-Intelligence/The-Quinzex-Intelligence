# Quinzex Intelligence — Themed Email Templates

Official email templates designed to 1:1 match the **Quinzex Intelligence Alpine Montfort** design system:
- **Base Canvas**: Soft alpine slate/ice grey (`#dce5ec`)
- **Primary Color**: Deep Montfort Navy (`#0f3554`)
- **Secondary Colors**: `#2d4f6e`, `#56728d`
- **Typography**: Montserrat (Headings) & Plus Jakarta Sans (Body)
- **UI Elements**: Signature 9999px rounded navy pills, subtle alpine border dividers (`rgba(15, 53, 84, 0.12)`), and crisp white content cards.

---

## 1. Incoming Inquiry Notification (For Quinzex Inbox)
- **File**: [`executive-inquiry-template.html`](./executive-inquiry-template.html)
- **Use Case**: Sent to `hello@quinzexintelligence.com` whenever a visitor submits any contact form.
- **Subject in EmailJS**:
  ```text
  [Quinzex {{service}}] New Inquiry from {{from_name}}
  ```
- **To Email**: `hello@quinzexintelligence.com`
- **Reply-To**: `{{reply_to}}` or `{{from_email}}`
- **Design Elements**:
  - Branded Montserrat header with `NEW INQUIRY` pill badge
  - Editorial title: `START A CONVERSATION`
  - Structured metadata grid (Full Name, Company, Work Email, Service Track, Budget)
  - Left-accented project brief quotation box
  - Iconic rounded Montfort Navy pill button: `REPLY TO CLIENT →`
  - Timezone and location footer (US, EU, APAC &bull; San Francisco, London, Geneva)

---

## 2. Client Confirmation / Auto-Reply (For Visitor)
- **File**: [`client-confirmation-template.html`](./client-confirmation-template.html)
- **Use Case**: Sent directly to the client's email (`{{from_email}}`) acknowledging receipt.
- **Subject in EmailJS**:
  ```text
  We Received Your Inquiry — Quinzex Intelligence
  ```
- **To Email**: `{{from_email}}`
- **Design Elements**:
  - `MESSAGE RECEIVED` pill badge
  - `We Received Your Inquiry.` editorial headline
  - Summary of submitted scope (Service Track, Budget, Contact Email)
  - Fast-track discovery call callout with direct link to `https://cal.com/quinzex/discovery`
  - 1-business-day response SLA note
  - Official team signoff

---

## Live Preview
You can view the interactive preview in your local browser at:
**[http://localhost:5173/email-templates/preview.html](http://localhost:5173/email-templates/preview.html)**

---

## Installation in EmailJS Dashboard
1. Go to your [EmailJS Dashboard](https://dashboard.emailjs.com/) > **Email Templates**.
2. Click **Create New Template**.
3. Toggle to the **Code Editor** (`<>` icon).
4. Paste the entire content of [`executive-inquiry-template.html`](./executive-inquiry-template.html) (for notifications) or [`client-confirmation-template.html`](./client-confirmation-template.html) (for auto-replies).
5. Click **Save**.
