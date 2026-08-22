'use client';
import { BlogEditorInput } from "@/src/types/blogSchema";
import { formatTags } from "./formatTags";
import { apiClient } from "@/src/lib/axiosClient";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BlogStatus } from "@/src/types/type";

export const onSubmit = async(
    data: BlogEditorInput,
    router: AppRouterInstance,
    mode: "create" | "edit",
    status: BlogStatus
) => {
    const formattedTags = formatTags(data.tags);

    const payload = {
        title: data.title,
        tags: formattedTags,
        blogType: data.blogType,
        status,
        mainText: data.mainText,
    };

    if (mode === "create") {
        await apiClient.post("/blog/create", payload);

        router.push(
            `/manage_blog?page=1&limit=20&status=${status}`
        );
    }

    if (mode === "edit") {
        await apiClient.post("/blog/update", payload);

        router.push(
            `/manage_blog?page=1&limit=20&status=${status}`
        );
    }
}