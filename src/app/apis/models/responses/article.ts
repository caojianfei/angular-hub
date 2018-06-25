import { User } from "./user";
import { Tag } from "./tag";
import { Comment } from "./comment";

export interface Article {
    id: number;
    user_id: number;
    write_type: string;
    title: string;
    content: string;
    category_id: number;
    replay_count: number;
    view_count: number;
    like_count: number;
    order: number;
    excerpt: string;
    slug: string;
    last_replay_time: string;
    answer_id: number;
    share_link: string;
    status: number;
    user?: User;
    tags?: {
        data: Tag[]
    };
    comments?: {
        data: Comment[]
    };
    answer?: Comment;
}