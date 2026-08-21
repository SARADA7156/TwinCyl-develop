import { BaseSyntheticEvent } from "react";
import { FromInput } from "../schemas/blogSchema";
import { formatTags } from "../utils/formatTags";
import { apiClient } from "@/src/lib/axiosClient";

export const onSubmit = (data: FromInput, e?: BaseSyntheticEvent) => {
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

        apiClient.post("/blog/create", payload);
    }
}
