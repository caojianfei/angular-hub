import { User } from "./user";
import { Tag } from "./tag";

export interface Article {
    id: number;
    user_id: number;
    title: string;
    content: string;
    category_id: number;
    user?: User;
    tags?: Tag[];
}