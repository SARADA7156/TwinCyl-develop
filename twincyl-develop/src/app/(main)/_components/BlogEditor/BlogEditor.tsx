'use client';
import Text from "@/src/components/Text";
import { cn } from "@/src/lib/utils";
import { BlogEditorInput, formSchema } from "@/src/types/blogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import { onSubmit } from "./handleSubmit";
import Button from "@/src/components/Button";
import { useRouter } from "next/navigation";

const DEFAULT_VALUES: BlogEditorInput = {
    title: "",
    blogType: "blog",
    tags: "",
    mainText: "",
};

export default function BlogEditor(props: Partial<BlogEditorInput> = {}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<BlogEditorInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...DEFAULT_VALUES,
            ...props
        },
    });

    const router = useRouter();

    const CreateInputClass = (error: FieldError | undefined, className?: string): string => {
        return cn("border border-[#aaaaaa] p-1 rounded-md", className, error && "border-red-500")
    }

    return (
        <form onSubmit={handleSubmit((data, e) => onSubmit(data, router, e))}>
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
                <select id="select-blog-type" {...register("blogType")} className="border border-[#aaaaaa] rounded-md p-2 m-1 cursor-pointer hover:bg-[#727272]">
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
    );

}