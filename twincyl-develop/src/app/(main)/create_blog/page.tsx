'use client';

import MainContainer from "@/src/components/MainContainer";
import Button from "@/src/components/Button";
import Text from "@/src/components/Text";
import { cn } from "@/src/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import { formSchema, FromInput } from "./schemas/blogSchema";
import { onSubmit } from "./api/handleSubmit";

export default function CreateBlog() {
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

    const CreateInputClass = (error: FieldError | undefined, className?: string): string => {
        return cn("border border-[#aaaaaa] p-1 rounded-md bg-[#252525]", className, error && "border-red-500")
    }

    return (
        <MainContainer title="ブログを作成">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
                <Button
                    type="submit"
                    className="border-fuchsia-600 hover:bg-fuchsia-800"
                    disabled={isSubmitting}
                    name="action"
                    value="published"
                >
                    公開
                </Button>
                <Button
                    type="submit"
                    name="action"
                    value="draft"
                >
                    下書きを保存
                </Button>
                <select id="select-blog-type" {...register("blogType")} className={CreateInputClass(errors.tags, "w-1/6")}>
                    <option value="blog">一般ブログ</option>
                    <option value="technical">技術ブログ</option>
                </select>
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
        </MainContainer>
    );
}