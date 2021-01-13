import { GameBook } from './gamebook.type';

export const GAMEBOOK: GameBook[] = [
  {
    id: 1,
    img:
      'https://media.dnd.wizards.com/styles/story_banner/public/images/head-banner/G30FYHMw8D.jpg',
    author: 'Nick Freitas',
    name: `Wizard's Choice`,
    description: 'This is an example Adventure',
    series: 'The First Example Adventure Series',
    system: 'D&D 5e',
    published: new Date('01/01/2021'),
    sections: [
      {
        isStartingPoint: true,
        id: 'BACKSTORY',
        name: 'Arrival in Orlbar',
        content: `<p>It is the year 1349 DR, in the month of Deepwinter. You have been on the road for nearly two months now, and snow hangs thick on the trees as you make your way towards the town of Orlbar, at the foot of the Greypeak Mountains. The Greypeaks are known throughout Faerun for their silver and iron mines, but it is a different type of metal that brought you here: gold. While you were in Neverwinter you overheard rumours of a large horde of treasure within an abandoned goblin keep. Even tavern rumours prove to be fruitful sometimes, and having been without a purpose for some months, you departed immediately for the Grey Vale. When you reach Orlbar, the air is brisk and town is busy. Carts carry all manner of goods: timber, wool bales, grain, and animals from the surrounding country. Some of these goods would be bound for Waterdeep or Neverwinter, others for the nearby city of Loudwater. Hungry and thirsty after many days on the road, you enter the first tavern you see, The Woodsman’s Retreat, and satisfy your cravings. Bread, cheese and a hot mulled wine do the trick nicely. You then enquire from the barkeep about accomodation. Your bones ache and rest is essential. The mountains can wait one or two days while you rest and replenish your supplies in town. The barkeep tells you that a very respectable inn, the Silver Flask, is just nearby. Toting your backpack, you walk down the street to the Silver Flask and pay for a room. The inkeep is a jolly woman who is glad to have your business, and she lights a cosy fire in your room. You bathe, then lie down to rest and soon fall into a deep sleep; it’s been a 8 while since your travel-hardened self has had clean sheets and a roof overhead! You are woken later that night by noise from the next room. You can hear a woman openly sobbing on the other side of the wall. The sound is gut-wrenching. Every now and then a male voice says something, as if trying to comfort her. You tolerate this for a while, but eventually it becomes evident that sleep is going to be impossible, and you walk out into the hallway and knock on the door to the room next to yours. An elderly man answers. He is dressed finely, like a member of the aristocracy, but sports a nasty black eye and a gash across his cheek. In the background a woman, also richly dressed, sits on a chair by the fire, her face buried in her hands. “Yes? What is it?” the elderly gentleman asks directly. You straighten yourself up, peering into the room. “I was wondering what all the noise was about,” you say, although now you don’t feel quite so annoyed. “I could hear the crying from next door. I was wondering,” you say gruffly, not used to dealing with aristocrats, “If it’s anything I can help you with? Perhaps then we can all get some rest?” At this the woman looks up and sees you. You probably look a fright, after all those weeks on the road – ungroomed, hair dishevelled, travel-worn clothes - but you’ve had a bath so you at least you don’t smell bad. However, your type has an… air about them. You’ve seen a fight or two and know how to handle yourself in most situations. You’re what’s known in these parts as ‘the adventuring type.’ Such types generally know how to get things done, things that others might shy away from. “Show our guest in, Elric,” the woman says weakly, drying her tears with a silk handkerchief.&nbsp;</p>`,
        progressions: [
          { id: 'THE_MYSTERIOUS_KNIGHT', descriptor: 'The Mysterious Knight' },
        ],
      },
      {
        id: 'THE_MYSTERIOUS_KNIGHT',
        name: 'The Mysterious Knight',
        content:
          'Duis bibendum varius erat, vitae accumsan magna. Nunc tempus nec urna vitae consectetur. Sed consequat enim non diam aliquam tincidunt. Nam elementum turpis quis convallis egestas. Proin venenatis tortor ac placerat porttitor. Pellentesque semper lobortis erat in semper. Sed enim libero, semper ac feugiat sit amet, consectetur at lectus.',
        progressions: [
          { id: 'INCOMPETENT_FOOLS', descriptor: 'Incompetent Fools' },
        ],
      },
      {
        id: 'INCOMPETENT_FOOLS',
        name: 'Incompetent Fools',
        content: "You smart. You loyal. I like you. You're done",
        progressions: [
          { id: 'AdventureBegins', descriptor: 'Adventure Begins' },
        ],
      },
      {
        id: 'AdventureBegins',
        name: 'Adventure Begins',
        content: 'Why did you pick that? Go back man.',
        progressions: [],
      },
    ],
  },
];
