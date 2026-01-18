# 📧 Email Service Setup Tutorial

## 🎓 What You Just Learned

### **1. Third-Party Service Integration**
- How to integrate external services (Nodemailer) into your app
- Using npm packages to add functionality
- Configuring service providers (Gmail SMTP)

### **2. Environment Variables**
- Storing sensitive data (API keys, passwords) securely
- Why we NEVER commit credentials to Git
- Using `process.env` to access variables

### **3. Service Layer Architecture**
- Creating utility/service files for reusable functions
- Separation of concerns (controllers vs services)
- Keeping code DRY (Don't Repeat Yourself)

### **4. Async/Await Patterns**
- Handling asynchronous operations
- Try-catch error handling
- Returning success/failure objects

### **5. Graceful Degradation**
- App continues working even if email fails
- User still gets registered and can use console OTP
- Better user experience

---

## 🛠️ Setup Steps (DO THIS NOW!)

### **Step 1: Get Gmail App Password**

1. **Go to Google Account Settings:**
   - Visit: https://myaccount.google.com/apppasswords
   - Or: Google Account → Security → 2-Step Verification → App passwords

2. **Create App Password:**
   - Select app: "Mail"
   - Select device: "Other (Custom name)"
   - Type: "Premass Backend"
   - Click **Generate**

3. **Copy the Password:**
   - You'll get a 16-character password like: `abcd efgh ijkl mnop`
   - Remove spaces: `abcdefghijklmnop`

### **Step 2: Update .env File**

Open `backend/.env` and replace these lines:

```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

**Example:**
```env
EMAIL_USER=bharath.dev@gmail.com
EMAIL_PASS=xcqkpqvxrswdmnje
```

### **Step 3: Restart Backend Server**

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on port 4000
```

---

## 🧪 Testing the Email Service

### **Test 1: Register a New User**

**Using Postman or cURL:**

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-test-email@gmail.com",
    "password": "Test123!",
    "role": "student"
  }'
```

**Expected Response:**
```json
{
  "message": "Registered successfully. Check your email for OTP.",
  "emailSent": true
}
```

**Check Your Email:**
- You should receive a beautiful HTML email with your OTP code
- Subject: "🔐 Your OTP Code - Premass Overseas"

**Check Console:**
```
✅ OTP email sent successfully
OTP for your-test-email@gmail.com : 123456
```

### **Test 2: Verify OTP**

```bash
curl -X POST http://localhost:4000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-test-email@gmail.com",
    "otp": "123456"
  }'
```

**Check Your Email Again:**
- You should receive a welcome email
- Subject: "🎉 Welcome to Premass Overseas!"

---

## 🔍 How It Works (Architecture)

### **Registration Flow:**

```
User submits registration form
          ↓
Backend receives request (authController.js)
          ↓
Create user in database
          ↓
Generate 6-digit OTP
          ↓
Save OTP to database
          ↓
Call sendOtpEmail() → emailService.js
          ↓
Nodemailer sends email via Gmail SMTP
          ↓
