// All website copy and links live here, so text can be edited without touching layout code.
// Anything marked TODO still needs real info before launch.

export const seo = {
  title: 'Online Pilates with a Teacher | Beginner Pilates at Home',
  description:
    'Live, guided online pilates with a certified teacher. Beginner-friendly group and private classes from home. Your first class is free!',
};

export const links = {
  // TODO: external booking pages. While a link is null, its button shows as "coming soon".
  bookFree: null,
  bookGroup: null,
  bookPrivate: null,
  // TODO: social links
  instagram: null,
  whatsapp: null,
};

export const hero = {
  brand: 'Treat.',
  tagline: 'Online pilates with a teacher.',
  bookLabel: 'Book a Class',
  aboutLabel: 'About',
};

export const book = {
  heading: 'Book a Class',
  intro:
    'Pick the format that feels right for you. All classes are live, guided and beginner-friendly, so you can enjoy pilates at home with a teacher by your side.',
  timezoneNote: 'All times in CET (Central European Time).',
  cards: [
    {
      id: 'free',
      title: 'First Class Free',
      description:
        'New here? Your first class is on me. The easiest way to try live pilates, meet me and see how it feels.',
      facts: ['50 min', 'All levels', 'Google Meet'],
      schedule: ['Any group class time'], // TODO: confirm which class the free offer applies to
      price: 'Free',
      link: 'bookFree',
    },
    {
      id: 'group',
      title: 'Group Class',
      description:
        'Move together, get stronger and join a friendly community. A full-body mat workout for strength, mobility and control.',
      facts: ['50 min', 'All levels', 'Google Meet'],
      schedule: ['Tue 8:00 & 10:00', 'Thu 19:00', 'Fri 9:00'],
      price: '€ TBD', // TODO
      link: 'bookGroup',
    },
    {
      id: 'private',
      title: 'Private Class',
      description:
        'Your time, your goals, my full attention. Pilates tailored to your body, your pace and your goals.',
      facts: ['One-on-one', 'Tailored to you', 'Google Meet'],
      schedule: ["We'll find a time that works for you"],
      price: '€ TBD', // TODO
      link: 'bookPrivate',
    },
  ],
};

export const about = {
  heading: 'Hi, I’m Sasha',
  lead:
    'Join me for live, guided pilates at home. Whether you’re brand new to pilates or have practiced for years, you’ll feel at home here. Come as you are, have fun and move to feel better.',
  paragraphs: [
    'I’m so glad you’re here! A year ago I made a big change: I left my marketing career behind to turn my lifelong love of movement into my work. I’ve always loved ballet, yoga and running, and this year I became a certified pilates teacher with Muse Movement. It’s one of the best decisions I’ve ever made, and I can’t wait to share it with you.',
    'When I moved to a new country, my friends stayed behind, so I started teaching online pilates classes for my closest people. Those first classes were so full of joy that I decided to open the door to more people.',
    'I believe movement is powerful medicine, and I want to make it more accessible to everyone. In my guided pilates classes we build strength, move for joy and feel alive. Just as important, I’m building a friendly community where everyone is welcome. I love getting to know you and supporting you every step of the way.',
  ],
  signoff: 'Hope to see you in class soon!',
};

export const faq = {
  heading: 'FAQ',
  items: [
    {
      q: 'Is online pilates good for beginners?',
      a: 'Absolutely! Beginner pilates is very welcome here. I guide you through every movement, and you can go at your own pace.',
    },
    {
      q: 'Do I need experience or special equipment?',
      a: 'No experience needed. Bring a mat and wear something comfy. Weights, a yoga block or a pilates ball are optional.',
    },
    {
      q: 'How do online pilates classes work?',
      a: 'You book a class, I send you a Google Meet link, and you join live from home. I’ll guide you through the whole class.',
    },
    {
      q: 'What’s the difference between group and private classes?',
      a: 'Group classes are social, energetic and a great way to join the community. Private classes are one-on-one and fully tailored to you.',
    },
    {
      q: 'Can I join from anywhere?',
      a: 'Yes! All you need is an internet connection and enough space for your mat. Just check the class time in your own time zone.',
    },
    {
      q: 'How does the free first class work?',
      a: '[Add details here.]', // TODO
    },
    {
      q: 'What if I miss a class?',
      a: 'No worries, life happens! [Add your rebooking or cancellation policy here.]', // TODO
    },
    {
      q: 'How do I book?',
      a: '[Add booking steps here.]', // TODO
    },
  ],
};

export const contact = {
  heading: 'Let’s Connect',
  text: 'Questions before your first class? I’d love to hear from you! Send me a message anytime.',
};
