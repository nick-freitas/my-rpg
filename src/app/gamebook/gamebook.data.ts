import { GameBook } from './gamebook.type';

export const GAMEBOOK: GameBook[] = [
  {
    id: 1,
    author: 'Nick Freitas',
    name: `Wizard's Choice`,
    description: 'This is an example Adventure',
    series: 'The First Example Adventure Series',
    system: 'D&D 5e',
    published: new Date('01/01/2021'),
    sections: [
      {
        id: 'BACKSTORY',
        name: 'Backstory',
        content: `Test`,
        progressions: [
          { id: 2, descriptor: 'Shout a warning to Reginold' },
          { id: 3, descriptor: 'Dive Flat to Your Face' },
        ],
      },
      {
        id: 'SHOUTWARNING',
        name: 'Shout a warning to Reginold',
        content: 'Lorem ipsum',
        progressions: [{ id: 3, descriptor: 'Got to Number 2' }],
      },
      {
        id: 'NUMBERTWO',
        name: 'Place Number Two',
        content: 'Lorem Number 2',
        progressions: [{ id: 1, descriptor: 'Back to the main' }],
      },
    ],
  },
];
