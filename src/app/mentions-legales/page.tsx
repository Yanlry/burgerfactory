import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { legalCompanyInfo as info } from "@/config/legal";
import { restaurantConfig } from "@/config/restaurant";

export const metadata: Metadata = {
  title: "Mentions légales | Burger Factory",
  description: "Mentions légales du site Burger Factory.",
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales">
      <LegalSection title="Éditeur du site">
        <p>
          Le présent site est édité par : <strong className="text-warm-white">{info.raisonSociale}</strong>
          {info.formeJuridique !== "[À compléter]" && <>, {info.formeJuridique}</>}
          {info.capitalSocial !== "[À compléter]" && <> au capital social de {info.capitalSocial}</>}.
        </p>
        <p>Siège social : {info.siege}</p>
        <p>RCS / SIREN : {info.rcs}</p>
        <p>N° SIRET : {info.siret}</p>
        <p>N° TVA intracommunautaire : {info.tva}</p>
        <p>
          Adresse d&apos;exploitation : {restaurantConfig.address.full}
        </p>
        <p>Téléphone : {restaurantConfig.phoneDisplay}</p>
        <p>E-mail : {info.email}</p>
        <p>Directeur de la publication : {info.directeurPublication}</p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>Le site est hébergé par :</p>
        <p>{info.hebergeur.nom}</p>
        <p>{info.hebergeur.adresse}</p>
        <p>{info.hebergeur.telephone}</p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus présents sur ce site (textes, images, logos, éléments
          graphiques) est protégé par le droit de la propriété intellectuelle. Toute
          reproduction, représentation ou diffusion, totale ou partielle, sans autorisation
          préalable, est interdite.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          {info.raisonSociale} s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des
          informations diffusées sur ce site, sans garantie d&apos;absence d&apos;erreur ou
          d&apos;interruption. L&apos;éditeur ne saurait être tenu responsable des dommages
          directs ou indirects résultant de l&apos;accès ou de l&apos;utilisation du site.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour toute question relative au site, vous pouvez nous contacter au{" "}
          {restaurantConfig.phoneDisplay} ou par e-mail à {info.email}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
