import { Injectable, MessageEvent } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

export interface NotificationItem {
    level: "info" | "warn" | "error";
    message: string;
}

@Injectable()
export class NotificationService {
    private readonly subject = new Subject<MessageEvent>();

    getStream(): Observable<MessageEvent> {
        return this.subject.asObservable();
    }

    send(data: NotificationItem) {
        const date = new Date();

        this.subject.next({
            type: "notification",
            data: { date, ...data },
        });
    }
}
