import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ImportImageService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

    public promptForPhoto(): Promise<File> {
        return new Promise<File>((resolve, reject) => {
            const fileInput: HTMLInputElement = this.document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.multiple = true;
            fileInput.addEventListener('error', event => {
                reject(event.error);
            });
            fileInput.addEventListener('change', event => {
                resolve(fileInput.files[0]);
            });
            fileInput.click();
        });
    }
}
