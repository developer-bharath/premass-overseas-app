# 🔧 Fix Gmail SMTP Connection Issue (Keep Using Gmail)

## Problem
Gmail SMTP is blocking Railway's IP address → `ECONNECTION` error

## Solution 1: Use Port 465 with SSL (Most Likely to Work)

Gmail's port **465 with SSL** is often more reliable from cloud platforms than port 587.

### Update Railway Environment Variables:

Go to **Railway** → Your Service → **Variables**

**Change:**
```
EMAIL_PORT=465
EMAIL_SECURE=true
```

**Keep these the same:**
```
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=premass.overseas@gmail.com
EMAIL_PASS=nmtakwmpgbesmbvs
```

**Restart Railway service** and test again.

---

## Solution 2: Verify Gmail App Password is Fresh

1. **Go to:** https://myaccount.google.com/security
2. **2-Step Verification** must be **enabled**
3. **App passwords** → **Generate new password**
4. **Select:** Mail → Other (Railway)
5. **Copy the 16-character password** (no spaces)
6. **Update Railway `EMAIL_PASS`** with new password
7. **Restart Railway**

---

## Solution 3: Check Gmail Security Settings

1. **Go to:** https://myaccount.google.com/security
2. **Check "Recent security activity"** - Make sure no blocks
3. **Check "2-Step Verification"** - Must be enabled
4. **Check "App passwords"** - Should show your Railway app password

---

## Solution 4: Try Different Gmail Account

Sometimes a Gmail account gets flagged. Try:

1. **Create a new Gmail account** (or use a different one)
2. **Enable 2-Step Verification**
3. **Generate App Password**
4. **Update Railway:**
   ```
   EMAIL_USER=new-email@gmail.com
   EMAIL_PASS=new-app-password
   ```

---

## Solution 5: Check Railway IP Whitelisting (Advanced)

Gmail might be blocking Railway's IP range. Unfortunately, Gmail doesn't allow IP whitelisting for SMTP, but you can:

1. **Check Gmail Activity:**
   - https://myaccount.google.com/security → **Recent security activity**
   - Look for blocked login attempts

2. **Try from Different Region:**
   - Railway might be using an IP that Gmail blocks
   - Try deploying to a different region (if Railway supports it)

---

## What I Updated in Code

I updated `emailService.js` to:
- ✅ **Default to port 465** (more reliable for cloud platforms)
- ✅ **Increased timeouts** (Gmail can be slow)
- ✅ **Added connection pooling** (better for repeated sends)
- ✅ **Better TLS configuration** (helps with connection issues)

---

## Test After Each Fix

1. **Update Railway env vars**
2. **Restart Railway service**
3. **Register a new user**
4. **Check Railway logs** for:
   - `✅ OTP email sent successfully` → **SUCCESS!**
   - `❌ OTP EMAIL SEND FAILED` → Try next solution

---

## If Still Not Working

If Gmail continues to block Railway IPs, you have two options:

### Option A: Use Gmail OAuth2 (Complex but Reliable)
- More secure
- Less likely to be blocked
- Requires OAuth setup (takes 30+ minutes)

### Option B: Switch to SendGrid (5 minutes)
- Designed for cloud platforms
- No IP blocking
- Free tier: 100 emails/day
- See `SENDGRID_SETUP.md`

---

## Quick Checklist

- [ ] Try port 465 + SSL (`EMAIL_PORT=465`, `EMAIL_SECURE=true`)
- [ ] Generate fresh Gmail App Password
- [ ] Verify 2-Step Verification is enabled
- [ ] Check Gmail security activity for blocks
- [ ] Restart Railway after each change
- [ ] Test registration and check logs

---

## Most Likely Fix

**90% chance this works:** Change to port 465 with SSL:
```
EMAIL_PORT=465
EMAIL_SECURE=true
```

Then restart Railway and test!
