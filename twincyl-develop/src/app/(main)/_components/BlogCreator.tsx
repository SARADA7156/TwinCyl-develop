'use client';

import Button from "@/src/components/Button";
import { cn } from "@/src/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
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
        formState: { errors, isSubmitting },
    } = useForm<FromInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            tags: "",
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
            mainText: data.mainText
        };

        console.log("送信データ:", payload);
    }

    const CreateInputClass = (error: FieldError | undefined, className?: string): string => {
        return cn("border border-[#aaaaaa] p-1 rounded-md bg-[#252525]", className, error && "border-red-500")
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
                <Button type="button" className="border-fuchsia-600 hover:bg-fuchsia-800">公開設定</Button>
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
                {errors.title && <p className="text-red-500">※タイトルが入力されていません</p>}
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

            <div className="mt-2 h-156 flex">
                {/* 本文入力欄 */}
                <div className="w-1/2 h-full me-1">
                    <textarea
                        id="input-main-text"
                        {...register("mainText")}
                        className={CreateInputClass(errors.mainText, "w-full h-full")}
                        placeholder="本文を入力"
                    />
                    {errors.mainText && <p className="text-red-500">※本文を入力してください</p>}
                </div>

                {/* プレビューウィンドウ */}
                <div
                    id="blog-preview-window"
                    className="border border-[#aaaaaa] bg-[#252525] p-1 rounded-md w-1/2 h-full ms-1 overflow-y-auto"
                >
                </div>
            </div>
        </form>
    );
}