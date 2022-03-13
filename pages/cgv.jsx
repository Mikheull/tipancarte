import Layout from '../components/Layout'
import { Spacer, Text} from '@geist-ui/core'

export default function CGV() {

  return (
    <Layout title="Condition générales de vente" actual="cgv">
      <div className="py-6 mx-auto max-w-7xl md:px-4 px-10">
        <div className="w-full">
            <Text h1 className="font-bitter">Conditions générales de vente</Text>
        </div>
    
        <div className="w-full my-10">
          <Text p>TiPancarte</Text>
          <Text p>Société Auto-entrepreneur au capital de [CAPITAL_SOCIAL] euros</Text>
          <Text p>Siège social [ADDRESS] [POSTAL_CODE] Paris ;  </Text>
          <Text p>N° de téléphone [TELEPHONE] ; Adresse du courrier électronique contact@tipancarte.fr;</Text>
          <Text p>RCS (ou Répertoire des métiers) de [RCS] n°[SIRET] [NEF_CODE];</Text>
          <Text p>TVA Intra-communautaire n°[TVA];</Text>
          <Text p>Le responsable de la publication personne physique est Bailly Mikhaël;</Text>

          <Spacer h={3}/>
          <Text h2 className='font-bitter'>Article 1 - Objet</Text>
          <Text p>Les présentes conditions régissent les ventes par la société TiPancarte, [ADDRESS] [POSTAL_CODE] Paris, de la vente au détails.</Text>

          <Spacer h={3}/>
          <Text h2 className='font-bitter'>Article 2 - Prix</Text>
          <Text p>Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables au jour de la commande), sauf indication contraire et hors frais de traitement et d&apos;expédition.</Text>
          <Text p>En cas de commande vers un pays autre que la France métropolitaine vous êtes l&apos;importateur du ou des produits concernés. Des droits de douane ou autres taxes locales ou droits d&apos;importation ou taxes d&apos;état sont susceptibles d&apos;être exigibles. Ces droits et sommes ne relèvent pas du ressort de la société <b>TiPancarte</b>. Ils seront à votre charge et relèvent de votre entière responsabilité, tant en termes de déclarations que de paiements aux autorités et organismes compétents de votre pays. Nous vous conseillons de vous renseigner sur ces aspects auprès de vos autorités locales.</Text>
          <Text p>Toutes les commandes quelle que soit leur origine sont payables en euros.  </Text>
          <Text p>La société <b>TiPancarte</b> se réserve le droit de modifier ses prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande et sous réserve de disponibilité.</Text>
          <Text p>Les produits demeurent la propriété de la société <b>TiPancarte</b> jusqu&apos;au paiement complet du prix.  </Text>
          <Text p>Attention : dès que vous prenez possession physiquement des produits commandés, les risques de perte ou d&apos;endommagement des produits vous sont transférés.</Text>

          <Spacer h={3}/>
          <Text h2 className='font-bitter'>Article 3 - Commandes</Text>
          <Text p b>Vous pouvez passer commande :</Text>
          <Text p>Sur Internet : <a href="https://tipancarte.fr">https://tipancarte.fr</a></Text>
          <Text p>Les informations contractuelles sont présentées en langue française et feront l&apos;objet d&apos;une confirmation au plus tard au moment de la validation de votre commande.  </Text>
          <Text p>La société <b>TiPancarte</b> se réserve le droit de ne pas enregistrer un paiement, et de ne pas confirmer une commande pour quelque raison que ce soit, et plus particulièrement en cas de problème d&apos;approvisionnement, ou en cas de difficulté concernant la commande reçue.</Text>

          <Spacer h={3}/>
          <Text h2 className='font-bitter'>Article 4 - Validation de votre commande</Text>
          <Text p>Toute commande figurant sur le site Internet <a href="https://tipancarte.fr">https://tipancarte.fr</a> suppose l&apos;adhésion aux présentes Conditions Générales. Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes conditions générales de vente, sans exception ni réserve.  </Text>
          <Text p>L&apos;ensemble des données fournies et la confirmation enregistrée vaudront preuve de la transaction.</Text>
          <Text p>Vous déclarez en avoir parfaite connaissance.  </Text>
          <Text p>La confirmation de commande vaudra signature et acceptation des opérations effectuées.  </Text>
          <Text p>Un récapitulatif des informations de votre commande et des présentes Conditions Générales, vous sera communiqué en format PDF via l&apos;adresse e-mail de confirmation de votre commande.</Text>

          <Spacer h={3}/>
          <Text h2 className='font-bitter'>Article 5 - Paiement</Text>
          <Text p>Le fait de valider votre commande implique pour vous l&apos;obligation de payer le prix indiqué.</Text>
          <Text p>Le règlement de vos achats s&apos;effectue par carte bancaire grâce au système sécurisé Paypal.</Text>
          <Text p>Le débit de la carte est effectué au moment du paiement de la commande.</Text>

          <Spacer h={3}/>
          <Text h2 className='font-bitter'>Article 6 - Rétractation</Text>
          <Text p>Les retours ne peuvent être effectués dû à leur personnalisation.</Text>
          <Text p>En cas de problème avec votre commande, veuillez nous contacter contact@tipancarte.fr.</Text>
          
          <Spacer h={3}/>
          <Text h2 className='font-bitter'>Article 7- Disponibilité</Text>
          <Text p>Nos produits sont proposés tant qu&apos;ils sont visibles sur le site <a href="https://tipancarte.fr">https://tipancarte.fr</a> et dans la limite des stocks disponibles. Pour les produits non stockés, nos offres sont valables sous réserve de disponibilité chez nos fournisseurs.</Text>
          <Text p>En cas d&apos;indisponibilité de produit après passation de votre commande, nous vous en informerons par mail. Votre commande sera automatiquement annulée et le débit bancaire sera remboursé.</Text>
          <Text p>En outre, le site Internet <a href="https://tipancarte.fr">https://tipancarte.fr</a> n&apos;a pas vocation à vendre ses produits en quantités importantes.</Text>

          <Spacer h={3}/>
          <Text h2 className='font-bitter'>Article 8 - Livraison</Text>
          <Text p>Les produits sont livrés à l&apos;adresse de livraison indiquée au cours du processus de commande, dans le délai indiqué sur la page de validation de la commande.</Text>
          <Text p>En cas de retard d&apos;expédition, un mail vous sera adressé pour vous informer d&apos;une éventuelle conséquence sur le délai de livraison qui vous a été indiqué.</Text>
          <Text p>Conformément aux dispositions légales, en cas de retard de livraison, vous bénéficiez de la possibilité d&apos;annuler la commande dans les conditions et modalités définies à l&apos;article L 138-2 du Code de la Consommation. Si entre temps vous recevez le produit nous procéderons à son remboursement et aux frais d&apos;acheminement dans les conditions de l&apos;article L 138-3 du Code de la Consommation.</Text>
          <Text p>En cas de livraisons par un transporteur, la société <b>TiPancarte</b> ne peut être tenue pour responsable de retard de livraison dû exclusivement à une indisponibilité du client après plusieurs propositions de rendez-vous.</Text>

          <Spacer h={3}/>
          <Text h2 className='font-bitter'>Article 9 - Garantie</Text>
          <Text p>Tous nos produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés, prévues par les articles 1641 et suivants du Code civil. En cas de non-conformité d&apos;un produit vendu, il pourra être retourné ou remboursé.  </Text>
          <Text p>Toutes les réclamations ou demandes de remboursement doivent s&apos;effectuer par Mail dans le délai de 30 jours de la livraison.  </Text>
          <Text p>Les produits doivent nous être retournés dans l&apos;état dans lequel vous les avez reçus avec l&apos;ensemble des éléments (accessoires, emballage, notice...). Les frais d&apos;envoi vous seront remboursés sur la base du tarif facturé et les frais de retour vous seront remboursés sur présentation des justificatifs.</Text>

          <Spacer h={3}/>
          <Text h2 className='font-bitter'>Article 10 - Responsabilité</Text>
          <Text p>Les produits proposés sont conformes à la législation française en vigueur. La responsabilité de la société <b>TiPancarte</b> ne saurait être engagée en cas de non-respect de la législation du pays où le produit est livré. Il vous appartient de vérifier auprès des autorités locales les possibilités d&apos;importation ou d&apos;utilisation des produits ou services que vous envisagez de commander.</Text>
          <Text p>Par ailleurs, la société <b>TiPancarte</b> ne saurait être tenue pour responsable des dommages résultant d&apos;une mauvaise utilisation du produit acheté.</Text>
          <Text p>Enfin la responsabilité de la société <b>TiPancarte</b> ne saurait être engagée pour tous les inconvénients ou dommages inhérents à l&apos;utilisation du réseau Internet, notamment une rupture de service, une intrusion extérieure ou la présence de virus informatiques.</Text>

          <Spacer h={3}/>
          <Text h2 className='font-bitter'>Article 11 - Droit applicable en cas de litiges</Text>
          <Text p>La langue du présent contrat est la langue française. Les présentes conditions de vente sont soumises à la loi française. En cas de litige, les tribunaux français seront les seuls compétents.</Text>

          <Spacer h={3}/>
          <Text h2 className='font-bitter'>Article 12 - Propriété intellectuelle</Text>
          <Text p>Tous les éléments du site <a href="https://tipancarte.fr">https://tipancarte.fr</a> sont et restent la propriété intellectuelle et exclusive de la société <b>TiPancarte</b>. Nul n&apos;est autorisé à reproduire, exploiter, rediffuser, ou utiliser à quelque titre que ce soit, même partiellement, des éléments du site qu&apos;ils soient logiciels, visuels ou sonores. Tout lien simple ou par hypertexte est strictement interdit sans un accord écrit exprès de la société <b>TiPancarte</b>.</Text>

          <Spacer h={3}/>
          <Text h2 className='font-bitter'>Article 13 - Données personnelles</Text>
          <Text p>La société <b>TiPancarte</b> se réserve le droit de collecter les informations nominatives et les données personnelles vous concernant. Elles sont nécessaires à la gestion de votre commande, ainsi qu&apos;à l&apos;amélioration des services et des informations que nous vous adressons.  </Text>
          <Text p> Elles peuvent aussi être transmises aux sociétés qui contribuent à ces relations, telles que celles chargées de l&apos;exécution des services et commandes pour leur gestion, exécution, traitement et paiement.  </Text>
          <Text p>Ces informations et données sont également conservées à des fins de sécurité, afin de respecter les obligations légales et réglementaires.  </Text>
          <Text p>Conformément à la loi du 6 janvier 1978, vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;opposition aux informations nominatives et aux données personnelles vous concernant, directement sur le site Internet.</Text>

          <Spacer h={3}/>
          <Text h2 className='font-bitter'>Article 14 - Archivage Preuve</Text>
          <Text p>La société <b>TiPancarte</b> archivera les bons de commandes et les factures sur un support fiable et durable constituant une copie fidèle conformément aux dispositions de l&apos;article 1348 du Code civil.  </Text>
          <Text p>Les registres informatisés de la société <b>TiPancarte</b> seront considérés par toutes les parties concernées comme preuve des communications, commandes, paiements et transactions intervenus entre les parties.</Text>


          <Text p className='italic'>
            Les présentes CGV ont été générées gratuitement par la société de communication <a href="http://kinic.fr" target="_blank" rel="noreferrer">Kinic</a> - 
            Date de dernière mise à jour 08/03/2022
          </Text>
        </div>
      </div>
    </Layout>
  )
}