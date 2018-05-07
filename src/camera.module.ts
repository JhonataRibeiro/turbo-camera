import { Observable } from 'rxjs';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MyComponent } from './components/my-component';
import { ModalChooseComponent } from './components/modal-choose';
import { CameraComponent } from './components/camera';
import { IonicModule } from 'ionic-angular';
import { ModalCameraWebComponent } from './components/modal-camera-web';

@NgModule({
  declarations: [
    MyComponent,
    ModalChooseComponent,
    CameraComponent,
    ModalCameraWebComponent
  ],
  imports: [
    BrowserModule,
    IonicModule
  ],
  entryComponents: [
    MyComponent,
    ModalChooseComponent,
    CameraComponent,
    ModalCameraWebComponent
  ],
  providers: [],
  exports: [
    MyComponent,
    ModalChooseComponent,
    CameraComponent,
    ModalCameraWebComponent

  ],
 
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CameraModule { }
