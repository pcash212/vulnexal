# Vulnexal - Web Vulnerability Scanner

Professional web vulnerability scanner and security testing tool with Firebase authentication and PWA capabilities.

## 🚀 Features

- ✅ **Persistent Authentication** - Stay logged in across sessions
- ✅ **Progressive Web App (PWA)** - Install on any device
- ✅ **Offline Support** - Works without internet connection
- ✅ **Real-time Scanning** - Live vulnerability detection
- ✅ **Scan History** - Track all your security scans
- ✅ **Firebase Integration** - Secure cloud authentication
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop

## 🔧 Technologies

- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.3.0
- Firebase 9.22.0 (Auth & Firestore)
- Service Worker API
- LocalStorage API

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy from GitHub**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository: `pcash212/vulnexal`
   - Click "Deploy"
   - Done! Your app will be live in seconds

3. **Deploy from CLI**
   ```bash
   cd vulnex
   vercel
   ```

### Deploy to GitHub Pages

Already configured! Just push to main branch and GitHub Pages will auto-deploy.

- **Live URL:** `https://pcash212.github.io/vulnexal/`

### Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Select your GitHub repo
4. Click "Deploy site"

## 🔐 Firebase Configuration

The app uses Firebase for authentication. The configuration is already set up in the code:

- **Project:** web-vulnerability-scanne-f066b
- **Authentication:** Email/Password
- **Database:** Firestore
- **Persistence:** LOCAL (stays logged in)

## 💾 Local Storage

The app stores:
- `vulnexal_user` - User session data
- `rememberedEmail` - Saved email for "Remember Me"
- Service Worker cache - Offline resources

## 🎯 How It Works

1. **Sign Up/Login** - Create account or sign in
2. **Stay Logged In** - Authentication persists across sessions
3. **Scan Websites** - Enter URL and select vulnerability checks
4. **View Results** - See security score and detailed findings
5. **Track History** - All scans saved to your account
6. **Works Offline** - PWA allows offline access

## 📱 PWA Installation

Users can install Vulnexal as a native app:

- **Desktop:** Look for install icon in address bar
- **Android:** Tap "Add to Home Screen" in Chrome menu
- **iOS:** Tap Share → "Add to Home Screen"

## 🔒 Security Features

- ✅ Email verification required
- ✅ Secure Firebase authentication
- ✅ HTTPS enforced on production
- ✅ XSS protection headers
- ✅ Content Security Policy
- ✅ No sensitive data in localStorage

## 📄 License

MIT License - Free to use and modify

## 👨‍💻 Developer

Created by pcash212

---

**Live Demo:** [https://pcash212.github.io/vulnexal/](https://pcash212.github.io/vulnexal/)
