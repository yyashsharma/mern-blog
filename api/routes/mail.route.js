import express from "express";

import { sendEmail } from '../controllers/mail.controller.js';

const router = express.Router();


// Define a route to send an email
router.post('/send-email', async (req, res) => {
    const { to, subject, text, html } = req.body;
  
    try {
      await sendEmail(to, subject, text, html);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email' });
    }
  });

export default router;