'use client';

import { useEffect } from "react";
import { NotificationItem, useNotificationStore } from "./useNotificationStore";

type NotificationEvent = {
    date: Date;
    message: NotificationItem["message"];
    level: NotificationItem["level"];
}

export const useNotificationSSE = () => {
    useEffect(() => {
        const eventSource = new EventSource(
            `${process.env.NEXT_PUBLIC_API_URL}/notification/stream`,
        );

        // ★ type: "notification" に合わせて addEventListener を使う
        const handleNotification = (event: MessageEvent) => {
            try {
                const notification: NotificationEvent = JSON.parse(event.data);

                useNotificationStore.getState().addNotification(
                    notification.message,
                    notification.level,
                    false,
                );
            } catch (error) {
                useNotificationStore.getState().addNotification(
                    "通知の解析に失敗しました",
                    "error"
                );
                console.error("JSON parse error:", error);
            }
        };

        const handleError = (error: Event) => {
            console.error("SSE connection error:", error);
            useNotificationStore.getState().addNotification(
                "サーバーとの接続に失敗しました。リアルタイム通知が使えません。",
                "error"
            );
        };

        // イベントリスナーの登録
        eventSource.addEventListener('notification', handleNotification);
        eventSource.onerror = handleError;

        // クリーンアップ処理
        return () => {
            eventSource.removeEventListener('notification', handleNotification);
            eventSource.onerror = null;
            eventSource.close();
        };
    }, []);
};