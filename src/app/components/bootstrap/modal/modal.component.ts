import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'bootstrap-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    constructor() { }

    @Input() options: { [key: string]: any };

    @Input() title: string = "Modal Title";

    @Output() onModalShow = new EventEmitter<any>();

    @Output() onModalShown = new EventEmitter<any>();

    @Output() onModalHide = new EventEmitter<any>();

    @Output() onModalHidden = new EventEmitter<any>();

    @Output() confirmed = new EventEmitter<any>();

    instance: any;

    modalSize: string = '';

    config: {
        animation: boolean;
        verticallyCentered: boolean;
        size: string;
        closeIcon: boolean;
        closeButtonText: string;
        confirmButtonText: string;
        closeButtonClass: string;
        confirmButtonClass: string;
    } = {
            animation: true,
            verticallyCentered: false,
            size: 'normal',
            closeIcon: true,
            closeButtonText: '取消',
            confirmButtonText: '确定',
            closeButtonClass: 'btn-secondary',
            confirmButtonClass: 'btn-primary'
        }

    ngOnInit() {
        this.initConfig();
        this.resolveSize();
        this.instance = $('#bootstrapModal');
        this.registerEvent();
    }

    show() {
        this.instance.modal({
            keyboard: false,
            backdrop: 'static',
            show: true
        });
    }

    hide() {
        this.instance.modal('hide');
    }

    toggle() {
        this.instance.modal('toggle');
    }

    handleUpdate() {
        this.instance.modal('handleUpdate');
    }

    private resolveSize() {
        switch (this.config.size) {
            case "large":
                this.modalSize = "modal-lg";
                break;
            case "small":
                this.modalSize = "modal-sm";
                break;
            case "normal":
            default:
                this.modalSize = "";
                break;
        }
    }

    private initConfig() {
        let options = this.options ? this.options : {};

        if (this.options.animation) {
            this.config.animation = this.options.animation;
        }

        if (this.options.verticallyCentered) {
            this.config.verticallyCentered = this.options.verticallyCentered;
        }

        if (this.options.size) {
            this.config.size = this.options.size;
        }

        if (this.options.closeIcon) {
            this.config.closeIcon = true;
        }

        if (this.options.closeButtonText) {
            this.config.closeButtonText = this.options.closeButtonText;
        }

        if (this.options.confirmButtonText) {
            this.config.confirmButtonText = this.options.confirmButtonText;
        }

        if (this.options.closeButtonClass) {
            this.config.closeButtonClass = this.options.closeButtonClass;
        }

        if (this.options.confirmButtonClass) {
            this.config.confirmButtonClass = this.options.confirmButtonClass;
        }
    }

    private registerEvent() {
        this.instance.on('show.bs.modal', (e) => {
            this.onModalShow.emit(e);
        })

        this.instance.on('shown.bs.modal', (e) => {
            this.onModalShown.emit(e);
        })

        this.instance.on('hide.bs.modal', (e) => {
            this.onModalHide.emit(e);
        })

        this.instance.on('hidden.bs.modal', (e) => {
            this.onModalHidden.emit(e);
        })
    }

    private confirm(event) {
        this.confirmed.emit(event);
    }

}
