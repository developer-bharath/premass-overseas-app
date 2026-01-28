# 🔍 Quick Email Fix - OTP Not Coming to Email

## Step 1: Check Railway Logs (MOST IMPORTANT)

1. Go to **Railway Dashboard** → Your Service → **Deploy Logs** or **HTTP Logs**
2. **Register a new user** (or try resend OTP)
3. **Look for these log messages:**

### ✅ If Email Worked:
```
📧 Creating email transporter: { host: 'smtp.gmail.com', port: 587, ... }
✅ OTP email sent successfully to your@email.com | MessageID: <...>
```
**→ Email was sent! Check spam folder or wait a few minutes.**

### ❌ If Email Failed - Look for Error Code:

#### **Error Code: EAUTH** (Most Common - 90% of cases)
```
❌ OTP EMAIL SEND FAILED for your@email.com
   Error code: EAUTH
   ⚠️ AUTHENTICATION FAILED - Check EMAIL_USER and EMAIL_PASS
```
**Problem:** Gmail app password is **wrong or expired**

**Fix:**
1. Go to https://myaccount.google.com/security
2. **2-Step Verification** must be **enabled**
3. Click **App passwords** → Generate new password for "Mail"
4. Copy the **16-character password** (no spaces)
5. Railway → Variables → Update `EMAIL_PASS` with new password
6. **Restart Railway service** (or wait for auto-redeploy)
7. Try registering again

---

#### **Error Code: ECONNECTION or ETIMEDOUT**
```
Error code: ECONNECTION
⚠️ CONNECTION FAILED - Gmail SMTP might be blocking Railway IP
```
**Problem:** Gmail is blocking Railway's IP address

**Fix Options:**
- **Option A:** Use a different email service (SendGrid, Mailgun)
- **Option B:** Check Gmail account security settings
- **Option C:** Try a different Gmail account

---

#### **Error: Email send timeout (15s)**
```
Error: Email send timeout (15s)
```
**Problem:** Gmail SMTP is too slow

**Fix:** Switch to SendGrid or Mailgun (faster, more reliable)

---

## Step 2: Verify Gmail App Password

Your Railway env shows:
- `EMAIL_USER="premass.overseas@gmail.com"`
- `EMAIL_PASS="nmtakwmpgbesmbvs"` ← **This might be wrong/expired**

### How to Generate Fresh App Password:

1. **Go to:** https://myaccount.google.com/security
2. **Enable 2-Step Verification** (if not enabled)
3. **Click "App passwords"** (under 2-Step Verification)
4. **Select app:** "Mail"
5. **Select device:** "Other (Custom name)" → Type "Railway"
6. **Click "Generate"**
7. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)
8. **Remove spaces** → Should be: `abcdefghijklmnop`
9. **Update Railway:**
   - Railway → Your Service → Variables
   - Find `EMAIL_PASS`
   - Update value with new password
   - **Save**
10. **Restart service** (or trigger redeploy)

---

## Step 3: Check Spam Folder

Even if email sends successfully, it might go to **spam**:
- Check **Spam/Junk** folder
- Look for subject: **"🔐 Your OTP Code - Premass Overseas"**
- Mark as "Not Spam" if found

---

## Step 4: Get OTP from Railway Logs (Temporary Workaround)

While fixing email, you can still get OTP:

1. **Register a user**
2. **Check Railway logs** for:
   ```
   📧 OTP CODE FOR your@email.com : 123456
   ```
3. **Use that OTP** to verify

---

## Step 5: Test After Fix

After updating `EMAIL_PASS` and restarting:

1. **Register a new user**
2. **Check Railway logs** for:
   - `📧 Creating email transporter` (shows config)
   - `✅ OTP email sent successfully` (SUCCESS!)
   - OR `❌ OTP EMAIL SEND FAILED` (still failing - check error code)
3. **Check email inbox** (and spam)

---

## Most Common Issue: Wrong App Password

**90% of email failures are because:**
- Using regular Gmail password instead of App Password
- App password expired or revoked
- Copy-paste error (extra spaces, missing characters)

**Solution:** Generate a **fresh Gmail App Password** and update Railway `EMAIL_PASS`.

---

## Alternative: Switch to SendGrid (Recommended for Production)

Gmail has limits and can be unreliable. **SendGrid** is better for production:

1. **Sign up:** https://sendgrid.com (free tier: 100 emails/day)
2. **Create API key**
3. **Update Railway env vars:**
   ```
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASS=<your-sendgrid-api-key>
   EMAIL_FROM=Premass Overseas <premass.overseas@gmail.com>
   ```
4. **Restart Railway service**

---

## Quick Checklist

- [ ] Check Railway logs for error code (EAUTH, ECONNECTION, etc.)
- [ ] Verify Gmail 2-Step Verification is enabled
- [ ] Generate fresh Gmail App Password
- [ ] Update Railway `EMAIL_PASS` with new app password
- [ ] Restart Railway service
- [ ] Check spam folder
- [ ] Try registering again
- [ ] Check Railway logs for success/failure

---

## What to Share if Still Not Working

If emails still don't work after trying above:

1. **Railway Logs** - Copy the error message (especially the error code)
2. **Email Config Log** - Look for `📧 Creating email transporter` log
3. **Error Details** - The full error message from logs

The error code will tell us exactly what's wrong!
