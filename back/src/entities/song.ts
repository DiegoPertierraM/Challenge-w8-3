import { type User } from './user';

export type Song = {
  id: string;
  title: string;
  author: Partial<User>;
  year: number;
};

export type SongCreateDto = {
  title: string;
  authorId: string;
  year?: number;
};

export type SongUpdateDto = {
  title?: string;
  author?: string;
  year?: number;
};
