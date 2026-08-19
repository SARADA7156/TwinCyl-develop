'use client';

import Button from "@/src/components/Button";
import Text from "@/src/components/Text";
import { cn } from "@/src/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    title: z.string().min(1),
    blogType: z.enum(["blog", "technical"]),
    tags: z.string().optional(),
    mainText: z.string().min(1),
});

type FromInput = z.infer<typeof formSchema>;

export default function BlogCreator() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FromInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            tags: "",
            blogType: "blog"
        },
    });

    const formatTags = (input?: string): string[] => {
        if (!input) return [];

        return input
            .split(/[,、\s]+/)
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
    };

    const onSubmit = (data: FromInput) => {
        const formattedTags = formatTags(data.tags);

        const payload = {
            title: data.title,
            tags: formattedTags,
            mainText: data.mainText,
        };

        console.log("送信データ:", payload);
    }

    const CreateInputClass = (error: FieldError | undefined, className?: string): string => {
        return cn("border border-[#aaaaaa] p-1 rounded-md bg-[#252525]", className, error && "border-red-500")
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
                <Button type="submit" className="border-fuchsia-600 hover:bg-fuchsia-800" disabled={isSubmitting}>公開</Button>
                <Button type="button">下書きを保存</Button>
            </div>

            {/* タイトル入力欄 */}
            <div className="mt-2">
                <input
                    type="text"
                    id="input-title"
                    {...register('title')}
                    className={CreateInputClass(errors.title, "h-13 w-full")}
                    placeholder="タイトルを入力"
                />
                {errors.title && <Text className="text-red-500">※タイトルが入力されていません</Text>}
            </div>

            {/* ブログタイプ選択 */}
            <div className="mt-2">
                <select id="select-blog-type" {...register("blogType")} className={CreateInputClass(errors.tags, "w-1/6")}>
                    <option value="blog">一般ブログ</option>
                    <option value="technical">技術ブログ</option>
                </select>
            </div>

            {/* タグ入力欄 */}
            <div className="mt-2">
                <input
                    type="text"
                    id="input-tags"
                    {...register('tags')}
                    className={CreateInputClass(errors.tags, "w-full")}
                    placeholder="タグを入力"
                />
            </div>

            <div className="mt-2 h-156">
                {/* 本文入力欄 */}
                <textarea
                    id="input-main-text"
                    {...register("mainText")}
                    className={CreateInputClass(errors.mainText, "w-full h-full")}
                    placeholder="Markdown形式で本文を入力"
                />
                {errors.mainText && <Text className="text-red-500">※本文を入力してください</Text>}
            </div>
        </form>
    );
}