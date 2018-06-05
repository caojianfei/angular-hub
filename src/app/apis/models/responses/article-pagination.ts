import { Article } from "./article";
import { Pagination } from "./pagination";

export interface ArticlePagination {
    data: Article[],
    meta:  Pagination
}