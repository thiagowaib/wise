import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import * as path from 'path';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  private loadTemplate(templateName: string, context: any): string {
    const templatePath = path.join(
      __dirname,
      'templates',
      `${templateName}.html`,
    );

    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(templateSource);
    return template(context);
  }

  async sendForecastMail(
    to: string,
    data: {
      location: string;
      date: string;
      maxTemp: number;
      minTemp: number;
      rainyHours: Array<{ hour: string; chance: number }>;
    },
  ) {
    const html = this.loadTemplate('forecast-report', data);

    try {
      const response = await this.resend.emails.send({
        from: 'Wise <onboarding@resend.dev>', 
        to,
        subject: `☀️ Previsão do Tempo - ${data.location} (${data.date})`,
        html,
      });

      return { success: true, response: response.data };
    } catch (err) {
      console.error('Falha ao enviar email', err);
      throw new Error('Falha ao enviar email');
    }
  }
}
