import MainContainer from "@/src/components/MainContainer";
import { BlogListData } from "@/src/types/type";
import Link from "next/link";
import { formatDate } from "@/src/lib/utils";
import { BLOG_STATUS_LABELS, BLOG_TYPE_LABELS } from "./labelMap";
import SearchForm from "./components/SearchForm";

type Props = {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        status?: "published" | "draft";
    }>;
}

export default async function ManagerBlog({ searchParams }: Props) {
    const { page = "1", limit = "20", status = "published" } = await searchParams;

    const params = new URLSearchParams({
        page,
        limit,
        status,
    });

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog?${params.toString()}`,
        {
            cache: "no-cache",
        }
    );

    if (!res.ok) {
        throw new Error("データの取得に失敗しました。");
    }

    const datas: BlogListData = await res.json();

    return (
        <>
            <SearchForm />
            <MainContainer title="ブログを管理">
                <div>
                    <ul className="mt-3">
                        {datas.data.map((d) => {
                            const labelData = BLOG_STATUS_LABELS[d.status];
                            return (
                                <li
                                    key={d.uuid}
                                    className="border-b border-b-[#ffffff34] hover:bg-[#333333b4] p-1 flex items-center"
                                >
                                    <div className="flex flex-col">
                                        <Link
                                            href={`/manage_blog/edit?uuid=${d.uuid}&editor_mode=edit`}
                                            className="hover:underline text-lg max-w-xl w-xl truncate"
                                        >
                                            {d.title}
                                        </Link>
                                        <div className="tags-container flex text-sm text-[#858585]">
                                            {d.tags.map((tag, idx) => (
                                                <p key={`tag-${idx}`} className="me-1">#{tag}</p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center ms-auto">
                                        <div className="flex items-center">
                                            <div className="bg-[#303030] p-1 px-2 me-2 rounded-2xl flex items-center justify-center">
                                                <labelData.icon className="text-2xl" />
                                                <p>{labelData.label}</p>
                                            </div>
                                            <p className="bg-[#303030] p-1 px-2 me-2 rounded-2xl">{BLOG_TYPE_LABELS[d.blogType]}</p>
                                        </div>
                                        <p className="text-sm">作成日: {formatDate(d.createdAt)}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </MainContainer>
        </>
    );
}