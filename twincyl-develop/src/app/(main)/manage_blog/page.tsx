import MainContainer from "@/src/components/MainContainer";
import { BlogListData } from "./types/type";
import Link from "next/link";

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
        <MainContainer title="ブログを管理">
            <ul>
                {datas.data.map((d) => (
                    <li key={d.uuid} className="border-b border-b-[#ffffff34] bg-[#252525] hover:bg-[#4d4d4d]">
                        <Link href={`/blog/view?uuid=${d.uuid}`}>
                            <h3>{d.title}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </MainContainer>
    );
}