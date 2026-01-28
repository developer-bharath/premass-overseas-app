# 🔐 Gmail OAuth2 Setup (Bypasses IP Blocking)

## Why OAuth2?
- ✅ **Bypasses IP blocking** - Uses OAuth tokens, not direct SMTP
- ✅ **More secure** - No app passwords needed
- ✅ **Works from any IP** - Railway, AWS, anywhere
- ✅ **Still uses Gmail** - Your `premass.overseas@gmail.com` account

---

## Step 1: Create Google Cloud Project (5 minutes)

1. **Go to:** https://console.cloud.google.com/
2. **Create new project:**
   - Click "Select a project" → "New Project"
   - Name: "Premass Overseas Email"
   - Click "Create"

---

## Step 2: Enable Gmail API (2 minutes)

1. **In Google Cloud Console:**
   - Go to **APIs & Services** → **Library**
   - Search for **"Gmail API"**
   - Click **"Enable"**

---

## Step 3: Create OAuth 2.0 Credentials (5 minutes)

1. **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. **If prompted, configure OAuth consent screen:**
   - User Type: **External**
   - App name: **"Premass Overseas"**
   - User support email: **premass.overseas@gmail.com**
   - Developer contact: **premass.overseas@gmail.com**
   - Click **"Save and Continue"**
   - Scopes: **Add scope** → **"https://www.googleapis.com/auth/gmail.send"**
   - Click **"Save and Continue"**
   - Test users: **Add your email** → **Save and Continue**
   - Click **"Back to Dashboard"**

4. **Create OAuth Client ID:**
   - Application type: **"Web application"**
   - Name: **"Railway Backend"**
   - Authorized redirect URIs: **Leave empty** (not needed for service account)
   - Click **"Create"**
   - **COPY Client ID and Client Secret** (you'll need these)

---

## Step 4: Generate Refresh Token (10 minutes)

You need to generate a refresh token once. This is a one-time setup.

### Option A: Using Node.js Script (Easier)

1. **Create file `generate-token.js` in your project:**
```javascript
const { google } = require('googleapis');
const readline = require('readline');

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.send'],
});

console.log('Authorize this app by visiting this url:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', (code) => {
  oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    console.log('Refresh Token:', token.refresh_token);
    console.log('Access Token:', token.access_token);
    rl.close();
  });
});
```

2. **Run:**
```bash
npm install googleapis
node generate-token.js
```

3. **Follow the URL, authorize, copy the code, paste it**
4. **Copy the Refresh Token** - This is what you need for Railway

---

## Step 5: Update Railway Environment Variables

Add these to Railway → Variables:

```
EMAIL_USER=premass.overseas@gmail.com
EMAIL_CLIENT_ID=<your-oauth-client-id>
EMAIL_CLIENT_SECRET=<your-oauth-client-secret>
EMAIL_REFRESH_TOKEN=<your-refresh-token>
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

**Remove:**
- `EMAIL_PASS` (no longer needed with OAuth2)

---

## Step 6: Update emailService.js to Use OAuth2

I'll need to update the code to use OAuth2 instead of app password. This requires installing `googleapis` package.

---

## Alternative: Simpler Solution - Use Gmail with Different Approach

Actually, OAuth2 is complex. Let me provide a **simpler alternative** that might work:

### Try Using Gmail SMTP with Different Settings

Sometimes Gmail works better with:
- Different timeout settings
- Retry logic
- Connection retry on failure

Or we can try a **hybrid approach**: Use Gmail but with a relay service.

---

## Recommendation

Given the complexity of OAuth2 setup, I recommend:

1. **Short term:** Use the OTP from Railway logs (it's always logged)
2. **Medium term:** Set up SendGrid (5 minutes, guaranteed to work)
3. **Long term:** If you really want Gmail, set up OAuth2 (30+ minutes)

Would you like me to:
- A) Set up OAuth2 code (more complex but uses Gmail)
- B) Help you set up SendGrid quickly (5 minutes, works immediately)
- C) Try one more Gmail SMTP configuration tweak
