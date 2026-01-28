# 🚨 CRITICAL: Railway Environment Variables Missing!

## Current Status: **0 Variables** ❌

Your Railway service shows **"0 Variables"** - this means **NO environment variables are set**. Your backend **will not work** without these!

---

## Required Environment Variables

Go to **Railway** → Your Service → **Variables** tab → **Add these:**

### 1. Database Connection (REQUIRED)
```
MONGODB_URI=mongodb+srv://premassadmin:Premass5225@premassoverseas.vfv4ic3.mongodb.net/premassoverseas?appName=Premassoverseas
```

### 2. JWT Secrets (REQUIRED)
```
JWT_SECRET=LvnlWFbzUvjs1gt4Fhw5UvgYF0FGUFb20DgREEFU90wnX8CpkrnabtoBOq
JWT_REFRESH_SECRET=YYY7fKH9NNi/fofCVpPHMRJFoPk+0BLa5pQ+bTfk5vfMcrKOMZ3XFZE63opQNO72uP
```

### 3. Server Configuration (REQUIRED)
```
NODE_ENV=production
PORT=8080
```

### 4. CORS Configuration (REQUIRED)
```
CORS_ORIGIN=https://premass-overseas-81viwkm67-premassoverseas-7587s-projects.vercel.app
```
(Or your current Vercel URL)

### 5. reCAPTCHA (REQUIRED for new registration)
```
RECAPTCHA_SECRET_KEY=6LdahVgsAAAAAI3jKSeqxff0sA9vR3WSndlg_Zzv
```

### 6. Email Configuration (Optional - not needed with reCAPTCHA)
```
EMAIL_USER=premass.overseas@gmail.com
EMAIL_PASS=nmtakwmpgbesmbvs
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_FROM=Premass Overseas <premass.overseas@gmail.com>
```

---

## Quick Steps

1. **Railway** → Your Service → **Variables** tab
2. **Click "New Variable"** for each variable above
3. **Copy-paste** the key and value
4. **Click "Add"**
5. **Repeat** for all variables
6. **Service will auto-restart** after adding variables

---

## After Adding Variables

1. **Approve the pending deployment** (click "Deploy")
2. **Check Railway logs** - should show:
   ```
   ✅ MongoDB Connected successfully
   ✅ Server running on port 8080
   ✅ Environment Check:
      - MongoDB URI: ✅ Set
      - JWT_SECRET: ✅ Set
      - Email User: ✅ Set
   ```

---

## Why This Matters

Without these variables:
- ❌ Backend can't connect to database
- ❌ Authentication won't work (no JWT secret)
- ❌ Registration won't work (no reCAPTCHA secret)
- ❌ CORS will block frontend requests
- ❌ Server might crash on startup

**Add these NOW before deploying!**

---

## Your Previous Railway Variables

Based on earlier conversation, you had these set. They might have been lost or need to be re-added:

```
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb+srv://premassadmin:Premass5225@premassoverseas.vfv4ic3.mongodb.net/premassoverseas?appName=Premassoverseas
CORS_ORIGIN=https://premass-overseas-81viwkm67-premassoverseas-7587s-projects.vercel.app
JWT_SECRET=LvnlWFbzUvjs1gt4Fhw5UvgYF0FGUFb20DgREEFU90wnX8CpkrnabtoBOq
JWT_REFRESH_SECRET=YYY7fKH9NNi/fofCVpPHMRJFoPk+0BLa5pQ+bTfk5vfMcrKOMZ3XFZE63opQNO72uP
EMAIL_USER=premass.overseas@gmail.com
EMAIL_PASS=nmtakwmpgbesmbvs
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_FROM=Premass Overseas <premass.overseas@gmail.com>
RECAPTCHA_SECRET_KEY=6LdahVgsAAAAAI3jKSeqxff0sA9vR3WSndlg_Zzv
```

**Copy all of these to Railway Variables!**
