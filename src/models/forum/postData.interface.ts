import { Category } from './category.interface';
export interface PostData {
	name: string;
	email: string;
	userId: number;
	auth_level: string;
	categories: Category[]
}