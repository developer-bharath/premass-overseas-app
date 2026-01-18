# Production Deployment Guide - PREMASS Admin Dashboard

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] SSL certificates obtained
- [ ] Database backups configured
- [ ] Monitoring and logging set up
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Security headers configured

---

## Phase 1: Backend Deployment

### Option A: Heroku (Easiest)

#### 1.1 Install Heroku CLI

```bash
brew install heroku/brew/heroku
heroku login
```

#### 1.2 Create Heroku App

```bash
cd backend
heroku create your-app-name
```

#### 1.3 Add MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Set environment variable:

```bash
heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster...
heroku config:set JWT_SECRET=your-very-strong-secret-key-minimum-32-chars
heroku config:set JWT_REFRESH_SECRET=your-refresh-secret-key
heroku config:set FRONTEND_URL=https://yourdomain.com
```

#### 1.4 Deploy

```bash
git push heroku main
```

#### 1.5 View Logs

```bash
heroku logs --tail
```

**Result:** Your API will be live at `https://your-app-name.herokuapp.com/api/v1`

---

### Option B: AWS EC2

#### 2.1 Launch EC2 Instance

1. Go to AWS Console
2. Launch Ubuntu 20.04 LTS instance
3. Open port 22 (SSH) and 3001 (API)
4. Download key pair

#### 2.2 Connect to Server

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-ip-address
```

#### 2.3 Install Dependencies

```bash
sudo apt update
sudo apt install -y nodejs npm git

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### 2.4 Deploy Code

```bash
git clone your-repo-url
cd premass-overseas-app/backend
npm install
npm run build
```

#### 2.5 Run with PM2

```bash
sudo npm install -g pm2
pm2 start dist/server.js --name "premass-api"
pm2 startup
pm2 save
```

#### 2.6 Configure Nginx Reverse Proxy

```bash
sudo apt install -y nginx

# Create config
sudo nano /etc/nginx/sites-available/default
```

Paste:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api/v1 {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo systemctl restart nginx
```

#### 2.7 Enable HTTPS with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### Option C: DigitalOcean App Platform

#### 3.1 Prepare for Deployment

1. Commit all changes to git
2. Ensure `package.json` has build scripts
3. Create `Procfile`:

```
web: npm run build && npm start
```

#### 3.2 Deploy via Dashboard

1. Go to DigitalOcean Console
2. Create App Platform > Connect GitHub repo
3. Select branch `main`
4. Configure environment variables
5. Deploy

#### 3.3 Configure MongoDB

1. Create managed database cluster
2. Set MONGODB_URI environment variable
3. Wait for deployment to complete

---

### Option D: Railway.app (Recommended for Beginners)

#### 4.1 Push to GitHub

```bash
git add .
git commit -m "Backend ready for deployment"
git push origin main
```

#### 4.2 Connect on Railway

1. Go to https://railway.app
2. Login with GitHub
3. Click "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Node.js project

#### 4.3 Add MongoDB

1. In Railway dashboard, click "Add Service"
2. Select "MongoDB"
3. Railway automatically sets `MONGODB_URI`

#### 4.4 Set Secrets

Go to Variables tab:
```
JWT_SECRET = your-very-strong-secret-key
JWT_REFRESH_SECRET = your-refresh-secret-key
FRONTEND_URL = https://yourdomain.com
NODE_ENV = production
```

#### 4.5 Deploy

Railway auto-deploys on every push to `main` branch!

**Result:** API available at `https://your-app.up.railway.app/api/v1`

---

## Phase 2: Frontend Deployment

### Option A: Vercel (Recommended)

#### 1.1 Install Vercel CLI

```bash
npm i -g vercel
```

#### 1.2 Deploy

```bash
cd frontend
vercel
```

#### 1.3 Configure Environment

Vercel dashboard > Settings > Environment Variables:
```
REACT_APP_API_BASE_URL=https://your-backend-api.com/api/v1
```

**Result:** Your app automatically deploys on every git push!

---

### Option B: Netlify

#### 2.1 Create `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  REACT_APP_API_BASE_URL = "https://your-backend-api.com/api/v1"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2.2 Deploy via Dashboard

1. Go to https://netlify.com
2. Connect GitHub
3. Select your repo
4. Deploy!

---

### Option C: AWS S3 + CloudFront

#### 3.1 Build Frontend

```bash
npm run build
```

#### 3.2 Create S3 Bucket

```bash
aws s3 mb s3://your-app-name

# Enable static website hosting
aws s3 website s3://your-app-name \
  --index-document index.html \
  --error-document index.html
```

#### 3.3 Upload Files

```bash
aws s3 sync dist/ s3://your-app-name --delete
```

#### 3.4 Create CloudFront Distribution

AWS Console > CloudFront > Create Distribution:
- Origin: S3 bucket
- Default root object: index.html
- Custom domain: your-domain.com

---

## Phase 3: Database Deployment

### MongoDB Atlas (Recommended)

#### 1. Create Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)

#### 2. Create Cluster

1. Create new cluster
2. Wait 10-15 minutes for creation
3. Click "Connect"

#### 3. Get Connection String

1. Username/password authentication
2. Create database user
3. Get connection string

#### 4. Update Environment

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/premass-admin
```

#### 5. Verify Connection

```bash
npm run dev
# Should show: ✅ MongoDB connected
```

---

## Phase 4: Domain & SSL Configuration

### 4.1 Register Domain

Options:
- GoDaddy
- Namecheap
- Route53 (AWS)
- Vercel Domains

### 4.2 Configure DNS

**For Vercel:**
```
Vercel auto-configures DNS for you!
```

**For custom hosting:**
```
A Record: backend.yourdomain.com → Your backend IP
A Record: yourdomain.com → Your frontend IP
CNAME: www → yourdomain.com
```

### 4.3 SSL Certificate

**Free options:**
- Vercel (automatic)
- Netlify (automatic)
- Let's Encrypt (manual setup)

```bash
# Using Let's Encrypt (Ubuntu)
sudo certbot certonly --standalone -d yourdomain.com
```

---

## Phase 5: Performance Optimization

### 5.1 Backend Optimization

**Add Compression:**
```bash
npm install compression
```

Update `server.ts`:
```typescript
import compression from 'compression';
app.use(compression());
```

**Add Rate Limiting:**
```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 5.2 Frontend Optimization

**Code Splitting:**
```typescript
import { lazy, Suspense } from 'react';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

<Suspense fallback={<Loading />}>
  <AdminDashboard />
</Suspense>
```

**Image Optimization:**
```bash
npm install next-image-export-optimizer
```

---

## Phase 6: Monitoring & Logging

### 6.1 Error Tracking - Sentry

```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### 6.2 Uptime Monitoring

Use UptimeRobot (free):
1. Go to https://uptimerobot.com
2. Add monitor for `/api/v1/health`
3. Ping every 5 minutes
4. Get alerts if down

### 6.3 Logging Service

**Papertrail:**
```bash
npm install winston-papertrail
```

**LogRocket:**
```bash
npm install logrocket
```

---

## Phase 7: Backup & Recovery

### 7.1 MongoDB Backups

**MongoDB Atlas automatic backups:**
- Free tier: daily backups
- Paid tier: hourly backups

### 7.2 Code Backups

```bash
# Ensure all code is pushed to GitHub
git push origin main

# GitHub automatically keeps 30-day history
```

### 7.3 Database Backup Strategy

```bash
# Manual backup from MongoDB
mongoexport --uri "mongodb+srv://..." \
  --db premass-admin \
  --collection employees \
  --out backup-employees.json

# Restore if needed
mongoimport --uri "mongodb+srv://..." \
  --db premass-admin \
  --collection employees \
  --file backup-employees.json
```

---

## Phase 8: Security Hardening

### 8.1 Environment Variables

Never commit `.env` files:
```bash
# In .gitignore
.env
.env.local
.env.*.local
```

### 8.2 CORS Configuration

Update backend `server.ts`:
```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
}));
```

### 8.3 Security Headers

```bash
npm install helmet
```

```typescript
import helmet from 'helmet';
app.use(helmet());
```

### 8.4 Input Validation

```bash
npm install joi
```

### 8.5 Secrets Management

Use environment variable providers:
- Vercel Secrets
- GitHub Secrets
- 1Password
- HashiCorp Vault

---

## Deployment Checklist by Environment

### Development (localhost)
- [ ] `npm run dev` works
- [ ] No console errors
- [ ] All features functional
- [ ] Local database synced

### Staging
- [ ] Build succeeds: `npm run build`
- [ ] All tests pass
- [ ] API endpoints tested
- [ ] Performance acceptable

### Production
- [ ] Environment variables set
- [ ] SSL certificate active
- [ ] Database replicated
- [ ] Backups configured
- [ ] Monitoring active
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Error tracking enabled
- [ ] Load balancing configured
- [ ] CDN configured (optional)

---

## Post-Deployment Verification

### 1. Health Check

```bash
curl https://yourdomain.com/api/v1/health
```

Expected: `{"success":true,"data":{"status":"ok"}}`

### 2. Login Test

```bash
curl -X POST https://yourdomain.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### 3. Database Connection

