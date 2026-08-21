import { IconType } from "react-icons";
import { BlogListItem } from "./types/type";
import { MdLock, MdPublic } from "react-icons/md";

export const BLOG_TYPE_LABELS: Record<BlogListItem["blogType"], string> = {
    blog: "一般ブログ",
    technical: "技術ブログ"
} as const;

export const BLOG_STATUS_LABELS: Record<BlogListItem["status"], { label: string, icon: IconType }> = {
    draft: { label: "未公開", icon: MdLock },
    published: { label: "公開済み", icon: MdPublic }
} as const;
