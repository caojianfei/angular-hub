import { Authorization } from "./authorization";

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    meta?: Authorization
}
