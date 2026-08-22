import MainContainer from "@/src/components/MainContainer";
import BlogEditor from "../../_components/BlogEditor/BlogEditor";
import { BlogStatus } from "@/src/types/type";

type Props = {
    searchParams: Promise<{
        uuid?: string;
    }>;
}

type Blog = {
    title: string;
    blogType: "blog" | "technical";
    mainText: string;
    tags: string[];
    status: BlogStatus;
}

export default async function BlogEdit({ searchParams }: Props) {
    const { uuid } = await searchParams;

    if (!uuid) {
        throw new Error("uuidがクエリパラメーターに指定されていません。");
    }

    const params = new URLSearchParams({ uuid });

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/getOne?${params.toString()}`,
        {
            cache: "no-cache",
        }
    );

    if (!res.ok) {
        throw new Error("データの取得に失敗しました。");
    }

    const { title, blogType, tags, mainText, status }: Blog = await res.json();

    return (
        <MainContainer title="ブログを編集">
            <BlogEditor
                editorMode="edit"
                blogId={uuid}
                status={status}
                title={title}
                blogType={blogType}
                tags={tags.join()}
                mainText={mainText}
            />
        </MainContainer>
    )
}