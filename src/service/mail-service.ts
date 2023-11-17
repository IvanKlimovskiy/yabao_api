import nodemailer from 'nodemailer';
import * as process from 'process';
import dotenv from 'dotenv';

dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        password: SMTP_PASSWORD,
      },
    });
  }

  async sendActivationLinkToMail(to, link);
}

export default new MailService();
