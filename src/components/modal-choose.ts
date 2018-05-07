import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ViewController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ModalChooseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-choose',
  template: `
  <ion-card class='modal-anexo'>

  <ion-card-content>
    
      <ion-grid>
          <ion-row class='anexar-modal-exames'>
              
              <ion-col (click)="uploadCamera()" col-6 class='anexar-modal-icons'>
                  <h3>tirar foto</h3>
                  <p><small>Use a câmera para tirar uma foto</small></p>
                  <br>
                  <ion-label text-center>
                      <ion-icon name="camera"></ion-icon>
                  </ion-label>
              </ion-col>
              
              <ion-col (click)="uploadGaleria()" col-6 class='anexar-modal-icons'>
                  <h3> escolher imagem</h3>
                  <p><small>Selecione uma Imagem</small></p>
                  <ion-label text-center>
                      <ion-icon name="folder"></ion-icon>
                       <!--<input id="my-file-selector" type="file" class='input-file'>-->
                  </ion-label>
              </ion-col>
              
          </ion-row>
      </ion-grid>
      
  </ion-card-content>

</ion-card>
`
})
export class ModalChooseComponent {

  text: string;

  constructor(
    private camera: Camera,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
  ) {
    console.log('Hello ModalChooseComponent Component');
    this.text = 'Hello World';
  }

  uploadCamera() {
    this.camera.getPicture(
      {
        quality: 40,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: 1,
        mediaType: this.camera.MediaType.PICTURE
      }
    ).then((imageData) => {
      console.log("uploadCamera function...");
      let image = 'data:image/jpeg;base64,' + imageData;
      this.viewCtrl.dismiss({ "imagem": imageData });
    }, (err) => {
      console.log("error: ", err);
      this.presentToast("Erro ao adicionar foto");
    });
  }

  uploadGaleria() {
    this.camera.getPicture(
      {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: 2,
        targetWidth: 1200,
        targetHeight: 1200

      }
    ).then((imageData) => {
      //            this.loader.show();
      let image = 'data:image/jpeg;base64,' + imageData;
      this.viewCtrl.dismiss({ "imagem": imageData });
    }, (err) => {
      console.log("error: ", err);
      this.presentToast("Erro ao adicionar foto");
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
