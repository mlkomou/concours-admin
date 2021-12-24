import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {ImportImageService} from "../../services/import-image.service";
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {Concours} from "../../model/concours";
import {ConcoursService} from "../../services/concours.service";
import {FuseAlertType} from "../../../../../@fuse/components/alert";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-concours',
  templateUrl: './add-concours.component.html',
  styleUrls: ['./add-concours.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AddConcoursComponent implements OnInit {

    imageFile: any = '';
    imageFileToSave: any = '';
    croppedImage: any = '';
    dossiers: string[] = [];
    dossier: string;
    saving: boolean = false;
    concours: Concours = new Concours();

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    showAlert: boolean = false;

  constructor(private importPhoto: ImportImageService,
              private concoursService: ConcoursService,
              public dialogRef: MatDialogRef<AddConcoursComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Concours,) { }

  ngOnInit(): void {
  }

  ckeckDossier() {
      this.dossiers.push(this.dossier);
      setTimeout(() => {
          this.dossier = null;
      }, 200);
  }
  removeDossier(index: number) {
      this.dossiers.splice(index, 1);
  }

  getPhoto() {
      this.importPhoto.promptForPhoto().then((img) => {
          // console.log("photo", img);
          this.imageFile = img;
      });
  }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;

        const blob = this.dataURLtoBlob(event.base64);
        // console.log("blob", blob);
        this.imageFileToSave = new File([blob], "image.jpeg", {
            type: blob.type,
        });
        // console.log("imageFileToSave", this.imageFileToSave);
    }
    dataURLtoBlob(dataURL) {
        let binary = atob(dataURL.split(',')[1]);
        let array = [];
        for (var index = 0; index < binary.length; index++) {
            array.push(binary.charCodeAt(index));
        }
        return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
    }

    saveConcours() {
        // console.log(this.concours, this.imageFileToSave, this.dossiers);
        this.saving = true;
        this.showAlert = false;
        this.concoursService.saveConcours(this.concours, this.imageFileToSave, this.dossiers).subscribe((res) => {
            console.log("response", res);
            if (res.code == 100) {
                this.saving = false;
                this.showAlert = true;
                this.alert = {
                    type   : 'success',
                    message: res.message
                };
                this.dialogRef.close();
            } else {
                this.saving = false;
                this.showAlert = true;
                this.alert = {
                    type   : 'error',
                    message: "Enregistrement du cours échoué. Veuillez réessayer plus tard !"
                };
            }

        }, (err) => {
            this.saving = false;
            this.showAlert = true;
            this.alert = {
                type   : 'error',
                message: "Enregistrement du cours échoué. Veuillez réessayer plus tard !"
            };
        });
    }

    imageLoaded(image: LoadedImage) {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

}
