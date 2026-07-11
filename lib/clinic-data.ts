export type Specialty = {
  slug: string
  fr: string
  wo: string
  practitioner: string
  reasons: string[]
}

// Specialties offered at CLINIQUE MAIMOUNA, with a Wolof label and typical
// consultation reasons (motifs de consultation) used in the booking flow.
export const specialties: Specialty[] = [
  {
    slug: "medecine-generale",
    fr: "Médecin généraliste",
    wo: "Fajkat bu mag",
    practitioner: "Médecin généraliste de la CLINIQUE MAIMOUNA",
    reasons: ["Consultation générale", "Bilan de santé", "Certificat médical", "Renouvellement d'ordonnance"],
  },
  {
    slug: "diabetologie",
    fr: "Diabétologue",
    wo: "Fajkatu sukkar",
    practitioner: "Diabétologue de la CLINIQUE MAIMOUNA",
    reasons: ["Suivi du diabète", "Première consultation", "Adaptation du traitement"],
  },
  {
    slug: "kinesitherapie",
    fr: "Kinésithérapeute",
    wo: "Kinesiterapët",
    practitioner: "Kinésithérapeute de la CLINIQUE MAIMOUNA",
    reasons: ["Rééducation", "Douleurs articulaires", "Suite d'opération"],
  },
  {
    slug: "cardiologie",
    fr: "Cardiologue",
    wo: "Fajkatu xol",
    practitioner: "Cardiologue de la CLINIQUE MAIMOUNA",
    reasons: ["Consultation cardiologique", "Électrocardiogramme (ECG)", "Suivi tension artérielle"],
  },
  {
    slug: "dermatologie",
    fr: "Dermatologue",
    wo: "Fajkatu der",
    practitioner: "Dermatologue de la CLINIQUE MAIMOUNA",
    reasons: ["Problème de peau", "Acné", "Consultation dermatologique"],
  },
  {
    slug: "ophtalmologie",
    fr: "Ophtalmologue",
    wo: "Fajkatu bët",
    practitioner: "Ophtalmologue de la CLINIQUE MAIMOUNA",
    reasons: ["Contrôle de la vue", "Prescription de lunettes", "Consultation ophtalmologique"],
  },
  {
    slug: "radiologie",
    fr: "Radiologue",
    wo: "Radiyoloas",
    practitioner: "Radiologues de la CLINIQUE MAIMOUNA",
    reasons: ["Radiographie", "Échographie", "Imagerie médicale"],
  },
  {
    slug: "gynecologie",
    fr: "Gynécologue",
    wo: "Fajkatu jigéen",
    practitioner: "Gynécologues de la CLINIQUE MAIMOUNA",
    reasons: ["Consultation gynécologique", "Suivi de grossesse", "Frottis / dépistage"],
  },
  {
    slug: "urologie",
    fr: "Urologue",
    wo: "Fajkatu saw",
    practitioner: "Urologue de la CLINIQUE MAIMOUNA",
    reasons: ["Consultation urologique", "Problème urinaire", "Suivi prostate"],
  },
  {
    slug: "orthopedie",
    fr: "Orthopédiste",
    wo: "Fajkatu yax",
    practitioner: "Orthopédistes de la CLINIQUE MAIMOUNA",
    reasons: ["Douleur osseuse ou articulaire", "Fracture", "Consultation orthopédique"],
  },
  {
    slug: "orl",
    fr: "ORL",
    wo: "Fajkatu nopp, bakkan ak put",
    practitioner: "ORL de la CLINIQUE MAIMOUNA",
    reasons: ["Problème d'oreille", "Maux de gorge", "Consultation ORL"],
  },
  {
    slug: "chirurgie-generale",
    fr: "Chirurgien",
    wo: "Opparëkat",
    practitioner: "Chirurgiens de la CLINIQUE MAIMOUNA",
    reasons: ["Consultation chirurgicale", "Avis avant opération", "Suivi post-opératoire"],
  },
  {
    slug: "neurologie",
    fr: "Neurologue",
    wo: "Fajkatu yaram-way",
    practitioner: "Neurologue de la CLINIQUE MAIMOUNA",
    reasons: ["Maux de tête", "Consultation neurologique", "Suivi neurologique"],
  },
  {
    slug: "pediatrie",
    fr: "Pédiatre",
    wo: "Fajkatu xale",
    practitioner: "Pédiatres de la CLINIQUE MAIMOUNA",
    reasons: ["Consultation enfant", "Vaccination", "Suivi de croissance"],
  },
  {
    slug: "laboratoire",
    fr: "Laboratoire d'analyses médicales",
    wo: "Laboratuwaar",
    practitioner: "Laboratoire d'analyses médicales de la CLINIQUE MAIMOUNA",
    reasons: ["Prise de sang", "Analyses médicales", "Test de dépistage"],
  },
]

