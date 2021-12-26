import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Postulation} from "../../../model/postulation";
import {DocumentService} from "../../../services/document.service";
import {PostulationDoc} from "../../../model/postulationDoc";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-validation-dossier',
  templateUrl: './validation-dossier.component.html',
  styleUrls: ['./validation-dossier.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    animations     : fuseAnimations
})
export class ValidationDossierComponent implements OnInit {

    postulation: Postulation = new Postulation();
    docs: PostulationDoc[] = [];
    displayedColumns: string[] = ['name', 'accepted', 'type', 'action'];
    resultatName: any;
    selectedDoc: any;


    constructor(private route: ActivatedRoute,
              private docsService: DocumentService,
                private toast: ToastrService
                ) { }

  ngOnInit(): void {
      this.getRoutingData();
  }
    makeDownloadUrl(path: string) {
        return this.docsService.makeDownloadUrl(path);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

  getRoutingData() {
      this.route.queryParams.subscribe((query) => {
          this.postulation = JSON.parse(query.postulation);
          console.log(this.postulation);
          if (this.postulation) {
              this.getDocs(this.postulation.id, this.postulation.concours.id, this.postulation.postulant.id);
          }
      });
  }

  getDocs(postulaionId: number ,concoursId: number, postulantId: number) {
      this.docsService.getDocsByConcoursAndPostulant(postulaionId, concoursId, postulantId).subscribe((res) => {
          console.log(res);
          if (res.code == 100) {
              this.docs = res.response;
          }
      });
  }

    getCheckValue(event, element) {
        this.docsService.changeState(element.id, event.checked).subscribe((res) => {
            console.log("change state", res);
            if (res.code == 100) {
                const index = this.docs.findIndex(doc => {
                    return doc.id == element.id;
                });
                if (index != -1) {
                    this.docs[index].accepted = event.checked;
                    this.toast.success(res.message);
                }
            } else {
                this.toast.error(res.message);
                this.getRoutingData();
            }
        }, (error => {
            this.toast.error("Erreur de modification !");
            this.getRoutingData();
        }));
    }


    checkPostulantChecked(element) {
        const index = this.docs.findIndex(doc => {
            return doc.id == element.id;
        });
        return (index != -1) && (this.docs[index].accepted == true);
    };

    toggleDetails(element) {
        if (this.selectedDoc && this.selectedDoc.id == element.id) {
            this.selectedDoc = null;
        } else {
            this.selectedDoc = element;
        }
    }
}
