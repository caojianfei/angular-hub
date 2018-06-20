import { User } from "./user";
import { Tag } from "./tag";
import { Comment } from "./comment";

export interface Article {
    id: number;
    user_id: number;
    title: string;
    content: string;
    category_id: number;
    user?: User;
    tags?: {
        data: Tag[]
    };
    comments?: {
        data: Comment[]
    };
    answer?: Comment;
}