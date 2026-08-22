import { BlogEditorInput } from "./blogSchema";

export type BlogType = "blog" | "technical";
export type BlogStatus = "published" | "draft";

export type BlogListItem = {
    title: string;
    blogType: BlogEditorInput["blogType"];
    status: BlogStatus;
    tags: string[];
    publishedAt: string;
    uuid: string;
    createdAt: string;
    updatedAt: string;
}

export type BlogListData = {
    data: BlogListItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}