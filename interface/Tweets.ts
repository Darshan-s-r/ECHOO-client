import { ObjectId } from 'mongodb';

interface Image {
  myFile: string;
}

export interface Tweet {
  _id: string,
        firstName: string,
        email: string,
        profileImageURL: string,
        content: string,
        image: Image[],
        postId: string,
        comments: number,
        likes: number,
        views: number,
        postedAt: string
}

