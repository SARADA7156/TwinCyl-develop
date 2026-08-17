'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    title: z.string().min(1, { message: "ブログのタイトルを入力" }),
    tags: z.string().optional(),
    mainText: z.string().min(1, { message: "本文を入力" }),
});

type FromInput = z.infer<typeof formSchema>;

export default function BlogCreator() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FromInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "no title",
            tags: "",
        },
    });

    const formatTags = (input?: string): string[] => {
        if (!input) return [];

        return input
            .split(/[,、\s]+/)
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
    }

    return(
        <form action=""></form>
    );
}