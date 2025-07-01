# 🚀 Deployment Guide - Production Setup

This guide will help you deploy the Real-Time Code Sharing system to production for use in real classroom environments.

## 🎯 Deployment Options

### 1. Local Network Deployment (Recommended for Classrooms)

Best for: University computer labs, classroom environments, controlled networks

#### Prerequisites
- A computer/server in your classroom network
- All student machines can access the server
- Network administrator permissions (if needed)

#### Setup Steps

1. **Prepare the Server Machine**:
   ```bash
   # Install Node.js and npm
   # Download the project
   git clone <repository-url>
   cd Real-time-code_sharing
   ```

2. **Configure for Local Network**:
   ```bash
   # Backend configuration
   cd backend-server
   cp env.example .env
   ```

   Edit `.env`:
   ```env
   PORT=3001
   CORS_ORIGIN=http://YOUR_SERVER_IP:3000
   NODE_ENV=production
   HOST=0.0.0.0
   ```

3. **Build and Start Services**:
   ```bash
   # Backend
   cd backend-server
   npm install
   npm run build
   npm start

   # Frontend (in new terminal)
   cd lecturer-interface
   npm install
   npm run build
   npm start
   ```

4. **Access the System**:
   - Lecturer Interface: `http://YOUR_SERVER_IP:3000`
   - Backend API: `http://YOUR_SERVER_IP:3001`
   - Students connect to: `http://YOUR_SERVER_IP:3001`

5. **Distribute Extension**:
   - Update extension URL in `vscode-extension/src/extension.ts`
   - Rebuild and package: `npx @vscode/vsce package`
   - Distribute the `.vsix` file to students

### 2. Cloud Deployment (Recommended for Remote Classes)

Best for: Online classes, remote students, distributed teams

#### Option A: Heroku Deployment

1. **Prepare for Heroku**:
   ```bash
   # Install Heroku CLI
   # Login to Heroku
   heroku login
   ```

2. **Create Heroku Apps**:
   ```bash
   # Backend app
   cd backend-server
   heroku create your-code-sharing-backend
   
   # Frontend app
   cd ../lecturer-interface
   heroku create your-code-sharing-frontend
   ```

3. **Configure Environment Variables**:
   ```bash
   # Backend
   heroku config:set NODE_ENV=production
   heroku config:set CORS_ORIGIN=https://your-code-sharing-frontend.herokuapp.com
   
   # Frontend
   heroku config:set REACT_APP_BACKEND_URL=https://your-code-sharing-backend.herokuapp.com
   ```

4. **Deploy**:
   ```bash
   # Backend
   cd backend-server
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   
   # Frontend
   cd ../lecturer-interface
   git add .
   git commit -m "Deploy frontend"
   git push heroku main
   ```

#### Option B: AWS Deployment

1. **EC2 Setup**:
   ```bash
   # Launch EC2 instance
   # Install Node.js, npm, git
   sudo apt update
   sudo apt install nodejs npm git
   ```

2. **Deploy Application**:
   ```bash
   # Clone repository
   git clone <repository-url>
   cd Real-time-code_sharing
   
   # Setup backend
   cd backend-server
   npm install
   npm run build
   
   # Setup frontend
   cd ../lecturer-interface
   npm install
   npm run build
   ```

3. **Configure PM2**:
   ```bash
   # Install PM2
   npm install -g pm2
   
   # Start backend
   cd backend-server
   pm2 start dist/server.js --name "code-sharing-backend"
   
   # Start frontend (serve built files)
   cd ../lecturer-interface
   npm install -g serve
   pm2 start "serve -s build -l 3000" --name "code-sharing-frontend"
   ```

4. **Configure Security Groups**:
   - Allow HTTP (port 80)
   - Allow HTTPS (port 443)
   - Allow custom port 3001 for backend

#### Option C: Railway Deployment

1. **Connect Repository**:
   - Connect your GitHub repository to Railway
   - Railway will auto-detect Node.js projects

2. **Configure Services**:
   ```bash
   # Backend service
   cd backend-server
   # Railway will auto-deploy
   
   # Frontend service
   cd ../lecturer-interface
   # Railway will auto-deploy
   ```

3. **Set Environment Variables**:
   - Backend: `CORS_ORIGIN=https://your-frontend-url.railway.app`
   - Frontend: `REACT_APP_BACKEND_URL=https://your-backend-url.railway.app`

## 🔧 Production Configuration

### Environment Variables

#### Backend Configuration
```env
# Production settings
NODE_ENV=production
PORT=3001
HOST=0.0.0.0

# CORS settings
CORS_ORIGIN=https://your-frontend-domain.com

# Security
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
```

#### Frontend Configuration
```env
# Backend URL
REACT_APP_BACKEND_URL=https://your-backend-domain.com

# Environment
REACT_APP_ENV=production

# Analytics (optional)
REACT_APP_GA_TRACKING_ID=your-ga-id
```

### Security Considerations

#### CORS Configuration
```javascript
// backend-server/src/server.ts
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

#### Rate Limiting
```javascript
// Add to backend-server/src/server.ts
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

