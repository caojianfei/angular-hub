import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';

@Injectable({
    providedIn: 'root'
})
export class GrowlMessageService {

    constructor(private message: MessageService) { }

    success(msg: string, summary: string = '成功') {
        this.show('success', summary, msg);
    }

    info(msg: string, summary: string = '提示') {
        this.show('info', summary, msg)
    }

    warn(msg: string, summary: string = '提醒') {
        this.show('warn', summary, msg);
    }

    error(msg: string, summary: string = '出错啦') {
        this.show('error', summary, msg);
    }

    clear() {
        this.message.clear();
    }

    show(severity: string, summary: string, detail: string) {
        this.clear();
        this.message.add({ severity: severity, summary: summary, detail: detail  });
    }



}
