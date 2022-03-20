import { compile } from 'handlebars';
import mjml2html from 'mjml'
import nodemailer from 'nodemailer';

const template = compile(`
  <mjml>
    <mj-head>
      <mj-title>TiPancarte - Commande enregistrée !</mj-title>
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
          <mj-text font-size="20px" align="center">Merci pour votre commande! 🙏</mj-text>
        </mj-column>
      </mj-section>
      
      <mj-section background-color="#FFF" padding="0 0 0 0">
        <mj-column>
          <mj-spacer height="20px" />
          <mj-text color="#4a5568" line-height="1.3"> Vous venez de passer une commande sur <b>TiPancarte</b>, elle à été prise en compte et sera préparée bientôt !<br /> Veuillez noter que la livraison se fera en 5 à 7 jours a compter de la confirmation de la commande ! </mj-text>
          <mj-spacer height="20px" />
          <mj-text color="#4a5568"><b>Commande #:</b> {{order_id}}</mj-text>
          <mj-text color="#4a5568"><b>Status:</b> {{order_status}}</mj-text>
          <mj-text color="#4a5568"><b>Date:</b> {{order_date}}</mj-text>
          <mj-spacer height="40px" />
        </mj-column>
      </mj-section>
      
      <mj-section>
        <mj-column width="500px" background-color="#f5f7fb" padding="20px 10px 20px 10px" border-radius="10px">
          <mj-text color="#4a5568" font-size="20px">Détail de la commande:</mj-text>
          <mj-text color="#4a5568" padding-top="0px"><b>{{number_items}} TiPancarte{{number_items_plural}}</b></mj-text>
          <mj-text color="#4a5568" padding-top="20px">Sous-total: {{order_subtotal}}€</mj-text>
          <mj-text color="#4a5568" padding-top="0px">Réductions: {{order_discount}}€</mj-text>
          <mj-text color="#4a5568" padding-top="0px">Livraison: {{order_shipping}}€</mj-text>
          <mj-text color="#4a5568" padding-top="20px"><b>Total: {{order_total}}€</b></mj-text>
        </mj-column>
      </mj-section>
      
      <mj-section background-color="#FFF" padding="0 0 0 0">
        <mj-column>
          <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" />
          <mj-spacer height="20px" />
        </mj-column>
      </mj-section>
      
      <mj-section background-color="#FFF" padding="0 0 0 0">
        <mj-column>
          <mj-text color="#4a5568"><b>Paiement:</b></mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="#FFF" padding="0 0 0 0">
        <mj-column>
          <mj-text color="#4a5568" padding-top="0px">{{payment_method}}</mj-text>
          <mj-text color="#4a5568" padding-top="0px">{{payment_date}}</mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="#FFF" padding="0 0 0 0">
        <mj-column>
          <mj-spacer height="20px" />
          <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" />
          <mj-spacer height="20px" />
        </mj-column>
      </mj-section>
      
      <mj-section background-color="#FFF" padding="0 0 0 0">
        <mj-column>
          <mj-text color="#4a5568"><b>Livraison:</b></mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="#FFF" padding="0 0 0 0">
        <mj-column>
          <mj-text color="#4a5568" padding-top="0px">{{shipping_address}}</mj-text>
          <mj-text color="#4a5568" padding-top="0px">{{shipping_city}}</mj-text>
          <mj-text color="#4a5568" padding-top="0px">{{shipping_postal_code}}</mj-text>
          <mj-text color="#4a5568" padding-top="0px">{{shipping_country}}</mj-text>
        </mj-column>
      </mj-section>
      <mj-section background-color="#FFF" padding="0 0 0 0">
        <mj-column>
          <mj-spacer height="20px" />
          <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" />
        </mj-column>
      </mj-section>
      
      <mj-section>
          <mj-column width="100%">
            <mj-text align="left" color="#2d3748" font-size="12px">Vous pouvez voir votre reçu <a href="{{order_link}}" style="color:#000">ici</a></mj-text>
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

export const createOrder = async (order_id, order_status, order_date, number_items, number_items_plural, order_subtotal, order_discount, order_shipping, order_total, payment_method, payment_date, shipping_address, shipping_city, shipping_postal_code, shipping_country, order_link, email) => {
  const context = {order_id, order_status, order_date, number_items, number_items_plural, order_subtotal, order_discount, order_shipping, order_total, payment_method, payment_date, shipping_address, shipping_city, shipping_postal_code, shipping_country, order_link, email};
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
		subject: `Merci pour votre commande! 🙏`,
		html: htmlOutput,
    to: email
	};

  transporter.sendMail({ ...mailOptions, to: email });
}
