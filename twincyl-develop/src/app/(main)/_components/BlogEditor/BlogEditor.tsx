'use client';
import Text from "@/src/components/Text";
import { cn } from "@/src/lib/utils";
import { BlogEditorInput, formSchema } from "@/src/types/blogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import Button from "@/src/components/Button";
import { BlogStatus } from "@/src/types/type";
import { formatTags } from "./formatTags";
import { apiClient } from "@/src/lib/axiosClient";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/src/components/Notification/useNotificationStore";

const DEFAULT_VALUES: BlogEditorInput = {
    title: "",
    blogType: "blog",
    tags: "",
    mainText: "",
};

type BlogEditorProps = Partial<BlogEditorInput> & {
    blogId?: string;
    status?: BlogStatus;
    editorMode: "create" | "edit";
};

export default function BlogEditor({ blogId, status, editorMode, ...props }: BlogEditorProps) {
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

    const onSubmit = async (data: BlogEditorInput, status: BlogStatus) => {
        const payload = {
            title: data.title,
            tags: formatTags(data.tags),
            blogType: data.blogType,
            status,
            mainText: data.mainText
        };

        try {
            if (editorMode === "create") {
                await apiClient.post("/blog/create", payload);
            } else {
                await apiClient.post("/blog/update", { uuid: blogId, ...payload });
            }
            addNotification(`ブログが正常に${editorMode === "create" ? "作成" : "更新"}されました。`, "info");
            router.push(`/manage_blog?page=1&limit=20&status=${status}`)
        } catch (e) {
            addNotification(`ブログの${editorMode === "create" ? "作成" : "更新"}に失敗しました。`, "error");
        }
    };

    const { addNotification } = useNotificationStore();

    const onError = () => {
        addNotification("入力内容に誤りがあります。", "error");
    }

    const submitBlog = (action: BlogStatus) => {
        return handleSubmit((data) => onSubmit(data, action), onError)();
    };

    const CreateInputClass = (error: FieldError | undefined, className?: string): string => {
        return cn("border border-[#aaaaaa] p-1 rounded-md", className, error && "border-red-500")
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex">
                {editorMode === "create" &&
                    <Button
                        type="button"
                        className="border-fuchsia-600 hover:bg-fuchsia-800"
                        disabled={isSubmitting}
                        onClick={() => submitBlog("published")}
                    >
                        公開
                    </Button>
                }
                {editorMode === "edit" &&
                    <Button
                        type="button"
                        className="border-fuchsia-600 hover:bg-fuchsia-800"
                        disabled={isSubmitting}
                        onClick={() => submitBlog(status || "draft")}
                    >
                        変更を保存
                    </Button>
                }
                <Button
                    type="button"
                    onClick={() => submitBlog("draft")}
                    disabled={isSubmitting}
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