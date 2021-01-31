import { User } from '../user/user.model';

export interface Progression {
  id: string;
  gamebookId: string;
  descriptor: string;
  destination: string;
  //
  dcType?: string;
  dcValue?: number;
}

export interface Section {
  gamebookId: string;
  id: string;
  name: string;
  content: string;
  isStartingPoint?: boolean;
  progressions: string[];
  _progressions?: Progression[];
}

export interface GameBook {
  id: string;
  img?: string;
  author: string;
  _author?: User;
  name: string;
  description: string;
  series?: string;
  booknumber?: number;
  systemId: string;
  _system?: System;
  published: Date;
  isFeatured?: boolean;
  active: boolean;
  price: number;
  ownedByUser: boolean;
  publishedByUser: boolean;
}

export interface System {
  id: string;
  name: string;
}
