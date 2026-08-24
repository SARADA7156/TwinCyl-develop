'use client';

import { useEffect, useState } from "react";
import { NotificationItem, useNotificationStore } from "./useNotificationStore";

type NotificationEvent = {
    date: Date;
    message: NotificationItem["message"];
    level: NotificationItem["level"];
}

const MAX_RETRIES = 3;

export const useNotificationSSE = () => {
    let errCount = 0;

    useEffect(() => {
        const eventSource = new EventSource(
            `${process.env.NEXT_PUBLIC_API_URL}/notification/stream`,
        );

        const handleNotification = (event: MessageEvent) => {
            try {
                const notification: NotificationEvent = JSON.parse(event.data);

                useNotificationStore.getState().addNotification(
                    notification.message,
                    notification.level,
                    false,
                );
                errCount = 0;
            } catch (error) {
                useNotificationStore.getState().addNotification(
                    "通知の解析に失敗しました",
                    "error"
                );
                console.error("JSON parse error:", error);
            }
        };

        const handleError = (error: Event) => {
            console.warn(`SSE connection error (${errCount}/${MAX_RETRIES})`);
            errCount++;

            if (errCount >= MAX_RETRIES) {
                console.error("SSE connection error:", error);
                useNotificationStore.getState().addNotification(
                    "サーバーとの接続に失敗しました。",
                    "error"
                );
                eventSource.close();
            }
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