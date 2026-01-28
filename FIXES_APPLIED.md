# Fixes Applied – Registration, OTP, 400/499 Errors

## Issues addressed

### 1. **499 / "Loading but not loading" (registration hang)**
- **Cause:** Backend waited for OTP email send. Gmail SMTP often times out on Railway → long wait → client closes request (499).
- **Fix:** OTP email is now sent **in the background**. Register returns **201 immediately** after user + OTP are created. No more 499 from email delays.

### 2. **"Email transporter verification failed: Connection timeout"**
- **Cause:** `transporter.verify()` was called before sending. It opens a connection to Gmail and was timing out on Railway.
- **Fix:** **Removed `verify()`**. Transporter is created and used directly. Added `connectionTimeout` and `greetingTimeout` (10s) on the transporter.

### 3. **400 Bad Request**
- **Cause:** Validation, "User already exists", or invalid role. Messages were not always clear.
- **Fix:**
  - Clear 400 messages: "User already exists. Try logging in or use a different email.", "All fields are required...", "Invalid role. Use student or employee."
  - **"staff"** is mapped to **"employee"**.
  - Optional `code` in JSON (`USER_EXISTS`, `MISSING_FIELDS`, `INVALID_ROLE`) for easier debugging.

### 4. **API calls going to Vercel instead of Railway**
- **Cause:** Frontend sometimes used Vercel URL as API base (e.g. wrong `VITE_API_URL` or relative URL).
- **Fix:**
  - **API base** explicitly uses **Railway** URL.
  - If `VITE_API_URL` or `VITE_API_BASE_URL` contains **vercel.app**, it is **ignored** and Railway is used.
  - `.env.production` updated to `VITE_API_URL=https://premass-overseas-app-production.up.railway.app`.

### 5. **Email send hanging**
- **Fix:** `sendMail` wrapped in **15s timeout** (`Promise.race`). Timeout is cleared when send completes. Background send continues to use this.

### 6. **Resend OTP and verify OTP**
- **Resend:** Sends OTP email in background, returns **200** immediately. OTP logged to Railway.
- **Verify:** Welcome email sent in background. Safer handling of missing `email`/`otp`.

---

## Summary of code changes

| File | Changes |
|------|---------|
| `backend/src/utils/emailService.js` | No `verify()`, sync `createTransporter`, 10s connection/greeting timeouts, 15s `sendMail` timeout |
| `backend/src/controllers/authController.js` | Register/resend/verify: send OTP/welcome email in background; clearer 400 messages; "staff"→"employee" |
| `frontend/src/context/AuthContext.tsx` | API base = Railway; ignore vercel.app URLs; support `VITE_API_URL` and `VITE_API_BASE_URL` |
| `frontend/.env.production` | `VITE_API_URL` set to Railway URL |

---

## What you need to do

### 1. **Vercel environment**
- `frontend/.env.production` is **gitignored** (`.env.*`), so it is **not** committed. Configure the API URL in Vercel instead:
- **Option A:** Do **not** set `VITE_API_URL` in Vercel → app uses Railway URL by default.
- **Option B:** Vercel → Project → Settings → Environment Variables → Add `VITE_API_URL` = `https://premass-overseas-app-production.up.railway.app` (Production + Preview if needed) → Save → Redeploy.
- **Do not** set `VITE_API_URL` to any `*.vercel.app` URL.

### 2. **Commit and deploy**
```bash
git add backend/src utils/emailService.js backend/src/controllers/authController.js frontend/src/context/AuthContext.tsx frontend/.env.production
git commit -m "fix: registration 499, email timeout, 400 messages, API URL"
git push origin main
```
- **Railway:** redeploys backend.
- **Vercel:** redeploys frontend.

### 3. **"User already exists" (400)**
- If you hit this, that email is already registered.
- Use **Login** or register with a **different email**.

### 4. **OTP not received**
- **Railway → Deploy Logs:** search for `OTP CODE FOR` to see the OTP.
- Check **spam** for emails from `premass.overseas@gmail.com`.
- Use **Resend OTP** on the verify page.

---

## Current flow

1. **Register** → User + OTP created → **201** returned → OTP email sent in background.
2. **Verify OTP** → OTP checked → User verified → **200** → Welcome email in background.
3. **Resend OTP** → New OTP created → **200** → OTP email in background.
4. **Login** → Allowed only after email is verified.

Registration and OTP flows should now complete without 499, and 400s should be clear and actionable.
