import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { GameBook } from '../gamebook/gamebook.model';

export interface User {
  id?: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  roles?: string[];
  library?: DocumentReference<GameBook>[];
  published?: DocumentReference<GameBook>[];
}
