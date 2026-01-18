# 🎨 Vercel Deployment - Step by Step

## Your Repository
**GitHub:** https://github.com/developer-bharath/premass-overseas-app

## ✅ Prerequisites
- ✅ Backend deployed to Railway (get the URL first!)
- ✅ Have your Railway backend URL: `https://your-railway-url.up.railway.app`

---

## ✅ Step 1: Open Vercel Dashboard
1. Go to https://vercel.com
2. Click **"Login with GitHub"**
3. Authorize Vercel to access your GitHub

---

## ✅ Step 2: Import Project
1. Click **"Add New"** → **"Project"**
2. Find and select: **`premass-overseas-app`**
3. Click **"Import"**

---

## ✅ Step 3: Configure Project
Vercel will show import settings:

- **Framework:** Vite (auto-detected)
- **Build Command:** `npm run build` (pre-filled)
- **Output Directory:** `dist` (pre-filled)
- **Install Command:** `npm install` (pre-filled)

**Make sure "Root Directory" is set to `frontend/`** (or Vercel auto-detects)

---

## ✅ Step 4: Add Environment Variables (IMPORTANT!)

1. In Vercel project settings, go to **"Environment Variables"**
2. Add ONE variable:

| Key | Value |
|-----|-------|
| `VITE_API_BASE_URL` | `https://your-railway-url/api/v1` |

**Replace `your-railway-url` with your actual Railway URL!**

Example:
```
VITE_API_BASE_URL=https://premass-backend-abc123.up.railway.app/api/v1
```

---

## ✅ Step 5: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (takes 1-2 minutes)
3. You'll see: **"Congratulations! Your project has been successfully deployed!"**

---

## ✅ Step 6: Get Your Frontend URL
Vercel will provide your frontend URL:
- Example: `https://premass-overseas.vercel.app`
- The admin dashboard: `https://premass-overseas.vercel.app/admin-system`

---

## 📋 Deployment Checklist

- [ ] Logged in to Vercel with GitHub
- [ ] Imported `premass-overseas-app` project
- [ ] Verified build settings (should be auto-detected)
- [ ] **Added `VITE_API_BASE_URL` environment variable with Railway URL**
- [ ] Deployment started
- [ ] Deployment completed successfully
- [ ] Got Vercel URL (like `https://premass-overseas.vercel.app`)
- [ ] **SAVED BOTH URLs**

---

## 🔗 Important Notes

- **Frontend Root:** `frontend/` directory
- **Build Output:** `dist/` folder
- **Build Time:** Usually 1-2 minutes
- **Auto-Deploy:** Any push to GitHub auto-deploys!
- **API URL:** Must match your Railway backend URL

---

## ✅ Final URLs You'll Have

| Service | URL | Type |
|---------|-----|------|
| Backend API | `https://premass-backend-xxx.up.railway.app` | Railway |
| Frontend Home | `https://premass-overseas.vercel.app` | Vercel |
| Admin Dashboard | `https://premass-overseas.vercel.app/admin-system` | Vercel |

---

## 🧪 Testing After Deployment

1. Open: `https://premass-overseas.vercel.app/admin-system`
2. Login: `raj@premass.com` / `password123`
3. Try creating/editing/deleting an employee
4. Data should persist in MongoDB Atlas!

---

## ❌ Troubleshooting

### If frontend can't reach backend:
1. Check `VITE_API_BASE_URL` is correct
2. Verify Railway backend is running
3. Check CORS is enabled in backend

### If build fails:
1. Check "Build Logs" in Vercel
2. Usually TypeScript or build errors
3. Check `.env.production` is correct

### If can't login:
1. Check network tab in browser (F12)
2. Verify API calls are going to correct URL
3. Check Railway backend logs

---

## 📞 Next Steps

1. **Get Railway URL** from Railway deployment
2. **Deploy to Vercel** (follow this guide)
3. **Test end-to-end** with real data
4. **Share your live app!** 🎉

