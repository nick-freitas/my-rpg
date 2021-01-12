export type Section = {
  id: string;
  name: string;
  content: string;
  progressions: { id: number; descriptor: string }[];
};

export type GameBook = {
  id: number;
  author: string;
  name: string;
  description: string;
  series?: string;
  booknumber?: number;
  system: string;
  published: Date;
  sections: Section[];
};
