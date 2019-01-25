import { CDVPhotoLibraryPipe } from './cdvphotolibrary.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { PermissionsPage } from '../pages/permissions/permissions';
import { ItemDetailsPage } from '../pages/item-details/item-details';

@NgModule({
  declarations: [
    MyApp,
    HomePage,PermissionsPage,
    ItemDetailsPage,CDVPhotoLibraryPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,PermissionsPage,
    ItemDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,Camera, PhotoLibrary,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
