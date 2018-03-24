import { Post } from './post.interface';
export interface PostResponse {
	token: string;
	posts: Post[];
}