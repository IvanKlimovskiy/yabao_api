import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL } = process.env;

class MailService {
  #transporter;

  constructor() {
    this.#transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async sendActivationLinkToMail(to: string, link: string) {
    await this.#transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: `Подтверждение почты на  ${API_URL}`,
      text: '',
      html: `
          <div>
            <h1>Для активации перейдите по ссылке:</h1>
            <a href='${link}'>${link}</a>
          </div>
            `,
    });
  }
}

export default new MailService();
