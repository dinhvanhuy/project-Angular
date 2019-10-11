import { Author } from './author';
export interface Comment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: Author;
}
