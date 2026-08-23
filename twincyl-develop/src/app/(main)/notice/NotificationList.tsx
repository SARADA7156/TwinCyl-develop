'use client';
import { levelIcon, levels, useNotificationStore } from "@/src/components/Notification/useNotificationStore"
import { cn, formatDate } from "@/src/lib/utils";
import { MdCheck, MdClose, MdSearch } from "react-icons/md";

export default function NotificationList() {
    const { notifications, removeNotifications, readNotification } = useNotificationStore();

    return (
        <>
            <form className="flex justify-center items-center sticky top-20">
                <div className="flex border border-[#444444] bg-[#111111] justify-center items-center rounded-2xl px-1">
                    <MdSearch className="text-3xl" />
                    <input type="text" name="search-notification" className="w-96" placeholder="通知を検索" />
                </div>
            </form>
            <ul className="mt-6">
                {notifications.map((notice) => {
                    const level = notice.level;
                    const Icon = levelIcon[level];

                    return (
                        <li
                            key={notice.id}
                            className="border-b border-b-[#ffffff34] hover:bg-[#333333b4] p-1 flex items-center cursor-default"
                        >
                            <div className={cn(
                                "flex items-center min-w-28",
                                level === "info" && "text-blue-500",
                                level === "warn" && "text-amber-300",
                                level === "error" && "text-red-600"
                            )}>
                                <Icon className="text-3xl me-2" />
                                <p>{levels[level]}</p>
                            </div>

                            {/* 通知の日付 */}
                            <p>{formatDate(notice.date.toString())}</p>

                            {/* 通知の種類 */}
                            <p className="ms-6 bg-[#81818169] text-[#dadada] px-2 rounded-2xl">{notice.isLocal ? "即時通知" : "一般通知"}</p>

                            {/* 通知本文 */}
                            <p className="ms-6">{notice.message}</p>

                            {/* 通知の未読・既読状態 */}
                            {!notice.read &&
                                <p className="bg-[#81818169] text-[#dadada] px-2 text-sm rounded-2xl">未読</p>
                            }

                            {/* 通知id */}
                            <p className="ms-6 text-[#6b6b6b] text-sm">id: {notice.id}</p>

                            {/* 通知操作処理ボタン類 */}
                            <div className="ms-auto me-5 text-lg">
                                {/* 通知既読ボタン */}
                                {!notice.read &&
                                    <button
                                        className="rounded-2xl hover:bg-[#ffffff5d] p-1 cursor-pointer"
                                        title="通知を既読にする"
                                        onClick={() => readNotification(notice.id)}
                                    >
                                        <MdCheck />
                                    </button>
                                }
                                {/* 通知削除ボタン */}
                                <button
                                    className="rounded-2xl hover:bg-[#ffffff5d] p-1 cursor-pointer"
                                    title="通知を削除する"
                                    onClick={() => removeNotifications(notice.id)}
                                >
                                    <MdClose />
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}