// types/types.ts
export interface CommunityPost {
    id: string;
    content: string;
    authorId: string;
    authorName: string;
    communityId: string;
    createdAt: Date;
    likes: string[]; // Array of user IDs who liked the post
    comments: Comment[];
  }
  
  export interface Comment {
    userId: string;
    content: string;
    createdAt: Date;
  }