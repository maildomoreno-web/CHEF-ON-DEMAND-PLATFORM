"use server";

import postgres from 'postgres';
import { z } from 'zod';

// 1. Schema de Validação (Auditado)
const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string(),
  message: z.string().min(10).max(3000),
  lang: z.string(),
  honeypot: z.string().optional(), 
});

// 2. Ligação ao Neon
const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
  idle_timeout: 20, 
  max_lifetime: 60 * 30,
});

export async function sendContactForm(rawData: any) {
  try {
    console.log("Iniciando validação de dados...");
    const validated = ContactSchema.parse(rawData);
    const isPt = validated.lang === 'pt';
    
    console.log("Tentando gravar no Neon...");
    await sql`
      INSERT INTO contacts (
        name, email, subject, message, language
      ) VALUES (
        ${validated.name}, ${validated.email}, ${validated.subject}, ${validated.message}, ${validated.lang}
      )
    `;
    console.log("Sucesso: Dados gravados no banco de dados.");

    // Obter Detalhes do Departamento (Elite Mapping)
    const dept = getDepartmentDetails(validated.subject, isPt);
    
    console.log(`Disparando e-mail via Brevo. Remetente: ${dept.email}`);

    // 3. Enviar E-mail via Brevo com Design de Alta Fidelidade (Cormorant Garamond)
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { 
          name: dept.name, 
          email: dept.email 
        },
        to: [
          { email: dept.email }, // Notificação Interna
          { email: validated.email, name: validated.name } // Confirmação para o Cliente
        ],
        replyTo: { email: dept.email },
        subject: isPt 
          ? `Chef on Demand | Contacto: ${validated.subject}` 
          : `Chef on Demand | Inquiry: ${validated.subject}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
          </head>
          <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Source Sans 3', sans-serif; -webkit-font-smoothing: antialiased;">
            <div style="max-width: 600px; margin: auto; padding: 50px 20px; border: 1px solid #f0f0f0;">
              
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 26px; color: #000000; text-transform: uppercase; letter-spacing: 0.04em; margin: 0;">
                  Chef on Demand
                </h1>
                <p style="font-family: 'Cormorant Garamond', serif; font-size: 14px; font-style: italic; color: #c5a059; margin-top: 5px;">The Art of Gastronomy at your door</p>
                <div style="width: 30px; height: 1px; background-color: #c5a059; margin: 20px auto;"></div>
              </div>

              <div style="font-size: 16px; line-height: 1.6; color: #1a1a1a;">
                <p style="font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; margin-bottom: 20px;">
                  ${isPt ? `Estimado(a) ${validated.name},` : `Dear ${validated.name},`}
                </p>
                <p>
                  ${isPt 
                    ? 'Confirmamos a receção da sua mensagem. A nossa equipa irá analisar o seu pedido com a máxima atenção e entraremos em contacto brevemente.' 
                    : 'We confirm the receipt of your message. Our team will review your request with the utmost attention and we will be in touch shortly.'}
                </p>

                <div style="margin: 35px 0; padding: 25px; background-color: #fcfcfc; border-left: 2px solid #c5a059;">
                  <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #c5a059; font-weight: 600;">
                    ${isPt ? 'Detalhes do Pedido' : 'Inquiry Details'}
                  </p>
                  <p style="margin: 10px 0 0 0; font-size: 14px; font-weight: 600; color: #000;">${validated.subject}</p>
                  <p style="margin: 8px 0 0 0; font-size: 14px; color: #555; font-style: italic;">"${validated.message}"</p>
                </div>
              </div>

              <div style="margin-top: 50px; text-align: center; border-top: 1px solid #f8f8f8; padding-top: 30px;">
                <p style="font-size: 11px; color: #999999; text-transform: uppercase; letter-spacing: 0.05em;">
                  © 2026 Chef on Demand | Excellence in Private Dining
                </p>
              </div>

            </div>
          </body>
          </html>
        `
      })
    });

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      console.error("Erro na API da Brevo:", errorText);
      return { success: false, error: "Email provider error" };
    }

    console.log("Sucesso: E-mails enviados com identidade de marca.");
    return { success: true };

  } catch (error) {
    console.error("ERRO CRÍTICO SERVER ACTION:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed", details: error.issues };
    }
    return { success: false, error: "Internal server error" };
  }
}

/**
 * Função Auxiliar de Mapeamento de Departamentos
 */
function getDepartmentDetails(subject: string, isPt: boolean) {
  const mapping: Record<string, { email: string; name: string }> = {
    event: { 
      email: "info@chefondemand.art", 
      name: isPt ? "Chef on Demand | Evento Privado" : "Chef on Demand | Private Events" 
    },
    chef: { 
      email: "partners@chefondemand.art", 
      name: isPt ? "Chef on Demand | Partners" : "Chef on Demand | Partnerships" 
    },
    marketing: { 
      email: "marketing@chefondemand.art", 
      name: "Chef on Demand | Marketing" 
    },
    press: { 
      email: "marketing@chefondemand.art", 
      name: isPt ? "Chef on Demand | Imprensa" : "Chef on Demand | Press" 
    },
    support: { 
      email: "helpdesk@chefondemand.art", 
      name: isPt ? "Chef on Demand | Suporte Técnico" : "Chef on Demand | Technical Support" 
    },
    other: { 
      email: "info@chefondemand.art", 
      name: "Chef on Demand" 
    }
  };

  return mapping[subject] || mapping.other;
}