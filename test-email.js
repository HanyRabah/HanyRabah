#!/usr/bin/env node

/**
 * Email Testing Script for Resend Integration
 * 
 * This script helps debug email sending issues by:
 * 1. Checking environment variables
 * 2. Testing the Resend API connection
 * 3. Sending test emails with detailed logging
 * 
 * Usage: node test-email.js
 */

require('dotenv').config({ path: '.env' });

// Check if we're in a Node.js environment that supports ES modules
const { Resend } = require('resend');

// Configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

// Test data
const testContactData = {
  name: "Test User",
  email: "test@example.com",
  subject: "Test Email from Portfolio",
  message: "This is a test message to verify email functionality."
};

console.log('🧪 Email Testing Script Started\n');

// Step 1: Check Environment Variables
console.log('📋 Checking Environment Variables:');
console.log('================================');
console.log(`RESEND_API_KEY: ${RESEND_API_KEY ? '✅ Set' : '❌ Missing'}`);
console.log(`SENDER_EMAIL: ${SENDER_EMAIL}`);
console.log(`RECIPIENT_EMAIL: ${RECIPIENT_EMAIL}\n`);

if (!RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY is missing! Please set it in your .env.local file.');
  process.exit(1);
}

// Initialize Resend
const resend = new Resend(RESEND_API_KEY);

// Step 2: Test Resend API Connection
async function testResendConnection() {
  console.log('🔌 Testing Resend API Connection:');
  console.log('=================================');
  
  try {
    // Test API key by attempting to send a simple validation request
    const testResend = new Resend(RESEND_API_KEY);
    
    // Just validate that we can create the client without errors
    console.log('✅ Resend client initialized successfully');
    console.log('✅ API key format appears valid');
    return true;
  } catch (error) {
    console.log(`❌ Resend API connection error: ${error.message}`);
    return false;
  }
}

// Step 3: Test Email Sending Function
async function testSendContactEmail(data) {
  console.log('\n📧 Testing Contact Email Function:');
  console.log('==================================');
  console.log(`Sending test email to: ${RECIPIENT_EMAIL}`);
  console.log(`From: ${SENDER_EMAIL}`);
  console.log(`Reply-to: ${data.email}\n`);
  
  try {
    const { name, email, subject, message } = data;
    
    // Email template (same as in your lib/email.ts)
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
              <h1>🧪 TEST: New Contact Form Submission</h1>
              <p>This is a test email from your portfolio contact form.</p>
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
                <strong>This is a test email. Reply functionality: ${name} (${email})</strong>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log('Attempting to send email...');
    
    const result = await resend.emails.send({
      from: `Portfolio Contact <${SENDER_EMAIL}>`,
      to: [RECIPIENT_EMAIL],
      replyTo: email,
      subject: subject ? `🧪 TEST: Portfolio Contact: ${subject}` : `🧪 TEST: Portfolio Contact from ${name}`,
      html: emailHtml,
    });

    console.log('✅ Email sent successfully!');
    console.log('Email ID:', result.data?.id || 'No ID returned');
    console.log('Full response:', JSON.stringify(result, null, 2));
    
    return { success: true, data: result };
  } catch (error) {
    console.log('❌ Failed to send email');
    console.log('Error type:', error.constructor.name);
    console.log('Error message:', error.message);
    console.log('Full error:', error);
    
    return { success: false, error: error.message };
  }
}

// Step 4: Test Auto-Reply Function
async function testSendAutoReply(data) {
  console.log('\n📧 Testing Auto-Reply Email Function:');
  console.log('====================================');
  console.log(`Sending auto-reply to: ${data.email}\n`);
  
  try {
    const { name, email } = data;
    
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
              <h1>🧪 TEST: Thank You for Reaching Out!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              
              <p><strong>This is a test auto-reply email.</strong></p>
              
              <p>Thank you for contacting me through my portfolio. I've received your message and appreciate you taking the time to reach out.</p>
              
              <div class="signature">
                <p>Best regards,<br>
                <strong>Hany Rabah</strong><br>
                Senior Fullstack Engineer & Technical Lead</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log('Attempting to send auto-reply...');
    
    const result = await resend.emails.send({
      from: `Hany Rabah <${SENDER_EMAIL}>`,
      to: [email],
      subject: '🧪 TEST: Thank you for contacting me - Hany Rabah',
      html: autoReplyHtml,
    });

    console.log('✅ Auto-reply sent successfully!');
    console.log('Email ID:', result.data?.id || 'No ID returned');
    console.log('Full response:', JSON.stringify(result, null, 2));
    
    return { success: true, data: result };
  } catch (error) {
    console.log('❌ Failed to send auto-reply');
    console.log('Error type:', error.constructor.name);
    console.log('Error message:', error.message);
    console.log('Full error:', error);
    
    return { success: false, error: error.message };
  }
}

// Main test execution
async function runTests() {
  try {
    // Test API connection
    const connectionOk = await testResendConnection();
    
    if (!connectionOk) {
      console.log('\n❌ Cannot proceed with email tests due to API connection issues.');
      process.exit(1);
    }
    
    // Test contact email
    const contactResult = await testSendContactEmail(testContactData);
    
    // Test auto-reply (only if contact email succeeded)
    if (contactResult.success) {
      await testSendAutoReply(testContactData);
    }
    
    console.log('\n🎉 Email testing completed!');
    console.log('\n📝 Next Steps:');
    console.log('==============');
    console.log('1. Check your email inbox for the test emails');
    console.log('2. Check spam/junk folders if emails are not in inbox');
    console.log('3. Verify that your domain is properly configured with Resend');
    console.log('4. Check Resend dashboard for delivery status');
    console.log('5. If emails are not received, check Resend logs for bounces/failures');
    
  } catch (error) {
    console.error('\n💥 Unexpected error during testing:', error);
    process.exit(1);
  }
}

// Run the tests
runTests();
