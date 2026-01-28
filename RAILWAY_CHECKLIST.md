# ✅ Railway Backend Checklist - Fix 500 Error

## Your Code is Already Committed! ✅

The fixes are already in your repository (commit `7e94cc4`). Now you need to verify Railway is configured correctly.

## 🔍 Step-by-Step Railway Check

### 1. Verify Railway Has Latest Code
- Go to: https://railway.app
- Select your backend service: `premass-overseas-app-production`
- Check "Deployments" tab
- Verify latest commit `7e94cc4` or newer is deployed
- If not, click "Redeploy" or trigger a new deployment

### 2. Check Railway Environment Variables ⚠️ CRITICAL

Go to Railway → Your Service → Variables tab

**MUST HAVE:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/premass-overseas?retryWrites=true&w=majority
```
- ✅ Check this is set correctly
- ✅ Verify MongoDB Atlas allows connections from Railway (IP whitelist: 0.0.0.0/0)

```
JWT_SECRET=your-secret-key-minimum-32-characters-long
```
- ✅ Must be at least 32 characters
- ✅ Generate new one: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

**OPTIONAL (for email):**
```
EMAIL_USER=premass.overseas@gmail.com
EMAIL_PASS=your-gmail-app-password
NODE_ENV=production
```

### 3. Check Railway Logs for Errors

Go to Railway → Your Service → Logs tab

**Look for these errors:**

❌ **"MongoDB Error" or "MongooseError"**
- **Fix:** Check `MONGO_URI` is correct and MongoDB Atlas allows Railway IPs

❌ **"JWT_SECRET is not defined"**
- **Fix:** Add `JWT_SECRET` environment variable

❌ **"Cannot find module" or "Error: Cannot find"**
- **Fix:** Railway might be using wrong start command - verify it's using `npm start`

❌ **"EADDRINUSE" or port errors**
- **Fix:** Railway sets PORT automatically - should be fine

### 4. Verify Railway Start Command

Railway should automatically detect `npm start` from package.json, but verify:
- Go to Railway → Your Service → Settings
- Check "Start Command" should be: `npm start` (or leave empty for auto-detect)

### 5. Test Backend Directly

After checking above, test if backend responds:

```bash
# Test health check
curl https://premass-overseas-app-production.up.railway.app/

# Should return: "Premass Overseas Backend Running"
```

```bash
# Test registration (should return proper error, not 500)
curl -X POST https://premass-overseas-app-production.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123","role":"student"}'
```

**Expected responses:**
- ✅ `201 Created` - Registration successful
- ✅ `400 Bad Request` - Validation error (this is OK, means backend is working)
- ❌ `500 Internal Server Error` - Backend has an issue (check logs)

## 🚨 Most Common Issues

### Issue 1: Missing MONGO_URI
**Symptom:** 500 error, logs show "MongoDB Error"
**Fix:** Add `MONGO_URI` in Railway Variables

### Issue 2: Missing JWT_SECRET  
**Symptom:** 500 error, logs show JWT errors
**Fix:** Add `JWT_SECRET` (32+ characters) in Railway Variables

### Issue 3: MongoDB Connection Blocked
**Symptom:** 500 error, logs show connection timeout
**Fix:** 
- Go to MongoDB Atlas → Network Access
- Add IP: `0.0.0.0/0` (allow all) OR add Railway's IP range
- Wait 2-3 minutes for changes to propagate

### Issue 4: Old Code Deployed
**Symptom:** Still getting old error messages
**Fix:**
- Trigger new deployment on Railway
- Or push a new commit to trigger auto-deploy

## 📋 Quick Action Items

1. [ ] Go to Railway dashboard
2. [ ] Check latest deployment is `7e94cc4` or newer
3. [ ] Verify `MONGO_URI` is set in Variables
4. [ ] Verify `JWT_SECRET` is set in Variables (32+ chars)
5. [ ] Check Railway Logs for specific error
6. [ ] Test backend with curl command above
7. [ ] If still 500, share Railway logs error message

## 🎯 What to Share if Still Not Working

If you're still getting 500 errors after checking everything:

1. **Railway Logs** - Copy the error message from Railway logs
2. **Environment Variables** - List which ones are set (don't share values!)
3. **Test Result** - What does the curl command return?

The error message in Railway logs will tell us exactly what's wrong!
