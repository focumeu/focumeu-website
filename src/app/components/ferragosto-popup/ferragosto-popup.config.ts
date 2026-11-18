/**
 * ═══════════════════════════════════════════════════════════════════
 *  POPUP FERRAGOSTO — contenuti
 *  Modifica qui piatti, prezzo e orari ogni anno.
 *  L'anno nella data si aggiorna da solo.
 * ═══════════════════════════════════════════════════════════════════
 */

export type Lang = 'it' | 'en' | 'fr';
export type Text = Record<Lang, string>;

export interface FerragostoConfig {
  /** primo giorno in cui il popup compare (mese-giorno) */
  showFrom: string;
  /** ultimo giorno in cui il popup compare (mese-giorno), incluso */
  showUntil: string;
  price: number;
  whatsapp: string;
  labels: {
    date: Text;
    title: Text;
    subtitle: Text;
    choice: Text;
    perPerson: Text;
    or: Text;
    book: Text;
    close: Text;
  };
  courses: { title: Text; dishes: Text[] }[];
  /** info su servizio: pranzo, cena, vino, coperto… */
  info: Text[];
  /** condizioni: prenotazione, posti, durata tavolo… */
  rules: Text[];
}

export const FERRAGOSTO: FerragostoConfig = {
  showFrom: '08-01',
  showUntil: '08-15',
  price: 50,
  whatsapp: '393516372505',

  labels: {
    date: { it: '15 agosto', en: '15 August', fr: '15 août' },
    title: {
      it: 'Ferragosto vista mare',
      en: 'Ferragosto by the sea',
      fr: 'Ferragosto face à la mer',
    },
    subtitle: {
      it: 'Festeggia Ferragosto con il nostro menù speciale.',
      en: 'Celebrate Ferragosto with our special menu.',
      fr: 'Célébrez Ferragosto avec notre menu spécial.',
    },
    choice: {
      it: 'Un antipasto, un primo e un secondo a scelta',
      en: 'Choose one starter, one first course and one main',
      fr: 'Une entrée, un premier plat et un plat principal au choix',
    },
    perPerson: { it: 'a persona', en: 'per person', fr: 'par personne' },
    or: { it: 'oppure', en: 'or', fr: 'ou' },
    book: {
      it: 'Prenota su WhatsApp',
      en: 'Book on WhatsApp',
      fr: 'Réserver sur WhatsApp',
    },
    close: { it: 'Chiudi', en: 'Close', fr: 'Fermer' },
  },

  courses: [
    {
      title: { it: 'Antipasti', en: 'Starters', fr: 'Entrées' },
      dishes: [
        { it: 'Impepata di cozze', en: 'Peppered mussels', fr: 'Moules au poivre' },
        { it: 'Insalata di mare', en: 'Seafood salad', fr: 'Salade de fruits de mer' },
      ],
    },
    {
      title: { it: 'Primi', en: 'First courses', fr: 'Premiers plats' },
      dishes: [
        { it: 'Spaghetti alle alici', en: 'Spaghetti with anchovies', fr: 'Spaghetti aux anchois' },
        {
          it: 'Paccheri al pesce spada, menta e pomodorini',
          en: 'Paccheri with swordfish, mint and cherry tomatoes',
          fr: 'Paccheri à l’espadon, menthe et tomates cerises',
        },
      ],
    },
    {
      title: { it: 'Secondi', en: 'Main courses', fr: 'Plats principaux' },
      dishes: [
        { it: 'Trancio di pesce spada alla griglia', en: 'Grilled swordfish steak', fr: 'Pavé d’espadon grillé' },
        { it: 'Frittura di calamari', en: 'Fried squid', fr: 'Friture de calamars' },
      ],
    },
    {
      title: { it: 'Contorno', en: 'Side dish', fr: 'Accompagnement' },
      dishes: [
        { it: 'Insalata fresca di stagione', en: 'Fresh seasonal salad', fr: 'Salade fraîche de saison' },
      ],
    },
  ],

  info: [
    { it: 'Pranzo 12:00 – 16:00', en: 'Lunch 12:00 – 16:00', fr: 'Déjeuner 12h00 – 16h00' },
    { it: 'Cena dalle 20:00', en: 'Dinner from 20:00', fr: 'Dîner à partir de 20h00' },
    {
      it: 'Una bottiglia di vino della casa ogni 4 persone',
      en: 'One bottle of house wine every 4 guests',
      fr: 'Une bouteille de vin maison pour 4 personnes',
    },
    { it: 'Coperto incluso', en: 'Cover charge included', fr: 'Couvert inclus' },
    { it: 'Bevande escluse', en: 'Drinks not included', fr: 'Boissons non comprises' },
  ],

  rules: [
    { it: 'Prenotazione obbligatoria', en: 'Reservation required', fr: 'Réservation obligatoire' },
    { it: 'Posti limitati', en: 'Limited availability', fr: 'Places limitées' },
    { it: 'Durata del tavolo: 90 minuti', en: 'Table time: 90 minutes', fr: 'Durée de la table : 90 minutes' },
  ],
};
