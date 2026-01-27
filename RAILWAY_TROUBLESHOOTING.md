# Railway Backend Troubleshooting Guide

## Current Issue: 500 Internal Server Error on Registration

Your frontend is successfully deployed on Vercel, but the backend on Railway is returning 500 errors.

## Step 1: Check Railway Logs

1. Go to your Railway dashboard: https://railway.app
2. Select your backend project: `premass-overseas-app-production`
3. Click on "Deployments" or "Logs" tab
4. Look for error messages, especially:
   - MongoDB connection errors
   - Missing environment variables
   - Code errors in authController.js

## Step 2: Verify Environment Variables on Railway

Your Railway backend **MUST** have these environment variables set:

### Required Variables:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/premass-overseas?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters-long
PORT=4000
NODE_ENV=production
```

### Optional (for email):
```
EMAIL_USER=premass.overseas@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### How to Set Environment Variables on Railway:
1. Go to your Railway project
2. Click on your service
3. Go to "Variables" tab
4. Add each variable with its value
5. **Redeploy** after adding variables

## Step 3: Verify Backend Code is Deployed

Make sure your latest backend code (with the fixes) is pushed to GitHub and deployed:

1. Check if your latest commit is deployed:
   ```bash
   git log --oneline -5
   ```

2. Make sure you've pushed to the main branch:
   ```bash
   git push origin main
   ```

3. Railway should auto-deploy, but you can trigger a manual deploy:
   - Go to Railway dashboard
   - Click "Deploy" or "Redeploy"

## Step 4: Test Backend Directly

Test if the backend is responding:

```bash
# Test health endpoint
curl https://premass-overseas-app-production.up.railway.app/

# Test registration endpoint (should return error, not 500)
curl -X POST https://premass-overseas-app-production.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","role":"student"}'
```

## Step 5: Common Issues and Fixes

### Issue 1: MongoDB Connection Failed
**Error in logs:** `MongoDB Error: ...`

**Fix:**
- Verify `MONGO_URI` is set correctly in Railway
- Check if MongoDB Atlas IP whitelist includes Railway IPs (or use 0.0.0.0/0)
- Verify MongoDB credentials are correct

### Issue 2: Missing JWT_SECRET
**Error in logs:** `JWT_SECRET is not defined`

**Fix:**
- Add `JWT_SECRET` environment variable in Railway
- Generate a secure secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Issue 3: Code Not Updated
**Error:** Old error messages or behavior

**Fix:**
- Make sure latest code is pushed to GitHub
- Trigger a new deployment on Railway
- Check Railway logs to see which commit is deployed

### Issue 4: CORS Errors
**Error:** CORS policy blocking requests

**Fix:**
- Backend already has CORS configured for Vercel domains
- If using custom domain, update CORS in `server.js` to include your domain

## Step 6: Quick Fix Checklist

- [ ] Check Railway logs for specific error
- [ ] Verify `MONGO_URI` is set and correct
- [ ] Verify `JWT_SECRET` is set (32+ characters)
- [ ] Verify `PORT` is set (usually Railway sets this automatically)
- [ ] Check if MongoDB Atlas allows connections from Railway
- [ ] Verify latest code is deployed
- [ ] Test backend endpoint directly with curl
- [ ] Check Railway service is "Active" and not paused

## Step 7: Get Detailed Error from Railway

The best way to debug is to check Railway logs:

1. Go to Railway dashboard
2. Click on your backend service
3. Click "Logs" tab
4. Look for the error when registration is attempted
5. The error message will tell you exactly what's wrong

## Expected Behavior After Fix

When registration works correctly:
- Backend should return `201 Created` status
- Response should include: `{ message: "Registered successfully...", emailSent: true/false }`
- User should be created in MongoDB
- OTP should be generated and logged (or sent via email)

## Still Having Issues?

If you're still getting 500 errors after checking all above:

1. **Share Railway logs** - Copy the error from Railway logs
2. **Check MongoDB** - Verify database connection is working
3. **Test locally** - Try running backend locally to see if it works:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
