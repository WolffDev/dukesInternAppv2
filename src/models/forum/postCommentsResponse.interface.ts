import { PostComment } from './postComment.interface';
export interface PostCommentsResponse {
	token: string;
	comments: PostComment[];
}