#### HTTPS Setup
```javascript
// For production, always use HTTPS
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

## 📦 Extension Distribution

### Update Extension for Production

1. **Modify Backend URL**:
   ```typescript
   // vscode-extension/src/extension.ts
   const BACKEND_URL = 'https://your-backend-domain.com';
   ```

2. **Rebuild and Package**:
   ```bash
   cd vscode-extension
   npm run compile
   npx @vscode/vsce package
   ```

3. **Distribution Methods**:
   - **Email**: Send `.vsix` file to students
   - **Cloud Storage**: Upload to Google Drive, Dropbox, etc.
   - **Learning Management System**: Upload to Canvas, Moodle, etc.
   - **GitHub Releases**: Create release with `.vsix` file

### Extension Installation Instructions

Provide students with these instructions:

1. **Download the extension** from the provided link
2. **Open VSCode/Cursor**
3. **Press Ctrl+Shift+P** (or Cmd+Shift+P on Mac)
4. **Type "Extensions: Install from VSIX"**
5. **Select the downloaded file**
6. **Restart VSCode/Cursor**

## 🔍 Monitoring and Maintenance

### Health Checks

#### Backend Health Check
```bash
# Test backend connectivity
curl https://your-backend-domain.com/health

# Expected response
{"status": "ok", "timestamp": "2024-01-15T10:30:00Z"}
```

#### Frontend Health Check
```bash
# Test frontend connectivity
curl https://your-frontend-domain.com

# Should return HTML page
```

### Logging

#### Backend Logging
```javascript
// Add to backend-server/src/server.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

#### Frontend Error Tracking
```javascript
// Add to lecturer-interface/src/App.tsx
window.addEventListener('error', (event) => {
  console.error('Frontend error:', event.error);
  // Send to error tracking service
});
```

### Performance Monitoring

#### Backend Metrics
- **Response times**: Monitor API response times
- **Memory usage**: Track server memory consumption
- **Connection count**: Monitor active WebSocket connections
- **Error rates**: Track failed requests and errors

#### Frontend Metrics
- **Page load times**: Monitor interface loading speed
- **User interactions**: Track feature usage
- **Error rates**: Monitor client-side errors
- **Connection stability**: Track WebSocket reconnections

## 🔄 Updates and Maintenance

### Automated Deployment

#### GitHub Actions (Example)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "your-code-sharing-backend"
          heroku_email: "your-email@example.com"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "your-code-sharing-frontend"
          heroku_email: "your-email@example.com"
```

### Backup Strategy

#### Data Backup
```bash
# Export submissions regularly
curl -X GET https://your-backend-domain.com/api/codes > backup-$(date +%Y%m%d).json

# Database backup (if using database)
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

#### Configuration Backup
- **Environment variables**: Document all production settings
- **SSL certificates**: Backup and renew before expiration
- **Domain settings**: Keep DNS and domain configurations

## 🚨 Troubleshooting Production Issues

### Common Production Problems

#### High Latency
- **Check server resources**: CPU, memory, network
- **Optimize database queries**: If using database
- **Use CDN**: For static assets
- **Enable compression**: Gzip/Brotli compression

#### Connection Issues
- **Check firewall settings**: Ensure ports are open
- **Verify SSL certificates**: Check expiration dates
- **Monitor network**: Check for packet loss
- **Test from different locations**: Verify global accessibility

#### Memory Leaks
- **Monitor memory usage**: Set up alerts
- **Restart services**: Schedule regular restarts
- **Profile application**: Use Node.js profiling tools
- **Optimize code**: Review for memory leaks

### Emergency Procedures

#### Service Outage
1. **Check service status**: Verify all components are running
2. **Review logs**: Check for error patterns
3. **Restart services**: If necessary
4. **Notify users**: Communicate status updates
5. **Implement fixes**: Deploy patches if needed

#### Data Loss
1. **Stop all services**: Prevent further data loss
2. **Assess damage**: Determine what was lost
3. **Restore from backup**: If available
4. **Investigate cause**: Prevent future occurrences
5. **Communicate with users**: Explain the situation

## 📊 Cost Optimization

### Cloud Cost Management

#### Heroku
- **Use hobby dynos**: For small classes
- **Scale up/down**: Based on usage patterns
- **Monitor usage**: Set up billing alerts

#### AWS
- **Use spot instances**: For cost savings
- **Right-size instances**: Match resources to needs
- **Use reserved instances**: For predictable workloads

#### Railway
- **Monitor usage**: Track resource consumption
- **Optimize builds**: Reduce build times
- **Use caching**: Reduce redundant operations

## 🎯 Success Metrics

### Key Performance Indicators

#### System Performance
- **Uptime**: Target 99.9% availability
- **Response time**: < 200ms for API calls
- **Connection stability**: < 1% WebSocket disconnections

#### User Engagement
- **Active users**: Number of students using the system
- **Submission rate**: Codes shared per session
- **Feature usage**: Which features are most popular

#### Educational Impact
- **Student participation**: Increase in code sharing
- **Feedback quality**: Lecturer satisfaction
- **Learning outcomes**: Improved student performance

---

**Ready to deploy? Choose your deployment option and transform your classroom! 🚀✨** 