# Portfolio with Contact Form Email Functionality

A modern portfolio website with a functional contact form that sends emails using SendGrid and Vercel serverless functions.

## Features

- ✨ Modern space-themed design
- 📧 Functional contact form with email sending
- 🌟 Animated elements (waving hand, typing effect)
- 📱 Fully responsive design
- ⚡ Fast loading and optimized performance

## Email Setup Instructions

### 1. SendGrid Setup

1. **Create a SendGrid Account**
   - Go to [SendGrid](https://sendgrid.com/) and create a free account
   - Verify your email address

2. **Create an API Key**
   - In SendGrid dashboard, go to Settings → API Keys
   - Click "Create API Key"
   - Choose "Full Access" or "Restricted Access" with "Mail Send" permissions
   - Copy the API key (you'll only see it once!)

3. **Verify Your Sender Email**
   - Go to Settings → Sender Authentication
   - Verify your domain or at least verify a single sender email
   - This is required for sending emails

### 2. Vercel Environment Variables

1. **Deploy to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Deploy the project

2. **Add Environment Variables**
   - In your Vercel dashboard, go to your project
   - Navigate to Settings → Environment Variables
   - Add the following variables:

   ```
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   RECIPIENT_EMAIL=priyanv783@gmail.com
   SENDGRID_FROM_EMAIL=your_verified_email@yourdomain.com
   ```

   **Important Notes:**
   - `SENDGRID_FROM_EMAIL` must be the email you verified in SendGrid
   - `RECIPIENT_EMAIL` is where you want to receive contact form messages
   - Make sure to redeploy after adding environment variables

### 3. Testing the Contact Form

1. Fill out the contact form on your deployed site
2. Click "Send Message"
3. Check your email (the one set as `RECIPIENT_EMAIL`)
4. You should receive a beautifully formatted email with the contact form details

## File Structure

```
portfolio/
├── index.html              # Main HTML file
├── styles.css              # All CSS styles
├── script.js               # JavaScript functionality
├── package.json            # Dependencies (SendGrid)
├── api/
│   └── send-email.js       # Vercel serverless function
├── assets/
│   └── images/             # Portfolio images
└── README.md               # This file
```

## Customization

### Changing Email Recipient
Update the `RECIPIENT_EMAIL` environment variable in Vercel to change where contact form emails are sent.

### Styling the Email Template
Edit the HTML template in `api/send-email.js` to customize the email appearance.

### Form Fields
Modify the form fields in `index.html` and update the validation in both `script.js` and `api/send-email.js`.

## Troubleshooting

### Common Issues

1. **"Failed to send email" error**
   - Check if SendGrid API key is correct
   - Verify sender email is authenticated in SendGrid
   - Check Vercel function logs for detailed errors

2. **Emails not received**
   - Check spam folder
   - Verify `RECIPIENT_EMAIL` is correct
   - Check SendGrid activity logs

3. **CORS errors**
   - Make sure you're calling the API from the same domain
   - Check Vercel deployment URL

### Debugging

- Check Vercel function logs in your dashboard
- Use browser developer tools to see network requests
- Verify environment variables are set correctly

## Security Notes

- The SendGrid API key is stored securely in Vercel environment variables
- Form validation happens both client-side and server-side
- No data is stored permanently - emails are sent directly
- Rate limiting is handled by SendGrid

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review SendGrid documentation
3. Check Vercel function logs
4. Ensure all environment variables are set correctly

---

**Happy coding! 🚀**