export const services = [
  { fr: "Hospitalisation", wo: "Faju ci opitaal" },
  { fr: "Imagerie médicale", wo: "Nataalu yaram" },
  { fr: "Laboratoire d'analyses", wo: "Laboratuwaar" },
  { fr: "Urgences", wo: "Yëngu-yëngu" },
]

export const clinic = {
  name: "CLINIQUE MAIMOUNA",
  type: "Clinique médicale",
  address: "Route des HLM, camp Xavier Lelong, Cité millionnaire, Rufisque",
  city: "Rufisque",
  accessInfo: "En face des sapeurs-pompiers",
  languages: ["Français", "Wolof"],
  payments: ["Espèces"],
}

// A curated subset of accepted insurances plus the full IPM list.
export const mainInsurances = [
  "AMSA ASSURANCE",
  "ASKIA ASSURANCE",
  "AXA ASSURANCE",
  "CNART ASSURANCE",
  "NSIA SENEGAL",
  "SAHAM ASSURANCE",
  "SALAMA ASSURANCE",
  "SONAM ASSURANCE",
  "SUNU ASSURANCE",
  "WAFA ASSURANCE VIE",
  "PREVOYANCE ASSURANCE",
  "MSH ASSURANCE",
  "BANQUE ISLAMIQUE DU SENEGAL",
  "NOUVELLE AFRICAINE ASSURANCE",
  "WILLIS TOWER WATSON",
  "UNION EUROPEENNE",
]

