'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { MdSearch } from "react-icons/md";

export default function SearchForm() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateQueryParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set(key, value);

        router.push(`${pathname}?${params.toString()}`);
    }

    const handleChange = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        updateQueryParam(e.target.name, e.target.value);
    }

    return (
        <form className="flex justify-center items-center sticky top-20">
            <div className="flex border border-[#444444] bg-[#111111] justify-center items-center rounded-2xl px-1">
                <MdSearch className="text-3xl" />
                <input type="text" className="w-96" placeholder="ブログを検索" />
            </div>

            {/* 公開ステータス選択 */}
            <select
                name="status"
                id="select-blog-status"
                className="border border-[#444444] bg-[#111111] rounded-2xl ms-2 px-1"
                onChange={(e) => handleChange(e)}
                defaultValue={"published"}
            >
                <option value="published">公開済み</option>
                <option value="draft">下書き</option>
            </select>

            {/* ブログタイプ選択 */}
            {/* <select
                name="type"
                id="select-blog-type"
                className="border border-[#444444] bg-[#111111] rounded-2xl ms-2 px-1"
            >
                <option value="blog">一般ブログ</option>
                <option value="technical">技術ブログ</option>
            </select> */}

            {/* 1ページ当たりの行数 */}
            <div>
                <label htmlFor="select-blog-limit" className="ms-2">1ページ当たりの行数: </label>
                <select
                    name="limit"
                    id="select-blog-limit"
                    className="border border-[#444444] bg-[#111111] rounded-2xl px-1"
                    onChange={(e) => handleChange(e)}
                    defaultValue={"20"}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
            </div>
        </form>
    );
}