# 🚀 Railway Deployment - Step by Step

## Your Repository
**GitHub:** https://github.com/developer-bharath/premass-overseas-app

---

## ✅ Step 1: Open Railway Dashboard
1. Go to https://railway.app
2. Click **"Login with GitHub"**
3. Authorize Railway to access your GitHub

---

## ✅ Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and click on: **`premass-overseas-app`**

---

## ✅ Step 3: Select Service Directory
1. Railway will ask: **"Select the directory to deploy"**
2. Choose: **`backend`** (NOT root, NOT frontend)
3. Click **"Deploy"**

---

## ✅ Step 4: Railway Auto-Detection
- Railway will automatically detect it's a **Node.js** project
- It will use: `npm run build && npm start`
- Builds the TypeScript to JavaScript
- Starts the production server

---

## ✅ Step 5: Add Environment Variables
**CRITICAL:** Before it deploys, you MUST add environment variables:

1. In Railway project, go to **"Variables"** tab (on the left side)
2. Click **"+ New Variable"** and add these EXACTLY:

### Backend Environment Variables:

| Key | Value |
|-----|-------|
| `PORT` | `4000` |
| `MONGO_URI` | `mongodb+srv://premassadmin:Premass12345@premassoverseas.vfv4ic3.mongodb.net/premassDB?retryWrites=true&w=majority` |
| `JWT_SECRET` | `premass_secret_key_production_change_this` |
| `JWT_REFRESH_SECRET` | `premass_refresh_secret_production` |
| `EMAIL_USER` | `premass.overseas@gmail.com` |
| `EMAIL_PASS` | `uokzetjluiofxxds` |
| `NODE_ENV` | `production` |

**Paste format:**
```
PORT=4000
MONGO_URI=mongodb+srv://premassadmin:Premass12345@premassoverseas.vfv4ic3.mongodb.net/premassDB?retryWrites=true&w=majority
JWT_SECRET=premass_secret_key_production_change_this
JWT_REFRESH_SECRET=premass_refresh_secret_production
EMAIL_USER=premass.overseas@gmail.com
EMAIL_PASS=uokzetjluiofxxds
NODE_ENV=production
```

---

## ✅ Step 6: Trigger Deployment
1. Add the variables above
2. Go to **"Deployments"** tab
3. Click **"Redeploy"** or just wait for auto-deployment
4. Wait 2-3 minutes for build to complete

---

## ✅ Step 7: Get Your Production URL
1. Once deployed, Railway shows your app's public URL
2. It looks like: `https://premass-backend-xxxxx.up.railway.app`
3. **COPY THIS URL** - You'll need it for frontend!

### Test it works:
```bash
curl https://your-railway-url/api/v1/health
```

Should return:
```json
{"success":true,"data":{"status":"ok",...}}
```

---

## 📋 Deployment Checklist

- [ ] Logged in to Railway with GitHub
- [ ] Created new project from GitHub
- [ ] Selected `backend` directory
- [ ] Added all 7 environment variables
- [ ] Deployment started (shows in Deployments tab)
- [ ] Deployment completed successfully (green checkmark)
- [ ] Got production URL (like `https://premass-backend-xxxxx.up.railway.app`)
- [ ] Tested health endpoint with curl
- [ ] **SAVED THE URL** for frontend deployment

---

## 🔗 Important Notes

- **Build Command:** `npm run build` (Railway auto-detects)
- **Start Command:** `npm start` (Railway auto-detects)
- **Port:** Railway assigns automatically, but we set it to 4000 in env
- **MongoDB:** Uses MongoDB Atlas (cloud database)
- **Auto-Deploy:** Any push to GitHub will auto-deploy!

---

## ❌ Troubleshooting

### If build fails:
1. Check "Build Logs" in Railway
2. Common issues:
   - Missing environment variables
   - TypeScript compilation errors
   - Missing dependencies

### If health check fails:
1. Check "Runtime Logs" in Railway
2. Look for "MongoDB connected" message
3. Verify MONGO_URI is correct

### If can't connect to MongoDB:
1. Login to MongoDB Atlas: https://cloud.mongodb.com
2. Go to "Network Access"
3. Ensure `0.0.0.0` is whitelisted (allow all IPs)

---

## 📞 Next Steps After Railway Deployment

1. **Copy the production URL** from Railway
2. Come back here with the URL
3. I'll help you deploy frontend to Vercel
4. Then test everything end-to-end!

