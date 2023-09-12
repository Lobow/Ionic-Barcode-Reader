import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ScreenOrientation }  from '@capacitor/screen-orientation'
import { ModalController } from '@ionic/angular';
import { CopyModalComponent } from 'src/app/components/copy-modal/copy-modal.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public showRedLine = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;

    // Can be set to the src of an image now
    console.log(imageUrl);
  };


  async startScan(){
    try{
      await ScreenOrientation.lock({ orientation:  "landscape-primary" });
      this.showRedLine = true;
      // Check camera permission
      // This is just a simple example, check out the better checks below
      await BarcodeScanner.checkPermission({ force: true });

      // make background of WebView transparent
      // note: if you are using ionic this might not be enough, check below
     await BarcodeScanner.hideBackground();
     const body = document.getElementsByTagName('body')[0];
     body.classList.add('scanner-active');

      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      console.log('teste',result)
      if (result.hasContent) {
        console.log(result.content); // log the raw scanned content
      }
      this.openCopyModal(result.content);

    }catch(e){
      console.log(e)
    }finally{
      this.showRedLine = false;
      await ScreenOrientation.unlock();
    }

  }


 async openCopyModal(text:any){
    const modal = await this.modalCtrl.create({
      component: CopyModalComponent,
      cssClass: 'modal-size',
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        text: text,
      },
    });
    return await modal.present();
  }

}
