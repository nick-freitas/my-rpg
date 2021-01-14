export interface Section {
  id: string;
  name: string;
  content: string;
  isStartingPoint?: boolean;
  progressions: { id: string; descriptor: string }[];
}

export interface GameBook {
  id: number;
  img?: string;
  author: number;
  name: string;
  description: string;
  series?: string;
  booknumber?: number;
  system: string;
  published: Date;
  sections: Section[];
}
