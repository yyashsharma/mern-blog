
import nodemailer from 'nodemailer'

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use any email service like Gmail, Yahoo, etc.
  auth: {
    user: 'sharmayash4118@gmail.com', // Your email address
    pass: 'oratyeshartewhkg'   // Your email password (consider using environment variables for security)
  }
});

// Function to send an email

export async function sendEmail(to, subject, text, html) {
  const mailOptions = {
    from: 'sharmayash4118@gmail.com', // Sender address
    to: to,                       // List of recipients
    subject: subject,             // Subject line
    text: text,                   // Plain text body
    html: html                    // HTML body
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}