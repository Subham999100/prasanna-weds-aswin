// All wedding facts live here, taken from info.md, which follows the printed invitation.
// Do not add details that were not supplied.
// Kept as the printed record but not shown on the site: salutation, hometown, message.

export interface Person {
  role: string
  name: string
  salutation?: string // printed line above the name, when there is one
  printed: string
  relation: string
  parents: [string, string]
  hometown: string
}

const bride: Person = {
  role: 'Bride',
  name: 'Prasanna',
  salutation: 'My Niece',
  printed: 'Chy. Sow. Prasanna',
  relation: 'Eldest daughter of',
  parents: ['Smt. Santilata Patnaik', 'Sri Gangadhar Patnaik'],
  hometown: 'Nabrangpur',
}

const groom: Person = {
  role: 'Groom',
  name: 'Aswin',
  printed: 'Chy. Aswin',
  relation: 'Youngest son of',
  parents: ['Smt. Dhanalaxmi Patnaik', 'Late Sri Jagdish Chandra Patnaik'],
  hometown: 'Papdahandi',
}

export const wedding = {
  couple: { bride: 'Prasanna', groom: 'Aswin' },

  invocation: '|| Om Sri Ganeshaya Namaha ||',
  familyHeading: ['Makkuva Family’s', 'Wedding Invitation'],

  // Welcome shown at the top of the Family section.
  welcome: {
    heading: ['Join Us for the', 'Wedding'],
    paragraphs: [
      'With hearts full of love and happiness, we warmly invite you and your family to celebrate the beautiful beginning of Prasanna and Aswin’s journey together.',
      'Your presence, love, and blessings will make our special day even more memorable.',
    ],
  },

  // Sumuhurtham: Friday 27 November 2026, 9:25 PM IST (UTC+05:30)
  ceremonyISO: '2026-11-27T21:25:00+05:30',
  ceremonyDateLabel: 'Friday, 27 November 2026',

  message: 'Your gracious presence with family and friends is highly solicited to bless the newly wedded couple',

  bride,
  groom,

  events: [
    {
      key: 'sumuhurtham',
      title: 'Wedding',
      subtitle: 'Sumuhurtham',
      day: '27',
      month: 'Nov',
      weekday: 'Fri',
      time: '9:25 PM',
    },
    {
      key: 'dinner',
      title: 'Wedding Dinner',
      subtitle: '',
      day: '27',
      month: 'Nov',
      weekday: 'Fri',
      time: 'From 8:00 PM onwards', // no end time supplied
    },
  ],

  venue: {
    name: 'Sarojini Kalyan Mandap',
    addressLines: ['Bypass Road, Gabrieguda', 'Nabarangpur, Odisha, India'], // display wording confirmed by the family
  },

  awaiting: { heading: 'Awaiting Yours', name: 'Smt. Bhudevi Patnaik (Lakshmi)' },
  compliments: ['Rinku', 'Suma', 'Chinni', 'Santu', 'Bhumi', 'Near & Dear'], // keep this order
}

// The family confirmed that the shared Google listing is the wedding venue. Google lists it as
// "SOROJINI FUNCTION HALL" (Bypass road, Nabarangpur, Odisha 764059); the site keeps the family's
// own venue name. Both URLs below were read from Google Maps itself (place and Directions button),
// not built by hand: Maps and Directions point to the same place (feature id
// 0x3a3ab966c9b14e6b:0xf9d453f89b2e4755, Knowledge Graph id /g/11v_4snv85 as in the shared link).
// Directions has no starting point, so Google uses the visitor's own location.
export const VENUE_CONFIRMED = true

export const mapsUrl =
  'https://www.google.com/maps/place/SOROJINI+FUNCTION+HALL/@19.2380598,82.5409963,17z/data=!3m1!4b1!4m6!3m5!1s0x3a3ab966c9b14e6b:0xf9d453f89b2e4755!8m2!3d19.2380598!4d82.5409963!16s%2Fg%2F11v_4snv85'
export const directionsUrl =
  'https://www.google.com/maps/dir//SOROJINI+FUNCTION+HALL,+Bypass+road,+Nabarangpur,+Odisha+764059/@19.2380598,82.5409963,17z/data=!4m16!1m7!3m6!1s0x3a3ab966c9b14e6b:0xf9d453f89b2e4755!2sSOROJINI+FUNCTION+HALL!8m2!3d19.2380598!4d82.5409963!16s%2Fg%2F11v_4snv85!4m7!1m0!1m5!1m1!1s0x3a3ab966c9b14e6b:0xf9d453f89b2e4755!2m2!1d82.5409963!2d19.2380598'

export const nav = [
  { id: 'home', label: 'Invitation' },
  { id: 'family', label: 'Family' },
  { id: 'events', label: 'Events' },
  { id: 'venue', label: 'Venue' },
]
