import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { legalCompanyInfo as info } from "@/config/legal";

export const metadata: Metadata = {
  title: "Politique de cookies | Burger Factory",
  description: "Politique de gestion des cookies du site Burger Factory.",
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Politique de cookies">
      <LegalSection title="Qu'est-ce qu'un cookie ?">
        <p>
          Un cookie est un petit fichier texte déposé sur votre appareil lors de la
          consultation d&apos;un site internet. Il permet de stocker des informations relatives
          à votre navigation ou à vos préférences.
        </p>
      </LegalSection>

      <LegalSection title="Cookies utilisés sur ce site">
        <p>
          <strong className="text-warm-white">Cookie de préférence (nécessaire) :</strong> un
          cookie / stockage local mémorise votre choix d&apos;accepter ou de refuser les cookies,
          afin de ne pas vous solliciter à chaque visite. Il ne peut pas être désactivé.
        </p>
        <p>
          <strong className="text-warm-white">Cookies tiers (soumis à consentement) :</strong>{" "}
          lorsque vous consultez la page « Nous trouver », la carte Google Maps intégrée peut
          déposer des cookies appartenant à Google, utilisés à des fins de fonctionnement et
          de mesure d&apos;audience par ce tiers.
        </p>
      </LegalSection>

      <LegalSection title="Gestion de votre consentement">
        <p>
          Lors de votre première visite, une bannière vous permet d&apos;accepter ou de refuser
          les cookies non essentiels. Vous pouvez à tout moment modifier votre choix en
          effaçant les données de navigation de votre navigateur pour ce site, ce qui
          réaffichera la bannière de consentement.
        </p>
      </LegalSection>

      <LegalSection title="Désactivation via votre navigateur">
        <p>
          Vous pouvez également configurer votre navigateur pour refuser l&apos;ensemble des
          cookies ou être averti avant leur dépôt. La désactivation de certains cookies peut
          toutefois limiter certaines fonctionnalités du site (comme l&apos;affichage de la
          carte interactive).
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour toute question relative à cette politique de cookies, vous pouvez nous
          contacter à {info.email}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
