# Deployment Guide: Vercel + Railway

## 🚀 Backend Deployment (Railway)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub"

### Step 2: Connect Your GitHub Repository
1. Authorize Railway to access your GitHub
2. Select: `premass-overseas-app` repository
3. Select branch: `main` (or your default branch)

### Step 3: Set Environment Variables on Railway
Railway will detect it's a Node.js project. Before deploying:

1. Go to your Railway project
2. Click "Variables" tab
3. Add these environment variables:

```
PORT=4000
MONGO_URI=mongodb+srv://premassadmin:Premass12345@premassoverseas.vfv4ic3.mongodb.net/premassDB?retryWrites=true&w=majority
JWT_SECRET=premass_secret_key_production_change_this
JWT_REFRESH_SECRET=premass_refresh_secret_production_change_this
EMAIL_USER=premass.overseas@gmail.com
EMAIL_PASS=uokzetjluiofxxds
NODE_ENV=production
```

### Step 4: Deploy
1. Railway should auto-detect Node.js
2. It will build with: `npm run build`
3. It will start with: `npm start`
4. Copy the production URL (e.g., `https://premass-backend.up.railway.app`)

### Step 5: Test Backend
```bash
curl https://your-railway-url/api/v1/health
```

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Update Frontend Environment
Before deploying, update your frontend `.env`:

File: `frontend/.env`
```
VITE_API_BASE_URL=https://your-railway-url/api/v1
```

### Step 2: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub

### Step 3: Import Project
1. Click "Add New" → "Project"
2. Select your GitHub repository: `premass-overseas-app`
3. Vercel will auto-detect it's a Vite React app

### Step 4: Configure Build Settings
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 5: Set Environment Variables
In Vercel project settings:
1. Go to "Settings" → "Environment Variables"
2. Add:
   ```
   VITE_API_BASE_URL=https://your-railway-url/api/v1
   ```

### Step 6: Deploy
1. Click "Deploy"
2. Vercel will build and deploy
3. Get your Vercel URL (e.g., `https://premass-overseas.vercel.app`)

---

## ✅ Post-Deployment Testing

### Test Backend
```bash
curl https://your-railway-url/api/v1/health
# Should return: {"success":true,"data":{"status":"ok",...}}
```

### Test Frontend
1. Open: `https://your-vercel-url/admin-system`
2. Login with: `raj@premass.com` / `password123`
3. Test CRUD operations:
   - Create employee
   - Edit employee
   - Delete employee
   - All should persist in MongoDB!

---

## 🔗 Important URLs

| Service | URL | Status |
|---------|-----|--------|
| Frontend | https://premass-overseas.vercel.app | 🚀 Production |
| Backend API | https://premass-backend.up.railway.app/api/v1 | 🚀 Production |
| Admin Dashboard | https://premass-overseas.vercel.app/admin-system | 🎯 Ready |
| MongoDB Atlas | https://cloud.mongodb.com | 📊 Data Storage |

---

## 🛠️ Troubleshooting

### If deployment fails:
1. Check build logs in Railway/Vercel
2. Ensure all environment variables are set
3. Verify MongoDB connection string is correct
4. Check `tsconfig.json` for TypeScript errors

### If frontend can't reach backend:
1. Verify `VITE_API_BASE_URL` is set correctly
2. Ensure backend is running on Railway
3. Check CORS settings in backend (should be enabled)
4. Test API directly: `curl https://your-railway-url/api/v1/health`

### If MongoDB connection fails:
1. Verify connection string in Railway variables
2. Check MongoDB Atlas IP whitelist (allow all: 0.0.0.0)
3. Ensure database user has correct permissions

---

## 📚 Quick Reference

**Railway Dashboard:** https://railway.app/dashboard
**Vercel Dashboard:** https://vercel.com/dashboard
**MongoDB Atlas:** https://cloud.mongodb.com