export const ipmInsurances = [
  "IPM 2TS", "IPM AFRIC MANAGEMENT", "IPM AGEMAC", "IPM AIR NOUVEL", "IPM AMERGER",
  "IPM ANCAR", "IPM AND BURAFET", "IPM BAOBAB", "IPM BCEAO", "IPM BENEDICTION",
  "IPM BOKK", "IPM C2K STAFFING", "IPM CAISSE DE SECURITE SOCIALE",
  "IPM CAISSE NATIONALE DE SECURITE SOCIALE", "IPM CBAO", "IPM CNFC NOUVEAU QUAI DE PECHE",
  "IPM COLGATE PALMOLIVE", "IPM CONGAD", "IPM CONSORTIUM D'ENTREPRISES",
  "IPM COTONNIERE DU CAP-VERT", "IPM CREDIT MUTUEL DU SENEGAL", "IPM CSE", "IPM DE LA POSTE",
  "IPM DE MARITALIA", "IPM DENTAL", "IPM DES ARMEMENTS DE THIES", "IPM DES PROFESSIONS LIBERALES",
  "IPM DIPROM", "IPM DIRECTION DES ROUTES", "IPM DU KING FAHD PALACE",
  "IPM DU PERSONNEL DE LA SEIB", "IPM ECOBANK", "IPM ECOLE POLYTECHNIQUE DE THIES",
  "IPM EIFFAGE SENEGAL", "IPM ELEMENTS FRANCAIS DU SENEGAL", "IPM ENERGECO AFRIQUE",
  "IPM ENTREPRISE JEAN LEFEVRE", "IPM FADIOU", "IPM FAGARU", "IPM FAGGU",
  "IPM FORCE FRANCAISE DU CAP-VERT", "IPM FORTESA INTERNATIONAL", "IPM GAINDE",
  "IPM GENERAL D'ENTREPRISES", "IPM GROUPE EXPRESS SANTE", "IPM GROUPE FUTURS MEDIAS",
  "IPM GROUPE MIMRAN", "IPM ICS SEFICS SENCHIM SICOTRA PSOA",
  "IPM DE TECHNOLOGIE ALIMENTAIRE", "IPM INTER ENTREPRISE DE LA PETITE COTE",
  "IPM INTER ENTREPRISE FILFILI", "IPM IPRES", "IPM ISENCO",
  "IPM ISRA ROUTE DES HYDROCARBURES", "IPM KEUR GU MAG", "IPM KHADIJA", "IPM LA ROCHETTE",
  "IPM LOTERIE NATIONALE SENEGALAISE", "IPM MAPATHE NDIOUCK", "IPM MATFORCE",
  "IPM MBAARUM KOOLUTE", "IPM MOULINS SENTENAC", "IPM MUTUELLE HOTELIERE DU CAP-VERT",
  "IPM NDIMBAL", "IPM NESTLE SENEGAL", "IPM NJABOOT", "IPM NOUVELLE IMPRIMERIE SENEGALAISE",
  "IPM ODEC DE DAKAR", "IPM OLEOSEN", "IPM ONAS", "IPM PARK DAVIS",
  "IPM PETITES ET MOYENNES ENTREPRISES", "IPM PREMASENA S/C SENAC", "IPM PROFIL",
  "IPM RIDWAN", "IPM RTS", "IPM RUFISQUOISE DE CONSTRUCTION", "IPM SAED",
  "IPM SAFI MEDICAL SERVICES", "IPM SAGAM INTERNATIONAL", "IPM SAGA SENEGAL", "IPM SAGEF",
  "IPM SANTE PLUS", "IPM SANTE POUR TOUS", "IPM SAPEM", "IPM DE LA SAR", "IPM SATCO",
  "IPM SATREC ET COSETEX", "IPM SEIGNEURIE AFRIQUE", "IPM SEN'EAU", "IPM SENEFROID ELECTRO",
  "IPM SENEGALAISE DE L'AUTOMOBILE", "IPM SENELEC", "IPM SENELEC PROMOTION SOCIALE",
  "IPM SENICO CCD", "IPM SEN INTERIM", "IPM SENTENAC", "IPM SENTOO", "IPM SERA",
  "IPM SFD SENEGAL", "IPM SIMES", "IPM SIMPA", "IPM SINCO SPA SUCCURSALE AU SENEGAL",
  "IPM SN HLM", "IPM SOBOA", "IPM SENMEDIC", "IPM SOCIETE AFRICAINE DE MENUISERIE",
  "IPM SOCIETE D'EQUIPEMENT ET DE REPRESENTATION", "IPM SOCIETE ETOILE AUTOMOBILE DU SENEGAL",
  "IPM SOCIETE INDUSTRIELLE BOIS ACIER", "IPM SOCOCIM", "IPM SODEFITEX", "IPM SODEVIT",
  "IPM SOGAS", "IPM SOL CRISTAL", "IPM SOLEIL", "IPM SOMICOA", "IPM SONACOS EID",
  "IPM SONACOS SIEGE", "IPM SONATEL", "IPM SONES", "IPM SORES", "IPM SOSATE", "IPM SOSETER",
  "IPM SOTRAVA", "IPM SUNEOR EID", "IPM SUNEOR SIEGE", "IPM SYPAOA", "IPM TERANGA",
  "IPM TOP-INTER", "IPM TRANSIT", "IPM TRANSPORTS AERIENS", "IPM TRESOR PUBLIC",
  "IPM UBIPHARM", "IPM UNIVERSITE CHEIKH ANTA DIOP", "IPM VIGASSISTANCE",
  "IPM VITOGAZ SENEGAL", "IPM WEER AK DIAM", "IPM WER GI YARAM", "IPM WEST AFRICA COMMODITES",
]

export const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
]
