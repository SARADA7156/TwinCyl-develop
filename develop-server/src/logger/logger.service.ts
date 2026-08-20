import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
    constructor(@Inject(INQUIRER) private readonly inquirer: object) {
        super();

        // 注入先（呼び出し元）のクラス名を取得し、Loggerのコンテキストとして設定
        const context = this.inquirer?.constructor?.name || 'App';
        this.context = context;
    }
}
