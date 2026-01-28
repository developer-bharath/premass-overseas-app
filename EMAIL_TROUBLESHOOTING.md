# Email Troubleshooting Guide - OTP Not Reaching Inbox

## Current Status
✅ OTPs are being **generated** and logged in Railway  
❌ OTPs are **NOT reaching** customer email inboxes

---

## Step 1: Check Railway Logs for Email Errors

After a registration attempt, check **Railway → Deploy Logs** for:

### ✅ Success Logs:
```
✅ OTP email sent successfully to user@example.com | MessageID: <...>
```

### ❌ Error Logs to Look For:

1. **Authentication Error (EAUTH):**
   ```
   ❌ OTP EMAIL SEND FAILED for user@example.com
      Error code: EAUTH
      ⚠️ AUTHENTICATION FAILED - Check EMAIL_USER and EMAIL_PASS
   ```
   **Fix:** Gmail app password is wrong or expired.

2. **Connection Error (ECONNECTION/ETIMEDOUT):**
   ```
   Error code: ECONNECTION
   ⚠️ CONNECTION FAILED - Gmail SMTP might be blocking Railway IP
   ```
   **Fix:** Gmail might be blocking Railway's IP. Try a different email service or whitelist.

3. **Invalid Email (EENVELOPE):**
   ```
   Error code: EENVELOPE
   ⚠️ INVALID EMAIL ADDRESS
   ```
   **Fix:** Check the email address format.

4. **Timeout:**
   ```
   Error: Email send timeout (15s)
   ```
   **Fix:** Gmail SMTP is too slow. Consider using a faster email service.

---

## Step 2: Verify Gmail App Password Setup

### Current Railway Environment Variables:
- `EMAIL_USER="premass.overseas@gmail.com"`
- `EMAIL_PASS="nmtakwmpgbesmbvs"`
- `EMAIL_HOST="smtp.gmail.com"`
- `EMAIL_PORT="587"`
- `EMAIL_SECURE="false"`

### ✅ How to Generate/Verify Gmail App Password:

1. **Go to Google Account:** https://myaccount.google.com/
2. **Security** → **2-Step Verification** (must be enabled)
3. **App passwords** → **Select app** → **Mail** → **Select device** → **Generate**
4. **Copy the 16-character password** (no spaces)
5. **Update Railway:**
   - Railway → Project → Variables
   - Update `EMAIL_PASS` with the new app password
   - **Redeploy** (or restart service)

### ⚠️ Common Issues:

- **"Less secure app access"** is disabled → Use **App Password** (not regular password)
- **App password expired** → Generate a new one
- **Wrong password copied** → Make sure no spaces, all 16 characters
- **2-Step Verification not enabled** → Enable it first, then create app password

---

## Step 3: Test Email Connection

After updating Railway env vars, **restart the service** and try registering again. Check logs for:

```
📧 Creating email transporter: { host: 'smtp.gmail.com', port: 587, ... }
```

If you see **"AUTHENTICATION FAILED"**, the app password is wrong.

---

## Step 4: Alternative Solutions

### Option A: Use a Different Email Service (Recommended for Production)

**SendGrid** (Free tier: 100 emails/day):
1. Sign up: https://sendgrid.com
2. Create API key
3. Update Railway env vars:
   ```
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASS=<your-sendgrid-api-key>
   EMAIL_FROM=Premass Overseas <premass.overseas@gmail.com>
   ```

**AWS SES** (Free tier: 62,000 emails/month):
- More setup required, but very reliable

**Mailgun** (Free tier: 5,000 emails/month):
- Good for production

### Option B: Check Gmail Settings

1. **Check spam folder** - Emails might be going to spam
2. **Check Gmail activity** - https://myaccount.google.com/security → **Recent security activity**
3. **Check blocked senders** - Make sure Railway IPs aren't blocked

### Option C: Use a Different Gmail Account

If `premass.overseas@gmail.com` has issues, try:
- Create a new Gmail account
- Enable 2-Step Verification
- Generate app password
- Update Railway `EMAIL_USER` and `EMAIL_PASS`

---

## Step 5: Check Railway Logs After Fix

After updating env vars and redeploying:

1. **Register a new user**
2. **Check Railway logs** for:
   - `📧 Creating email transporter` (shows config)
   - `✅ OTP email sent successfully` (success)
   - OR `❌ OTP EMAIL SEND FAILED` (with detailed error)

3. **If still failing**, the detailed error logs will show:
   - Error code (EAUTH, ECONNECTION, etc.)
   - SMTP response code
   - Full error message

---

## Quick Checklist

- [ ] Check Railway logs for email errors
- [ ] Verify Gmail app password is correct (16 chars, no spaces)
- [ ] Ensure 2-Step Verification is enabled on Gmail
- [ ] Update Railway `EMAIL_PASS` with correct app password
- [ ] Restart Railway service after updating env vars
- [ ] Check spam folder in recipient's email
- [ ] Try registering again and check logs
- [ ] Consider switching to SendGrid/Mailgun for production

---

## Most Common Issue: Wrong App Password

**90% of email delivery failures are due to:**
1. Using regular Gmail password instead of App Password
2. App password expired or revoked
3. Copy-paste error (extra spaces, missing characters)

**Solution:** Generate a fresh Gmail App Password and update Railway `EMAIL_PASS`.
