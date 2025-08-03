import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactEmailData {
  name: string
  email: string
  subject?: string
  message: string
}

const SENDER_EMAIL = process.env.SENDER_EMAIL as string;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL as string;

export async function sendContactEmail(data: ContactEmailData) {
  try {
    const { name, email, subject, message } = data
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #14b8a6; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #14b8a6; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #14b8a6; }
            .message-box { background: white; padding: 15px; border-radius: 4px; border: 1px solid #ddd; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
              <p>You have received a new message through your portfolio contact form.</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              
              ${subject ? `
                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${subject}</div>
                </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${message}</div>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #e6f7ff; border-radius: 4px; border-left: 4px solid #14b8a6;">
                <strong>Reply directly to this email to respond to ${name}.</strong>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const result = await resend.emails.send({
      from: `Portfolio Contact <${SENDER_EMAIL}>`,
      to: [RECIPIENT_EMAIL],
      replyTo: email,
      subject: subject ? `Portfolio Contact: ${subject}` : `Portfolio Contact from ${name}`,
      html: emailHtml,
    })

    return { success: true, data: result }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendAutoReply(data: ContactEmailData) {
  try {
    const { name, email } = data
    
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Thank you for contacting Hany Rabah</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #14b8a6; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
            .social-links { margin-top: 20px; }
            .social-links a { display: inline-block; margin-right: 15px; color: #14b8a6; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Reaching Out!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              
              <p>Thank you for contacting me through my portfolio. I've received your message and appreciate you taking the time to reach out.</p>
              
              <p>I typically respond to all inquiries within 24-48 hours. If your message is urgent, feel free to connect with me on LinkedIn for a faster response.</p>
              
              <p>In the meantime, feel free to:</p>
              <ul>
                <li>Check out my latest projects on <a href="https://hanyrabah.com/#projects" style="color: #14b8a6;">my portfolio</a></li>
                <li>Read my technical blog posts at <a href="https://hanyrabah.com/blog" style="color: #14b8a6;">hanyrabah.com/blog</a></li>
                <li>Connect with me on <a href="https://www.linkedin.com/in/hanyrabah/" style="color: #14b8a6;">LinkedIn</a></li>
              </ul>
              
              <div class="signature">
                <p>Best regards,<br>
                <strong>Hany Rabah</strong><br>
                Senior Fullstack Engineer & Technical Lead</p>
                
                <div class="social-links">
                  <a href="https://hanyrabah.com">Portfolio</a>
                  <a href="https://www.linkedin.com/in/hanyrabah/">LinkedIn</a>
                  <a href="https://github.com/hanyrabah">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const result = await resend.emails.send({
      from: `Hany Rabah <${SENDER_EMAIL}>`,
      to: [email],
      subject: 'Thank you for contacting me - Hany Rabah',
      html: autoReplyHtml,
    })

    return { success: true, data: result }
  } catch (error) {
    console.error('Failed to send auto-reply:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
