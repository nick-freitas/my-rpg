export type Section = {
  id: string;
  name: string;
  content: string;
  isStartingPoint?: boolean;
  progressions: { id: string; descriptor: string }[];
};

export type GameBook = {
  id: number;
  img?: string;
  author: string;
  name: string;
  description: string;
  series?: string;
  booknumber?: number;
  system: string;
  published: Date;
  sections: Section[];
};
