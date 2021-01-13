import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-featured-stories',
  templateUrl: './featured-stories.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedStoriesComponent implements OnInit {
  stories: any[];

  constructor() {
    this.stories = [
      {
        img:
          'https://media.dnd.wizards.com/styles/story_banner/public/images/head-banner/G30FYHMw8D.jpg',
        name: `Wizard's Choice`,
        gamebookId: 1,
        description: 'The example adventure, yay',
      },
      {
        img:
          'https://media.dnd.wizards.com/styles/second_hubpage_banner/public/images/head-banner/COS_Throne_0.jpg',
        name: `Vampire's Choice`,
        description: 'This is never gonna happen',
      },
      {
        img:
          'https://images.squarespace-cdn.com/content/v1/55f77915e4b0fb0e9ba5f7d8/1451664122529-P66AT0NZKB1KR3TRIJ3Z/ke17ZwdGBToddI8pDm48kP0H4u0KUkchoILChBGMIUUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dspSxC7z8JQoYVXKkcsCpJxtpQ-YvXPQAYjcyDPMVCUA3WUfc_ZsVm9Mi1E6FasEnQ/image-asset.jpeg?format=2500w',
        name: `Ranger's Choice`,
        description: 'Can you even read this?',
      },
    ];
  }

  ngOnInit(): void {}
}
