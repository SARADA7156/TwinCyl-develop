export type BlogListItem = {
    title: string;
    blogType: "blog" | "technical";
    status: "published" | "draft";
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