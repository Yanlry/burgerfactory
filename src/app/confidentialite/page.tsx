import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { legalCompanyInfo as info } from "@/config/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Burger Factory",
  description:
    "Politique de confidentialité et de protection des données personnelles du site Burger Factory.",
  robots: { index: false, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité">
      <LegalSection title="Responsable du traitement">
        <p>
          Le responsable du traitement des données collectées via ce site est{" "}
          {info.raisonSociale}, dont les coordonnées figurent dans les{" "}
          <Link href="/mentions-legales" className="text-gold hover:text-gold-hover underline underline-offset-2">
            mentions légales
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>
          Ce site n&apos;utilise pas de formulaire de collecte de données personnelles. Les
          seules données traitées sont :
        </p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>votre choix relatif aux cookies, enregistré localement dans votre navigateur ;</li>
          <li>
            les données techniques transmises à Google (adresse IP notamment) lors de
            l&apos;affichage de la carte interactive Google Maps sur la page « Nous trouver ».
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Finalités et base légale">
        <p>
          Ces données sont traitées afin d&apos;assurer le bon fonctionnement du site
          (mémorisation de vos préférences cookies) et de vous permettre de localiser le
          restaurant. La base légale est votre consentement (cookies non essentiels) ou
          l&apos;intérêt légitime de l&apos;éditeur (fonctionnement du site).
        </p>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <p>
          Votre choix relatif aux cookies est conservé localement jusqu&apos;à ce que vous le
          modifiiez ou effaciez les données de votre navigateur.
        </p>
      </LegalSection>

      <LegalSection title="Destinataires des données">
        <p>
          Les données liées à l&apos;affichage de la carte Google Maps sont transmises à
          Google LLC, dans le cadre de sa propre politique de confidentialité.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
          Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement, de limitation et d&apos;opposition concernant vos données. Vous
          pouvez exercer ces droits en écrivant à {info.email}.
        </p>
        <p>
          Vous disposez également du droit d&apos;introduire une réclamation auprès de la
          Commission Nationale de l&apos;Informatique et des Libertés (CNIL) — www.cnil.fr.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Pour plus d&apos;informations sur les cookies utilisés par ce site, consultez notre{" "}
          <Link href="/cookies" className="text-gold hover:text-gold-hover underline underline-offset-2">
            politique de cookies
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
