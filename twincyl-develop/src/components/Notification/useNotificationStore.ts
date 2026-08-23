'use client';

import { create } from "zustand";

export interface Notifications {
    id: string;
    level: "info" | "warn" | "error";
    message: string;
    read: boolean;
}

export interface NotificationState {
    /** 通知が格納される変数です */
    notifications: Notifications[];

    /** 現在ポップアップ表示されている通知のデータを格納する */
    popupNotifications: Notifications[];

    /**
     * 通知を追加します。
     * @param message 通知の本文
     * @param level 通知のレベル
     */
    addNotification: (
        message: Notifications["message"],
        level: Notifications["level"],
    ) => void;

    /**
     * 通知を削除します。
     * @param id 通知を削除するid
     */
    removeNotifications: (id: string) => void;

    /**
     * ポップアップ表示されている任意の通知を削除します。
     * @param id 削除する通知のid
     */
    removePopupNotifications: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => {
    // 共通の削除ロジック(ヘルパー関数)
    const removeFromList = (list: Notifications[], id: string) =>
        list.filter((n) => n.id !== id);

    return {
        notifications: [],

        popupNotifications: [],

        addNotification: (message, level = "info") => {
            // 重複を防いだ一意のidを生成する
            const id = crypto.randomUUID();
            const read = false;

            set((state) => ({
                notifications: [...state.notifications, { id, level, message, read }],
                popupNotifications: [...state.popupNotifications, { id, level, message, read }]
            }));

            // ポップアップ表示されている通知を自動的に削除する
            setTimeout(() => {
                set((state) => ({
                    popupNotifications: removeFromList(state.popupNotifications, id),
                }));
            }, 5000);
        },
        removeNotifications: (id) => set((state) => ({
            notifications: removeFromList(state.notifications, id),
        })),

        removePopupNotifications: (id) => {
            set((state) => ({
                // ポップアップを削除するボタンが押された場合のみ、既読フラグを付ける。
                notifications: state.notifications.map(n => {
                    if (n.id === id) return { ...n, read: true };

                    return n;
                }),

                popupNotifications: removeFromList(state.popupNotifications, id),
            }));
        },
    }
});