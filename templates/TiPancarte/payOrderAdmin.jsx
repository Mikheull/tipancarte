import { compile } from 'handlebars';
import mjml2html from 'mjml'
import nodemailer from 'nodemailer';

const template = compile(`
  <mjml>
    <mj-head>
      <mj-title>TiPancarte - Commande payée !</mj-title>
      <mj-font name="Open Sans" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" />
      <mj-attributes>
        <mj-class name="opensansregular" font-family="'Open Sans', sans-serif" font-weight="400" />
        <mj-class name="opensansbold" font-family="'Open Sans', sans-serif" font-weight="700" />
        <mj-class name="btn-primary" color="#000" background-color="#e1ecf7" font-family="'Open Sans', sans-serif" />
      </mj-attributes>
      <mj-style inline="inline">
      </mj-style>
    </mj-head>
    <mj-body background-color="#FFF">
      <mj-section padding="20px 0 20px 0" border-bottom="1px solid #dde6ed">
        <mj-column width="100%">
          <mj-image width="128px" height="30px" align="center" src="https://www.tipancarte.fr/images/email_assets/full_logo_dark@4.png" align="left" />
          <mj-text font-size="20px" align="center">🪧Commande payée! 🪧</mj-text>
        </mj-column>
      </mj-section>
      
      <mj-section background-color="#FFF" padding="0 0 0 0">
        <mj-column>
          <mj-spacer height="20px" />
          <mj-text color="#4a5568" line-height="1.3"> Un paiement à été validé ! </mj-text>
        </mj-column>
      </mj-section>
      
      <mj-section>
          <mj-column width="100%">
            <mj-text align="left" color="#2d3748" font-size="12px">Vous pouvez voir la commande <a href="{{order_link}}" style="color:#000">ici</a></mj-text>
          </mj-column>
        </mj-section>		
      
      <mj-section background-color="#e1ecf7" border-top="1px solid #dde6ed">
        <mj-column width="100%">
          <mj-text align="center" color="#2d3748" font-size="12px">Copyright © 2022, TiPancarte. Tous droits réservés</mj-text>
        </mj-column>
        <mj-column width="100%">
          <mj-text align="center">
            <a href="https://tipancarte.fr/cgv" style="color:#000">Conditions générales de vente</a>
            <span color="#000"> | </span>
            <a href="https://tipancarte.fr/contact" style="color:#000">Besoin d'aide</a>
          </mj-text>
        </mj-column>
        <mj-column>
          <mj-image width="16px" height="16px" src="https://www.tipancarte.fr/images/email_assets/icons/instagram.png" href="https://www.instagram.com/tipancarte" />
        </mj-column>
      </mj-section>
    </mj-body>
    </mjml>
`);

export const payOrderAdmin = async (order_link) => {
  const context = {order_link};
  const mjml = template(context);
  const htmlOutput = mjml2html(mjml).html;

  const transporter = nodemailer.createTransport({
		host: "ssl0.ovh.net",
    name: "ssl0.ovh.net",
    port: 465,
    secure: true, 
    // debug: true,
    // logger: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
	});

	const mailOptions = {
		from: "contact@tipancarte.fr",
		subject: `Commande payée !`,
		html: htmlOutput,
    to: "contact@tipancarte.fr"
	};

  transporter.sendMail({ ...mailOptions, to: "contact@tipancarte.fr" });
}
