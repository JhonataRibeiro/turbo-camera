import { Observable } from 'rxjs';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ModalChooseComponent } from './components/modal-choose';
import { CameraComponent } from './components/camera';
import { IonicModule } from 'ionic-angular';
import { ModalCameraWebComponent } from './components/modal-camera-web';

@NgModule({
  declarations: [
    ModalChooseComponent,
    CameraComponent,
    ModalCameraWebComponent
  ],
  imports: [
    BrowserModule,
    IonicModule
  ],
  entryComponents: [
    ModalChooseComponent,
    CameraComponent,
    ModalCameraWebComponent
  ],
  providers: [],
  exports: [
    ModalChooseComponent,
    CameraComponent,
    ModalCameraWebComponent

  ],
 
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CameraModule { }
