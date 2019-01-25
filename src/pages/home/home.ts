import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, ToastController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoLibrary, LibraryItem } from '@ionic-native/photo-library';
import { PermissionsPage } from '../permissions/permissions';
import { ItemDetailsPage } from '../item-details/item-details';

const THUMBNAIL_WIDTH = 512;
const THUMBNAIL_HEIGHT = 384;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  //selector: 'app',
  template: '<img [src]="url | cdvphotolibrary">'
})
export class HomePage {
  public url: string = 'placeholder.jpg';
  myphoto: any;
  thumbnailWidth = THUMBNAIL_WIDTH + 'px';
  thumbnailHeight = THUMBNAIL_HEIGHT + 'px';
  library: LibraryItem[];

  constructor(public navCtrl: NavController, private camera: Camera, private photoLibrary: PhotoLibrary, private platform: Platform, private cd: ChangeDetectorRef,
    private toastCtrl: ToastController, private modalCtrl: ModalController) {
    this.library = [];
    //this.url = libraryItem.thumbnailURL;    Esto da error
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  cropImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    }

    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  fetchPhotos() {
    this.platform.ready().then(() => {
      this.library = [];
      this.photoLibrary.getLibrary({ thumbnailWidth: THUMBNAIL_WIDTH, thumbnailHeight: THUMBNAIL_HEIGHT}).subscribe({
        next: (chunk) => {
          this.library = this.library.concat(chunk);
          console.log(this.library);
          this.cd.detectChanges();
        },
        error: (err: string) => {
          if (err.startsWith('Permission')) {
            let permissionsModal = this.modalCtrl.create(PermissionsPage);
            permissionsModal.onDidDismiss(() => {
              this.fetchPhotos();
            });
            permissionsModal.present();
          } else {
            let toast = this.toastCtrl.create({
              message: `getLibrary error: ${err}`,
              duration: 6000,
            });
            toast.present();
          }
        },
        complete: () => { }
      });
    });
  }

  itemTapped(event, libraryItem) {
    this.navCtrl.push(ItemDetailsPage, {
      libraryItem: libraryItem
    });
  }

  trackById(index: number, libraryItem: LibraryItem): string {
    return libraryItem.id;
  }

}
