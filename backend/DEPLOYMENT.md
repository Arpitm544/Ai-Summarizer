# Backend Deployment to Vercel

## Prerequisites
- Vercel account
- Node.js project with proper dependencies
- Environment variables configured

## Deployment Steps

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy from Root Directory
```bash
# Make sure you're in the root directory (Ai-summarizer/)
vercel
```

### 4. Follow the prompts:
- Set up and deploy: `Y`
- Which scope: Select your account
- Link to existing project: `N`
- Project name: `ai-summarizer-backend` (or your preferred name)
- Directory: `./` (current directory)
- Override settings: `N`

### 5. Set Environment Variables
After deployment, go to your Vercel dashboard and set these environment variables:

#### Required:
- `GROQ_API_KEY` - Your Groq API key
- `MONGODB_URI` - MongoDB connection string (if using database)

#### Optional:
- `FRONTEND_URL` - Your frontend URL for CORS
- `EMAIL_SERVICE` - Email service configuration
- `EMAIL_USER` - Email username
- `EMAIL_PASS` - Email password

### 6. Redeploy with Environment Variables
```bash
vercel --prod
```

## Important Notes

1. **File Uploads**: The `/uploads` directory is excluded from deployment. For production, consider using cloud storage (AWS S3, Cloudinary, etc.)

2. **Database**: If using MongoDB Atlas, make sure your IP whitelist includes Vercel's IP ranges

3. **CORS**: Update `FRONTEND_URL` to your actual frontend domain

4. **Rate Limiting**: The current rate limit is 100 requests per 15 minutes per IP

## API Endpoints

After deployment, your API will be available at:
- `https://your-project.vercel.app/api/health` - Health check
- `https://your-project.vercel.app/api/upload` - File upload
- `https://your-project.vercel.app/api/summarize` - AI summarization
- `https://your-project.vercel.app/api/email` - Email sending

## Troubleshooting

### Build Errors
- Ensure you're in the `backend` directory when running `vercel`
- Check that all dependencies are in `package.json`
- Verify `server.js` is the main entry point

### Runtime Errors
- Check environment variables in Vercel dashboard
- Verify database connection strings
- Check API key validity

### CORS Issues
- Update `FRONTEND_URL` environment variable
- Ensure frontend domain is correct
