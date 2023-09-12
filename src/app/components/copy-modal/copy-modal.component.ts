import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { Toast } from '@capacitor/toast';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-copy-modal',
  templateUrl: './copy-modal.component.html',
  styleUrls: ['./copy-modal.component.scss'],
})
export class CopyModalComponent  implements OnInit {
  @Input() text:string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async copyText(text:any){
    await Clipboard.write({
      string: text
    });
    await this.showToast();
    await this.modalCtrl.dismiss();
  }

  async showToast(){
    await Toast.show({
      text: 'Texto Copiado!',
    });
  };
}
