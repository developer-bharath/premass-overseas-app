# 🚀 Railway Environment Variables - Clean & Ready

## Copy These to Railway → Variables Tab

Add these **one by one** in Railway → Your Service → **Variables**:

---

### **Database (REQUIRED)**
```
MONGODB_URI=mongodb+srv://premassadmin:Premass5225@premassoverseas.vfv4ic3.mongodb.net/premassoverseas?appName=Premassoverseas
```

### **JWT Authentication (REQUIRED)**
```
JWT_SECRET=LvnlWFbzUvjs1gt4Fhw5UvgYF0FGUFb20DgREEFU90wnX8CpkrnabtoBOq
JWT_REFRESH_SECRET=YYY7fKH9NNi/fofCVpPHMRJFoPk+0BLa5pQ+bTfk5vfMcrKOMZ3XFZE63opQNO72uP
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

### **Server Configuration (REQUIRED)**
```
NODE_ENV=production
PORT=8080
```

### **CORS (REQUIRED)**
```
CORS_ORIGIN=https://premass-overseas-81viwkm67-premassoverseas-7587s-projects.vercel.app
```

### **reCAPTCHA (REQUIRED)**
```
RECAPTCHA_SECRET_KEY=6LdahVgsAAAAAI3jKSeqxff0sA9vR3WSndlg_Zzv
```

### **Email Configuration (Optional - for future use)**
```
EMAIL_USER=premass.overseas@gmail.com
EMAIL_PASS=fcki90pv7mlxp50i35jmpttwcvuw3dzc
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_FROM=Premass Overseas <premass.overseas@gmail.com>
```

### **Security (Optional)**
```
BCRYPT_ROUNDS=10
SESSION_SECRET=ZzQdqpRuqQ8tLpi95RgmhxGWMRB/fPBx8A3of
```

---

## ❌ REMOVED (Not Needed in Production)

These were removed because they're for local development:
- `API_BASE_URL` (localhost - not needed)
- `FRONTEND_URL` (localhost - not needed)
- `REDIS_URL` (localhost - not used)
- `LOG_FILE` (not configured)
- `LOG_LEVEL` (optional, defaults work)

---

## ✅ Changes Made

1. **Fixed `ACCESS_TOKEN_EXPIRY`**: Changed from `"015"` to `"15m"` (15 minutes)
2. **Removed localhost URLs**: Not needed in production
3. **Kept both SMTP and EMAIL vars**: Code checks both
4. **Cleaned up**: Removed unused variables

---

## How to Add in Railway

1. **Railway** → Your Service → **Variables** tab
2. **Click "New Variable"**
3. **Paste Key** (left side)
4. **Paste Value** (right side)
5. **Click "Add"**
6. **Repeat** for each variable above

---

## After Adding Variables

1. **Click "Deploy"** on the pending commit (you don't need pro plan - just approve it)
2. **Wait for deployment** to complete
3. **Check logs** - should show:
   ```
   ✅ MongoDB Connected successfully
   ✅ Server running on port 8080
   ```

---

## About the "Approval" Issue

You **don't need a pro plan** to deploy! The "approval" message just means:
- Railway detected a commit from your GitHub account
- You need to **click "Deploy"** to approve it
- That's it! No team invitation needed.

**Just click "Deploy" on the pending commit after adding variables.**

---

## Quick Copy-Paste Format

If Railway supports bulk import, use this format:

```
MONGODB_URI=mongodb+srv://premassadmin:Premass5225@premassoverseas.vfv4ic3.mongodb.net/premassoverseas?appName=Premassoverseas
JWT_SECRET=LvnlWFbzUvjs1gt4Fhw5UvgYF0FGUFb20DgREEFU90wnX8CpkrnabtoBOq
JWT_REFRESH_SECRET=YYY7fKH9NNi/fofCVpPHMRJFoPk+0BLa5pQ+bTfk5vfMcrKOMZ3XFZE63opQNO72uP
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
NODE_ENV=production
PORT=8080
CORS_ORIGIN=https://premass-overseas-81viwkm67-premassoverseas-7587s-projects.vercel.app
RECAPTCHA_SECRET_KEY=6LdahVgsAAAAAI3jKSeqxff0sA9vR3WSndlg_Zzv
EMAIL_USER=premass.overseas@gmail.com
EMAIL_PASS=fcki90pv7mlxp50i35jmpttwcvuw3dzc
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_FROM=Premass Overseas <premass.overseas@gmail.com>
BCRYPT_ROUNDS=10
SESSION_SECRET=ZzQdqpRuqQ8tLpi95RgmhxGWMRB/fPBx8A3of
```

---

**Add these variables, then click "Deploy" - you're all set!** 🚀
