export class Post {
  photo: string;
  loveIts: number;
  createdAt: number;

  constructor(public title: string, public content: string, public author: string) {}
}
