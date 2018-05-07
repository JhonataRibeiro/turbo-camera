import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController, Platform } from 'ionic-angular';
import { ModalChooseComponent } from './modal-choose';
import { ModalCameraWebComponent } from './modal-camera-web';

/**
 * Generated class for the CameraComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'camera',
  providers: [ModalCameraWebComponent],
  template: `
  <img src="assets/images/logos/icon.png" alt="" (click)="presentCadastroModal($event)" *ngIf="icon == 'foto'">

  <button ion-button color="padrao" outline clear  class="up-legenda" *ngIf="icon == 'upload' " style="color:#747474 !important; " (click)="presentCadastroModal($event)">
    <ion-icon name='attach'></ion-icon>
    Adicionar Autorização
  </button>

  <button ion-button color='padrao' small *ngIf="icon == 'botaoUpload' "  (click)="presentCadastroModal($event)" >
    <ion-icon name="camera"></ion-icon> &nbsp; &nbsp;  upload
  </button>
`
})
export class CameraComponent {

  @Input() icon: string;
  @Input() typeButton: string;
  @Output() imageUploaded = new EventEmitter();

  constructor(
    public modalCtrl: ModalController,
    public platform: Platform,
    public modaCameraWeb: ModalCameraWebComponent) { }

  presentCadastroModal(event) {
    let self = this;
    event.preventDefault();
    if (this.platform.is('android')) {
      let modal = this.modalCtrl.create(ModalChooseComponent);
      modal.present();
      modal.onDidDismiss(imagem => {
        if (imagem) {
          this.imageUploaded.emit(imagem);
        }
      });
    } else {
      let modalCam = this.modalCtrl.create(ModalCameraWebComponent);
      modalCam.present().then(function () {
        self.modaCameraWeb.startVideo(false);
      });
      modalCam.onDidDismiss(imagem => {
        self.modaCameraWeb.stopVideo();
        if (imagem) {
          this.imageUploaded.emit(imagem);
        }
      });
    }
  }

}
