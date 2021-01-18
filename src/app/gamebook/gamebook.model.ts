import {
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/firestore';
import { User } from '../user/user.model';

export interface Progression {
  id: string;
  gamebookId: string;
  sectionId: string;
  descriptor: string;
  dcType?: string;
  dcValue?: number;
}

export interface Section {
  gamebookId: string;
  id: string;
  name: string;
  content: string;
  isStartingPoint?: boolean;
  progressions: number[];
  _progressions?: Progression[];
}

export interface GameBook {
  id: string;
  img?: string;
  author: DocumentReference<User>;
  _author: User;
  name: string;
  description: string;
  series?: string;
  booknumber?: number;
  systemId: string;
  _system: System;
  published: Date;
  isFeatured?: boolean;
  active: boolean;
}

export interface System {
  id: string;
  name: string;
}
