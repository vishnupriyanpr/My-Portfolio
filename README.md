# Portfolio with Contact Form Email Functionality

A modern portfolio website with a functional contact form that sends emails using SendGrid and Vercel serverless functions.

## Features

- ✨ Modern space-themed design
- 📧 Functional contact form with email sending
- 🌟 Animated elements (waving hand, typing effect)
- 📱 Fully responsive design
- ⚡ Fast loading and optimized performance

## Email Setup Instructions

### Web3Forms Setup

This portfolio uses [Web3Forms](https://web3forms.com/) for the contact form functionality. It's a serverless contact form solution that sends emails directly to your inbox without requiring backend code.

1. **Access Key**: The contact form is configured with a static Access Key in `script.js`.
2. **Customization**: You can customize the success page or email subject by modifying the hidden fields in the form data within `script.js`.

### Testing the Contact Form

1. Fill out the contact form on your deployed site.
2. Click "Send Message".
3. You should receive an email at your registered Web3Forms email address.

## File Structure

```
portfolio/
├── index.html              # Main HTML file
├── styles.css              # All CSS styles
├── script.js               # JavaScript functionality (contains Web3Forms logic)
├── package.json            # Project metadata
├── assets/
│   └── images/             # Portfolio images
└── README.md               # This file
```

## Customization

### Changing Email Recipient
To change the recipient, you need to create a new Access Key at [Web3Forms](https://web3forms.com/) and update the `access_key` value in `script.js`.

### Form Fields
Modify the form fields in `index.html` and update the validation and `FormData` construction in `script.js`.

## Troubleshooting

### Common Issues

1. **"Failed to send email" error**
   - Check if the Access Key in `script.js` is correct.
   - Ensure you are not exceeding the free tier limits of Web3Forms.
   - Check the browser console for network errors.

2. **Emails not received**
   - Check your spam folder.
   - Verify your email address with Web3Forms.

## Support

If you encounter issues:
1. Check the troubleshooting section above.
2. Review [Web3Forms Documentation](https://docs.web3forms.com/).

---

**Happy coding! 🚀**

