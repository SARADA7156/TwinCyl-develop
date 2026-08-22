'use client';
import { BaseSyntheticEvent } from "react";
import { BlogEditorInput } from "@/src/types/blogSchema";
import { formatTags } from "./formatTags";
import { apiClient } from "@/src/lib/axiosClient";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const onSubmit = (data: BlogEditorInput, router: AppRouterInstance, e?: BaseSyntheticEvent) => {
    const formattedTags = formatTags(data.tags);
    const nativeEvent = e?.nativeEvent as SubmitEvent;

    if (nativeEvent && "submitter" in nativeEvent) {
        const submitter = nativeEvent.submitter as HTMLButtonElement | null;
        const action = submitter?.value;

        const payload = {
            title: data.title,
            tags: formattedTags,
            blogType: data.blogType,
            status: action,
            mainText: data.mainText,
        };

        apiClient.post("/blog/create", payload)
            .then(() => {
                router.push(`/manage_blog?page=1&limit=20&status=${action}`)
            });
    }
}
