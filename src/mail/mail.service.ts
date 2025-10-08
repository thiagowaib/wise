import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            }
        })
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
            location: string, 
            date: string; 
            maxTemp: number; 
            minTemp: number; 
            rainyHours: Array<{hour: string; chance: number}>
        }
    ) {

        const html = this.loadTemplate('forecast-report', data);
        
        const mailOptions = {
            from: `Wise Mailer <${process.env.GMAIL_USER}>`,
            to,
            subject: `☀️ Previsão do Tempo - ${data.location} (${data.date})`,
            text: 'Veja o relatório completo em HTML.',
            html,
        };

        try{
            const info = await this.transporter.sendMail(mailOptions);
            return {sucess: true, messageId: info.messageId};
        } catch (err) {
            console.log('Falha ao enviar email', {err});
            throw new Error('Falha ao enviar email', err);
        }
    }
}
