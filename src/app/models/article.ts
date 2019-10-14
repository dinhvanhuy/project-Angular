import { Author } from './author';
export interface Article {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: Array<string>;
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    author: Author
  },
}