```bash
# Should be connected
```

### 4. SSL Certificate

```bash
# Visit https://yourdomain.com
# Green lock should appear
```

### 5. Performance Check

```bash
# Visit https://pagespeed.web.dev
# Should score 80+
```

---

## Troubleshooting Deployments

### Issue: Build Fails
**Solution:**
- Check Node.js version matches
- Clear `node_modules`, run `npm install`
- Check for TypeScript errors: `npm run build`

### Issue: Database Connection Error
**Solution:**
- Verify `MONGODB_URI` in production environment
- Check IP whitelist on MongoDB Atlas
- Ensure network connectivity

### Issue: CORS Errors in Production
**Solution:**
- Verify `FRONTEND_URL` matches deployment URL
- Update CORS headers in backend
- Check browser console for exact error

### Issue: Slow Performance
**Solution:**
- Enable gzip compression
- Add database indexes
- Implement caching
- Use CDN for static files

### Issue: High Memory Usage
**Solution:**
- Check for memory leaks
- Add process limits: `--max-old-space-size=1024`
- Monitor with `pm2 monit`

---

## Cost Optimization

### Free Tier Services
- ✅ Vercel (frontend)
- ✅ Railway (backend)
- ✅ MongoDB Atlas (database)
- ✅ GitHub (code)
- ✅ UptimeRobot (monitoring)
- ✅ Sentry (error tracking - limited)

**Estimated cost: $0/month**

### Budget-Friendly Services ($5-20/month)
- AWS EC2 free tier
- DigitalOcean ($6/month)
- Netlify
- Heroku Eco dynos

---

## Next Steps

1. ✅ Choose deployment platform
2. ✅ Configure environment variables
3. ✅ Deploy backend first
4. ✅ Verify API endpoints
5. ✅ Deploy frontend
6. ✅ Test integrated system
7. ✅ Set up monitoring
8. ✅ Configure backups
9. ✅ Enable SSL
10. ✅ Go live!

---

## Support & Documentation

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Express Deployment](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Deployment](https://react.dev/learn/deployment)
