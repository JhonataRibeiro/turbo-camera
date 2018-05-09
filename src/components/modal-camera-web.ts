
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    template: `
    <ion-content class="resize-modal">
    <div class="overlay-video"><img src="assets/images/logos/layer-photo.png"></div>
    <video autoplay width="260" height="195"  #videoPlayer ></video>
    <canvas id="imgTaked" width="260" height="195" hidden></canvas>
    <button full ion-button  color="padrao" (click)="takePhoto()">
        <ion-icon md="md-camera"></ion-icon> &nbsp; <small>Capturar imagem</small>
    </button>

    <label style='margin-left: 5px;' for="file-upload" class="custom-file-upload">
        <ion-icon md="md-cloud-upload"></ion-icon> &nbsp; <small translate>Adicionar nova imagem</small>
    </label>
    <input id="file-upload" accept="image/x-png,image/jpeg" type="file" (change)="changeListener($event)">
</ion-content>`,
    styles: [' width: 510px !important; height: 630px !important; background: #ccc; button: margin-top:-20px !important;']
})

export class ModalCameraWebComponent {
    public streaming: any;
    constructor(private viewCtrl: ViewController, ) {
        navigator.mediaDevices.enumerateDevices().then(this.getDevices);
        // this.startVideo(false);
    }

    public startVideo(dvcId) {
        let constraints = { audio: false, video: { deviceId: dvcId ? { exact: dvcId } : undefined } };
        navigator.mediaDevices.getUserMedia(constraints).then(this.gotStream);

    }

    public gotStream(stream) {
        (<any>window).stream = stream;
        let video = document.querySelector("video");
        video.srcObject = stream;
    }

    takePhoto() {
        let thatImage = "";
        let canvas = document.querySelector("canvas");
        let videoGet = document.querySelector("video");
        canvas.width = videoGet.width;
        canvas.height = videoGet.height;
        canvas.getContext('2d').drawImage(videoGet, 0, 0, canvas.width, canvas.height);
        let img = canvas.toDataURL();
        this.setImage(img);

    }

    public getDevices(devices) {
        let options = [];
        devices.forEach(function (dvcInfo) {
            if (dvcInfo.kind === "videoinput") {
                options.push(dvcInfo);
            }
        });
        return options;
    }

    public setImage(image) {
        let thatImage = "";
        if (image.indexOf('image/png') != -1) {
            thatImage = image.replace("data:image/png;base64,", "");
        } else if (image.indexOf('image/jpeg') != -1) {
            thatImage = image.replace("data:image/jpeg;base64,", "");
        } else {
            thatImage = image.replace("data:image/jpg;base64,", "");
        }

        this.viewCtrl.dismiss({ "imagem": thatImage });
        this.stopVideo();
    }

    public stopVideo() {
        if ((<any>window).stream) {
            (<any>window).stream.getTracks().forEach(function (track) {
                track.stop();
            });
        }
    }

    changeListener($event) {
        let file = $event.target.files[0];
        let myReader = new FileReader();

        myReader.onloadend = () => {
            this.setImage(myReader.result);
        }
        myReader.readAsDataURL(file);
    }

}