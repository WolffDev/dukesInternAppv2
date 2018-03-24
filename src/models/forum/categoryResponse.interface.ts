import { Category } from './category.interface';
export interface CategoryResponse {
	token: string;
	categories: Category[];
}