Return success response to user
```

### **File Structure:**

```
backend/
├── .env                          ← Email credentials stored here
├── src/
│   ├── controllers/
│   │   └── authController.js     ← Handles registration/OTP logic
│   └── utils/
│       └── emailService.js       ← Email sending functions
```

### **Why This Architecture?**

1. **Reusability:** 
   - `sendOtpEmail()` can be called from anywhere
   - Easy to add password reset emails, notifications, etc.

2. **Testability:**
   - Can test email service independently
   - Can mock email service in tests

3. **Maintainability:**
   - Email logic in one place
   - Easy to switch providers (Gmail → SendGrid)

4. **Security:**
   - Credentials in `.env`, not hardcoded
   - `.env` is in `.gitignore` (never committed)

---

## 🎨 The Email Templates

### **OTP Email Features:**
- ✅ Professional HTML design
- ✅ Brand colors (Dark Blue #0A3A5E + Orange #F5A623)
- ✅ Large, readable OTP code
- ✅ Expiration warning (10 minutes)
- ✅ Security tips
- ✅ Responsive design

### **Welcome Email Features:**
- ✅ Personalized greeting
- ✅ Role-specific message (student vs employee)
- ✅ Direct dashboard link
- ✅ Clean, professional layout

---

## 🐛 Troubleshooting

### **Problem: "Invalid login" error**

**Cause:** Using regular Gmail password instead of App Password

**Solution:**
1. Enable 2-Step Verification in your Google account
2. Generate an App Password (see Step 1 above)
3. Use the App Password in `.env`

---

### **Problem: Email not sending, but console shows OTP**

**Cause:** Email credentials incorrect or network issue

**Debug:**
1. Check `.env` file has correct EMAIL_USER and EMAIL_PASS
2. Restart backend server (`npm run dev`)
3. Check console for detailed error message
4. Verify internet connection

---

### **Problem: "User already exists" error**

**Cause:** Email already registered

**Solution:**
1. Use a different email
2. Or delete user from database:
```bash
# In MongoDB Compass or mongo shell
db.users.deleteOne({ email: "test@example.com" })
```

---

## 📚 Key Concepts Explained

### **1. SMTP (Simple Mail Transfer Protocol)**

Think of SMTP like the postal service for emails:
- Your app writes the letter (email content)
- Nodemailer is the envelope and stamps
- Gmail SMTP is the post office that delivers it

### **2. Environment Variables**

```javascript
// BAD ❌ - Never do this!
const password = "mySecretPassword123";

// GOOD ✅ - Use environment variables
const password = process.env.EMAIL_PASS;
```

**Why?**
- Credentials never in code
- Different credentials for dev/staging/production
- No risk of leaking secrets to Git

### **3. Async/Await**

```javascript
// Old way (callback hell) ❌
sendEmail(email, otp, function(error, result) {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
});

// Modern way ✅
try {
  const result = await sendEmail(email, otp);
  console.log(result);
} catch (error) {
  console.log(error);
}
```

### **4. Graceful Degradation**

```javascript
// Email fails? No problem - app still works
const emailResult = await sendOtpEmail(email, otp, name);

if (!emailResult.success) {
  console.warn("Email failed, but showing OTP in console");
}

// User can still verify with console OTP
res.status(201).json({ message: "Success" });
```

---

## 🚀 Next Steps

### **Immediate:**
1. ✅ Set up Gmail App Password
2. ✅ Update `.env` file
3. ✅ Test registration + email
4. ✅ Test OTP verification + welcome email

### **Enhancements:**
1. Add "Resend OTP" endpoint that also sends email
2. Add password reset email flow
3. Add ticket notification emails
4. Switch to SendGrid for production (no daily limits)

### **Production Improvements:**
1. Use SendGrid or AWS SES (more reliable)
2. Add email queue (Bull + Redis) for high volume
3. Track email delivery status
4. Add email templates with variables
5. A/B test email designs

---

## 📊 Production Email Services Comparison

| Service | Free Tier | Best For | Setup Difficulty |
|---------|-----------|----------|------------------|
| Gmail SMTP | 500/day | Development | Easy ⭐ |
| SendGrid | 100/day | Production | Medium ⭐⭐ |
| AWS SES | 62,000/month | Enterprise | Hard ⭐⭐⭐ |
| Mailgun | 5,000/month | Developers | Medium ⭐⭐ |
| Postmark | 100/month | Transactional | Medium ⭐⭐ |

---

## 🎯 Interview Talking Points

You can now say:
- ✅ "I integrated third-party email services using Nodemailer"
- ✅ "I implemented secure credential management with environment variables"
- ✅ "I designed responsive HTML email templates"
- ✅ "I used graceful degradation for email failures"
- ✅ "I created a reusable email service layer"

---

## 📖 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail SMTP Settings](https://support.google.com/mail/answer/7126229)
- [HTML Email Best Practices](https://www.campaignmonitor.com/dev-resources/)
- [Environment Variables in Node.js](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs)

---

**Created:** 14 January 2026  
**Status:** ✅ Ready to Use  
**Next Feature:** Admin Dashboard
