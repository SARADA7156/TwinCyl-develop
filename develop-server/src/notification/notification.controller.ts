import { Controller, MessageEvent, Req, Sse } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { type Request } from 'express';
import { LoggerService } from '@/logger/logger.service';

@Controller('notification')
export class NotificationController {
    constructor(
        private readonly notificatonService: NotificationService,
        private readonly logger: LoggerService
    ) {}

    @Sse("stream")
    stream(@Req() req: Request): Observable<MessageEvent> {
        const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
        const userAgent = req.headers['user-agent'] || 'unknown';

        this.logger.log(`クライアントが接続されました ip: ${ip}, user-agent: ${userAgent}`)
        return this.notificatonService.getStream();
    }
}
