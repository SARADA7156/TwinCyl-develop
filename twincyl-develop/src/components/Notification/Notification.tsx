'use client';

import { MdClose, MdError, MdInfo, MdWarning } from "react-icons/md";
import { Notifications, useNotificationStore } from "./useNotificationStore";
import { IconType } from "react-icons";
import "./Notification.css"

const levels: Record<Notifications["level"], string> = {
    info: "通知",
    warn: "警告",
    error: "エラー"
}

const levelIcon: Record<Notifications["level"], IconType> = {
    info: MdInfo,
    warn: MdWarning,
    error: MdError
}

export const Notification = () => {
    const { popupNotifications, removePopupNotifications } = useNotificationStore();

    return (
        <div id="notifications-container" className="fixed bottom-0 right-0 flex flex-col items-center min-w-80 max-w-80 me-8">
            {popupNotifications.map((n) => {
                const Icon = levelIcon[n.level];
                return (
                    <div key={n.id} className={`notification level-${n.level} w-full h-24 p-3 my-2 text-start bg-[#0c0c0c] rounded-md`}>
                        <div className="notification-header flex items-center border-b border-b-[#757575]">
                            <Icon />
                            <p className="ms-2">{levels[n.level]}</p>

                            <button className="ms-auto" onClick={() => removePopupNotifications(n.id)}>
                                <MdClose className="cursor-pointer" />
                            </button>
                        </div>

                        <div className="notification-content truncate mt-1">
                            {n.message}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}