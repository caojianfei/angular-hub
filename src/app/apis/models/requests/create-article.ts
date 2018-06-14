export interface CreateArticle {
    title: string;
    category_id: number;
    tags: number[];
    content: string;
    write_type: number;
    status: number;
}