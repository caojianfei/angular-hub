import { User } from "./user";
import { Article } from "./article";

export interface Comment {
    id: number;
    user_id: number;
    article_id: number;
    replay_id: number;
    content: string;
    created_at: string;
    updated_at: string;
    user?: User;
    replayComment?: Comment;
    article?: Article



}
