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
        likes: string,
        views: string,
        postedAt: string
}

