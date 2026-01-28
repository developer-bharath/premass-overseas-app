# 🔐 Add reCAPTCHA Keys to Vercel & Railway

## Your reCAPTCHA Keys

✅ **Site Key:** `6LdahVgsAAAAAKjdXk8Xb99izhGF-pFhYPkHHkOt`  
✅ **Secret Key:** `6LdahVgsAAAAAI3jKSeqxff0sA9vR3WSndlg_Zzv`

---

## Step 1: Add to Vercel (Frontend)

1. **Go to:** https://vercel.com → Your Project → **Settings** → **Environment Variables**

2. **Click "Add New"**

3. **Add:**
   - **Key:** `VITE_RECAPTCHA_SITE_KEY`
   - **Value:** `6LdahVgsAAAAAKjdXk8Xb99izhGF-pFhYPkHHkOt`
   - **Environment:** Select **Production**, **Preview**, and **Development**
   - **Click "Save"**

4. **Redeploy** your frontend (or wait for next deployment)

---

## Step 2: Add to Railway (Backend)

1. **Go to:** https://railway.app → Your Service → **Variables** tab

2. **Click "New Variable"**

3. **Add:**
   - **Key:** `RECAPTCHA_SECRET_KEY`
   - **Value:** `6LdahVgsAAAAAI3jKSeqxff0sA9vR3WSndlg_Zzv`
   - **Click "Add"**

4. **Railway will auto-redeploy** (or restart service)

---

## Step 3: Test Registration

1. **Go to your registration page**
2. **Fill in the form**
3. **Complete the reCAPTCHA** ("I'm not a robot" checkbox)
4. **Submit**
5. **Should redirect to login** (no OTP needed!)

---

## Quick Checklist

- [ ] Added `VITE_RECAPTCHA_SITE_KEY` to Vercel
- [ ] Added `RECAPTCHA_SECRET_KEY` to Railway
- [ ] Redeployed frontend (or wait for auto-deploy)
- [ ] Railway service restarted
- [ ] Tested registration with reCAPTCHA

---

## Troubleshooting

### reCAPTCHA not showing:
- Check `VITE_RECAPTCHA_SITE_KEY` is set in Vercel
- Check Vercel has redeployed after adding the key
- Check browser console for errors

### "reCAPTCHA verification failed":
- Check `RECAPTCHA_SECRET_KEY` is set in Railway
- Verify secret key matches site key (from same reCAPTCHA site)
- Check Railway logs for detailed error

### Still redirecting to OTP page:
- Clear browser cache
- Make sure latest code is deployed
- Check that registration redirects to `/login` not `/verify-otp`

---

## That's It! 🎉

Once you add the keys and redeploy, your registration will use reCAPTCHA instead of OTP!
