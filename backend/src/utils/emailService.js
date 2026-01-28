// ==========================================
// EMAIL SERVICE - Handles all email sending
// ==========================================
// 
// 📚 LEARNING CONCEPTS:
// 1. Nodemailer - Popular Node.js email library
// 2. SMTP - Simple Mail Transfer Protocol (how emails are sent)
// 3. Transporter - The configured email sender
// 4. Environment variables - Secure way to store credentials
// 5. Async/await - Handling asynchronous operations

const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// ==========================================
// TRANSPORTER CONFIGURATION
// ==========================================
// 
// Think of the transporter as your "email account" that sends emails.
// We configure it once and reuse it for all emails.
// 
// For development, we'll use Gmail (easy to set up)
// For production, you'd use services like SendGrid, AWS SES, etc.

// Create transporter synchronously - NO verify() (causes connection timeout on Railway)
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ Email credentials not configured. Email sending will be disabled.');
    console.warn('   EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Missing');
    console.warn('   EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing');
    return null;
  }
  try {
    // Try port 465 (SSL) first if EMAIL_PORT not explicitly set, as it's more reliable from cloud platforms
    const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 465;
    const secure = port === 465 || process.env.EMAIL_SECURE === 'true';
    
    const config = {
      service: 'gmail',
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: port,
      secure: secure, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { 
        rejectUnauthorized: false,
        ciphers: 'SSLv3' // Sometimes helps with connection issues
      },
      connectionTimeout: 20000, // Increased timeout for Gmail
      greetingTimeout: 20000,
      socketTimeout: 30000,
      // Additional options for better Gmail compatibility
      pool: true, // Use connection pooling
      maxConnections: 1,
      maxMessages: 3,
    };
    console.log('📧 Creating email transporter:', {
      host: config.host,
      port: config.port,
      secure: config.secure,
      user: config.auth.user,
      pass: config.auth.pass ? '***' : 'MISSING',
      timeout: config.connectionTimeout
    });
    return nodemailer.createTransport(config);
  } catch (error) {
    console.error('❌ Error creating email transporter:', error.message);
    console.error('   Stack:', error.stack);
    return null;
  }
};

// ==========================================
// SEND OTP EMAIL
// ==========================================
// 
// This function sends the OTP code to the user's email
// 
// Parameters:
// - email: recipient's email address
// - otp: the 6-digit code
// - name: user's name for personalization

const sendOtpEmail = async (email, otp, name) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.warn('⚠️ Email transporter not available. Skipping email send.');
      return { success: false, error: 'Email service not configured' };
    }

    // Email options - defines what the email contains
    const mailOptions = {
      from: `"Premass Overseas" <${process.env.EMAIL_USER}>`, // Sender name & email
      to: email,                                                // Recipient
      subject: '🔐 Your OTP Code - Premass Overseas',          // Email subject
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              background-color: #f4f4f4; 
              padding: 20px; 
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: white; 
              padding: 30px; 
              border-radius: 10px; 
              box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
            }
            .header { 
              background: linear-gradient(135deg, #0A3A5E 0%, #1a5a8e 100%);
              color: white; 
              padding: 20px; 
              text-align: center; 
              border-radius: 8px; 
              margin-bottom: 30px;
            }
            .otp-code { 
              font-size: 32px; 
              font-weight: bold; 
              color: #F5A623; 
              text-align: center; 
              padding: 20px; 
              background: #f9fafb; 
              border-radius: 8px; 
              letter-spacing: 8px;
              margin: 20px 0;
            }
            .info { 
              color: #64748b; 
              font-size: 14px; 
              text-align: center; 
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #9ca3af;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🌍 Premass Overseas</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Your Education Journey Partner</p>
            </div>
            
            <h2 style="color: #0A3A5E;">Hello ${name}! 👋</h2>
            
            <p style="color: #374151; line-height: 1.6;">
              Thank you for registering with Premass Overseas. To complete your registration, 
              please verify your email using the OTP code below:
            </p>
            
            <div class="otp-code">
              ${otp}
            </div>
            
            <div class="info">
              <p>⏰ This code will expire in <strong>10 minutes</strong></p>
              <p>🔒 For security, never share this code with anyone</p>
              <p>❓ If you didn't request this, please ignore this email</p>
            </div>
            
            <div class="footer">
              <p>© 2026 Premass Overseas. All rights reserved.</p>
              <p>Your trusted partner for overseas education</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    let timeoutId;
    const sendPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, rej) => {
      timeoutId = setTimeout(() => rej(new Error('Email send timeout (15s)')), 15000);
    });
    let info;
    try {
      info = await Promise.race([sendPromise, timeoutPromise]);
      clearTimeout(timeoutId);
      console.log('✅ OTP email sent successfully to', email, '| MessageID:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (e) {
      clearTimeout(timeoutId);
      throw e;
    }
  } catch (error) {
    // Detailed error logging for debugging
    const errorDetails = {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      stack: error.stack
    };
    console.error('❌ OTP EMAIL SEND FAILED for', email);
    console.error('   Error message:', error.message);
    console.error('   Error code:', error.code);
    console.error('   SMTP response:', error.response);
    console.error('   SMTP code:', error.responseCode);
    if (error.code === 'EAUTH') {
      console.error('   ⚠️ AUTHENTICATION FAILED - Check EMAIL_USER and EMAIL_PASS in Railway env vars');
      console.error('   ⚠️ Make sure you\'re using a Gmail App Password, not your regular password');
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      console.error('   ⚠️ CONNECTION FAILED - Gmail SMTP might be blocking Railway IP');
    } else if (error.code === 'EENVELOPE') {
      console.error('   ⚠️ INVALID EMAIL ADDRESS');
    }
    return { success: false, error: error.message || String(error), details: errorDetails };
  }
};

// ==========================================
// SEND WELCOME EMAIL (BONUS)
// ==========================================
// 
// After successful OTP verification, we can send a welcome email

const sendWelcomeEmail = async (email, name, role) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.warn('⚠️ Email transporter not available. Skipping welcome email.');
      return { success: false, error: 'Email service not configured' };
    }

    // Use production frontend URL from environment or default
    const frontendUrl = process.env.FRONTEND_URL || process.env.CORS_ORIGIN || 'https://www.premassoverseas.com';
    const dashboardLink = role === 'student' 
      ? `${frontendUrl}/dashboard/student` 
      : `${frontendUrl}/dashboard/employee`;

    const mailOptions = {
      from: `"Premass Overseas" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🎉 Welcome to Premass Overseas!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #0A3A5E 0%, #1a5a8e 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 30px; }
            .btn { display: inline-block; background: #F5A623; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🌍 Premass Overseas</h1>
            </div>
            
            <h2 style="color: #0A3A5E;">Welcome aboard, ${name}! 🎉</h2>
            
            <p style="color: #374151; line-height: 1.6;">
              Your email has been successfully verified. You're now part of the Premass Overseas community!
            </p>
            
            <p style="color: #374151; line-height: 1.6;">
              ${role === 'student' 
                ? 'As a student, you can now create support tickets, track your applications, and get assistance from our team.' 
                : 'As an employee, you can now manage student tickets and provide support.'}
            </p>
            
            <div style="text-align: center;">
              <a href="${dashboardLink}" class="btn">Go to Dashboard →</a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px; text-align: center;">
              <p>© 2026 Premass Overseas. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

// Export functions so they can be used in other files
module.exports = {
  sendOtpEmail,
  sendWelcomeEmail,
};
