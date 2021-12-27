import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {Concours} from "../../model/concours";
import {PostulationService} from "../../services/postulation.service";
import {Postulation} from "../../model/postulation";
import {ResultatPostulant} from "../../model/resultatPostulant";
import {ResultatService} from "../../services/resultat.service";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";

@Component({
  selector: 'app-publish-result',
  templateUrl: './publish-result.component.html',
  styleUrls: ['./publish-result.component.scss']
})
export class PublishResultComponent implements OnInit {
    concours: Concours = new Concours();
    postulations: Postulation[] = [];
    admisArr: number[] = [];
    page: number = 0;
    size: number = 15;
    totalElements: number = 0;
    resultatPostulant: ResultatPostulant = new ResultatPostulant();
    resultatName: string;
    isPublish: boolean = false;
    element: string;

    displayedColumns: string[] = ['prenom', 'nom', 'telephone', 'action'];

  constructor(private route: ActivatedRoute,
              private postulationService: PostulationService,
              private resultatService: ResultatService,
              private toastr: ToastrService,
              private location: Location,
              private router: Router
              ) { }

    getDataByRouting() {
      this.route.queryParams.subscribe((query) => {
          this.concours = JSON.parse(query.concours);
          if (this.concours) {
              this.element = query.element;
              console.log("element", this.element);
              this.getPostulations(0, 15, this.concours.id);
          }
      });
    }

    getPostulations(page: number, size: number, concoursId: number) {
      this.postulationService.getPostulationsByConcours(concoursId, page, size).subscribe((res) => {
          if (res.code == 100) {
              this.postulations = res.response.content;
              this.totalElements = res.response.totalElements;
              console.log("postulations", this.postulations);
          }
      });
    }

  ngOnInit(): void {
      this.getDataByRouting();
  }

    getCheckValue(event, postulation: Postulation) {
        console.log(event, postulation);
        const index = this.admisArr.findIndex(postulantId => {
            return postulation.postulant.id == postulantId
        });
        if (index == -1) {
            this.admisArr.push(postulation.postulant.id);
            console.log('admisArr', this.admisArr);
        } else {
            this.admisArr.splice(index, 1);
            console.log('admisArr', this.admisArr);
        }
    }

    checkPostulantChecked(postulation: Postulation): boolean {
        const index = this.admisArr.findIndex(postulantId => {
            return postulation.postulant.id == postulantId
        });
        return index != -1;
    }

    getPaginationValue(event) {
        this.getPostulations(event.pageIndex, event.pageSize, this.concours.id);
    }

    publishResult() {
      this.isPublish = true;
        this.resultatPostulant.postulantIds = this.admisArr;
        this.resultatPostulant.concoursId = this.concours.id;
        this.resultatPostulant.resultatName = this.resultatName;
        console.log("result", this.resultatPostulant);
        this.resultatService.publishResult(this.resultatPostulant).subscribe((res) => {
            console.log("result response", res);
            if (res.code == 100) {
                this.isPublish = false;
                this.toastr.success(res.message, 'Résultat publié');
                this.location.back();
            } else {
                this.isPublish = false;
                this.toastr.success(res.message, 'Publication échouée !');
            }
        }, (error => {
            this.isPublish = false;
            this.toastr.success("Ce résultat n'est pas pulié !", 'Publication échouée !');
        }));
    }

    goToValidation(postulation) {
      let nav: NavigationExtras = {
          queryParams: {
              postulation: JSON.stringify(postulation)
          }
      }
      this.router.navigate(['concours/validation-dossier'], nav);
    }
}
