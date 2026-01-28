# 🔐 Google reCAPTCHA Setup Guide

## What Changed

✅ **Removed:** OTP system (email verification)  
✅ **Added:** Google reCAPTCHA verification  
✅ **Result:** Users can register and login immediately (no email needed)

---

## Step 1: Get Google reCAPTCHA Keys (5 minutes)

1. **Go to:** https://www.google.com/recaptcha/admin/create

2. **Fill in the form:**
   - **Label:** "Premass Overseas Registration"
   - **reCAPTCHA type:** Select **"reCAPTCHA v2"** → **"I'm not a robot" Checkbox**
   - **Domains:** Add your domains:
     - `localhost` (for local development)
     - `premass-overseas-*.vercel.app` (for Vercel previews)
     - `www.premassoverseas.com` (your custom domain)
     - `premassoverseas.com` (without www)
   - **Accept terms** and click **"Submit"**

3. **Copy your keys:**
   - **Site Key** (public) - Use in frontend
   - **Secret Key** (private) - Use in backend

---

## Step 2: Add Keys to Environment Variables

### Frontend (Vercel):

1. **Vercel** → Your Project → **Settings** → **Environment Variables**
2. **Add:**
   ```
   VITE_RECAPTCHA_SITE_KEY=<your-site-key-here>
   ```
3. **Apply to:** Production, Preview, Development
4. **Save** and **Redeploy**

### Backend (Railway):

1. **Railway** → Your Service → **Variables**
2. **Add:**
   ```
   RECAPTCHA_SECRET_KEY=<your-secret-key-here>
   ```
3. **Save** (Railway will auto-redeploy)

---

## Step 3: Test Registration

1. **Go to your registration page**
2. **Fill in the form**
3. **Complete the reCAPTCHA** ("I'm not a robot" checkbox)
4. **Submit**
5. **Should redirect to login** (no OTP needed!)

---

## How It Works Now

### Before (OTP System):
1. User registers → OTP sent to email → User verifies OTP → Can login

### After (reCAPTCHA):
1. User registers → reCAPTCHA verified → **Can login immediately**

---

## Benefits

✅ **No email dependency** - Works even if email service is down  
✅ **Faster registration** - No waiting for OTP  
✅ **Better UX** - One less step for users  
✅ **More reliable** - No email delivery issues  
✅ **Still secure** - reCAPTCHA prevents bots

---

## Optional: Make reCAPTCHA Optional in Development

If you want to test without reCAPTCHA locally:

**Frontend `.env.local`:**
```
VITE_RECAPTCHA_SITE_KEY=
```

**Backend `.env`:**
```
RECAPTCHA_SECRET_KEY=
```

The code will skip reCAPTCHA verification if keys are not set.

---

## Troubleshooting

### reCAPTCHA not showing:
- Check `VITE_RECAPTCHA_SITE_KEY` is set in Vercel
- Check domain is added in reCAPTCHA admin
- Check browser console for errors

### "reCAPTCHA verification failed":
- Check `RECAPTCHA_SECRET_KEY` is set in Railway
- Verify secret key matches site key
- Check Railway logs for detailed error

### Still seeing OTP page:
- Clear browser cache
- Make sure latest code is deployed
- Check that registration redirects to `/login` not `/verify-otp`

---

## Files Changed

1. ✅ `backend/src/controllers/authController.js` - Added reCAPTCHA verification, removed OTP
2. ✅ `backend/package.json` - Added `axios` for reCAPTCHA verification
3. ✅ `frontend/src/pages/Register.tsx` - Added reCAPTCHA component
4. ✅ `frontend/src/context/AuthContext.tsx` - Updated register to send reCAPTCHA token
5. ✅ `frontend/package.json` - Added `react-google-recaptcha`

---

## Next Steps

1. **Get reCAPTCHA keys** from Google
2. **Add to Vercel and Railway** environment variables
3. **Redeploy** both frontend and backend
4. **Test registration** - should work without email!

**That's it!** Your registration now uses reCAPTCHA instead of OTP. 🎉
