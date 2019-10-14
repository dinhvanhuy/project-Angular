export class ArticlesList {
  articles: {
    author: {
      bio: string,
      following: boolean,
      image: string,
      username: string
    },
    body: string,
    createdAt: string,
    description: string,
    favorited: boolean,
    favoritesCount: number,
    slug: string,
    tagList: string[],
    title: string
    updatedAt: string
  }[];
  articlesCount: number;
}