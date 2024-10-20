# BuildSMTP
## Overview
This guide explains how to build a mail server capable of sending and receiving emails. It provides a simplified explanation of the process and introduces concepts like DNS queries, MX records, SPF, DKIM, and DMARC.

### Basic Workflow: Sending an Email
Let’s walk through the process of sending an email from **srbh@gmail.com** to **send@outlook.com**:

1. **Domain Lookup**: The first step is to check the recipient’s domain, which in this case is `outlook.com`.
2. **DNS Query for MX Record**: Your server will perform a DNS query to get the **MX (Mail Exchange)** record for `outlook.com`. This tells you which mail server will handle emails for that domain.
    - For example: The MX record might resolve to `mailserver.com`.
3. **Query for A Record**: Your server then queries `mailserver.com` for its **A record**, which provides the IP address of the mail server.
    - Let’s say it returns `1.4.3.2`, which means all emails sent to `outlook.com` will be handled by this server at that IP address.
4. **Sending the Email**: With the IP in hand, your server will route the email to the appropriate mail server (`mailserver.com`), which then delivers it to the recipient.

### Custom Domain Example
If you own a custom domain like **saurabh.com**, and you’ve set up your email as **srbh@saurabh.com**, the same process applies:

- **Sending email to srbh@saurabh.com**: The MX record might point to a mail handler like `skiff.com`, which would then handle the incoming emails.

---

## SPF Record (Sender Policy Framework)
SPF records are used to prevent email spoofing. They specify which servers are allowed to send emails on behalf of your domain. This helps ensure that if someone tries to send an email pretending to be you, it can be flagged as spam.

### Example
Suppose your domain is `saurabh.com` and you have configured an SPF record to allow `skiff.com` to send emails on your behalf:
- If Gmail receives an email from **mail@saurabh.com**, it will check the SPF record for `saurabh.com`.
- If the email is sent from `skiff.com` (as per the SPF record), Gmail will consider it valid.
- If it comes from another server, Gmail will flag it as spam.

---

## DKIM (DomainKeys Identified Mail)
DKIM adds an encrypted signature to your emails to verify their authenticity. When you send an email from **mail@saurabh.com**, a private key is used to sign the message.

### How it Works:
- When Gmail receives the email, it queries your domain for its **DKIM record** and retrieves the public key.
- Gmail uses the public key to verify the signature. If the signature is valid, the email is authentic. If not, it might be spam.
  
If you’ve delegated email handling to `skiff.com`, you need to set up the DKIM record on `skiff.com`, allowing Gmail to validate emails from that domain.

---

## DMARC (Domain-based Message Authentication, Reporting, and Conformance)
DMARC is used to decide what to do when an email fails SPF or DKIM checks. The policy can be set to:

- **None**: Accept the email even if it fails the checks.
- **Quarantine**: Mark the email as spam.
- **Reject**: Block the email entirely.

---

## Mail Server Architecture

When setting up a mail server, you'll typically have a domain and an MX record to handle email traffic. The server will listen on specific ports depending on the protocol:

- **SMTP (Simple Mail Transfer Protocol)**: Port 25
- **SMTPS (Secure SMTP)**: Port 465

For example:
- Domain: `gmailclone.com`
- MX Record: `mail.gmailclone.com`
- IP Address: `4.5.6.7`

Emails sent to `gmailclone.com` will be routed through `mail.gmailclone.com` and handled at IP `4.5.6.7`.

### Note:
- SMTP works over TCP.
- You can use a Node.js package like `smtp-server` to create and configure an SMTP server.

---

## Summary of Key Concepts

1. **MX Record**: Specifies which mail server handles email for a domain.
2. **A Record**: Provides the IP address of the mail server.
3. **SPF**: Prevents unauthorized servers from sending emails on behalf of your domain.
4. **DKIM**: Uses encryption to ensure the authenticity of an email.
5. **DMARC**: Defines what to do when an email fails authentication checks.

With these tools, you can set up a mail server and manage the sending and receiving of emails securely.
