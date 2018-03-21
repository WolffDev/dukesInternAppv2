import { SingleNews } from "./singleNews.interface";

export interface NewsResponse {
	token: string;
	news: SingleNews[];
}