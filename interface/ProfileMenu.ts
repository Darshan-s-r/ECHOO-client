import React, {useMemo} from "react";
interface profileMenu {
  title: string,
  link: string,
}

export const profileMenu : profileMenu[] = useMemo(() => [
  {
    title: "Posts",
      link: 'http://localhost:3000/',
  },
  {
    title: "Replies",
      link: '/',
  },
  {
    title: "Highlights",
      link: '/',
  },
  {
    title: "Articles",
      link: '/',
  },
  {
    title: "Media",
      link: '/',
  },
  {
    title: "Likes",
      link: '/',
  }

], []);  