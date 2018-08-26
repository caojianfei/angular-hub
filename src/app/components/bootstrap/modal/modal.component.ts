import { Component, OnInit, Input, EventEmitter, Output, OnChanges, AfterViewInit } from '@angular/core';

@Component({
    selector: 'bootstrap-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {

    constructor() { }

    @Input() options: { [key: string]: any };

    @Input() title: string = "Modal Title";

    @Output() onModalShow = new EventEmitter<any>();

    @Output() onModalShown = new EventEmitter<any>();

    @Output() onModalHide = new EventEmitter<any>();

    @Output() onModalHidden = new EventEmitter<any>();

    @Output() confirmed = new EventEmitter<any>();

    instance: any;

    changeVisibel = new EventEmitter<boolean>();

    private _visibel: boolean;

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
    }

    ngAfterViewInit() {
        this.instance = $('#bootstrapModal');
        this._visibel ? this.show() : this.hide();
        this.registerEvent();
    }

    @Output()
    visibelChange = new EventEmitter<boolean>();

    @Input()
    set visibel(value: boolean) {
        this._visibel = value;
        this.visibelChange.emit(value);

        if (this.instance) {
            this._visibel ? this.show() : this.hide();
        }
    }

    get visibel() {
        return this._visibel;
    }

    show() {
        this.instance.modal({
            backdrop: 'static',
            keyboard: false
        })
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
        //console.log(this.config)
    }

    private registerEvent() {
        this.instance.on('show.bs.modal', (e) => {

            this.onModalShow.emit(e);
        })

        this.instance.on('shown.bs.modal', (e) => {
            this.visibel = true;
            //console.log('modal shown');
            //console.log(this.visibel)
            this.onModalShown.emit(e);
        })

        this.instance.on('hide.bs.modal', (e) => {
            this.onModalHide.emit(e);
        })

        this.instance.on('hidden.bs.modal', (e) => {
            this.visibel = false;
            //console.log('modal hidden')
            //console.log(this.visibel)
            this.onModalHidden.emit(e);
        })
    }

    public confirm(event) {
        this.confirmed.emit(event);
    }

}
