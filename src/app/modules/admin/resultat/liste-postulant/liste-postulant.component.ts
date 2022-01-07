import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Resultst} from "../../model/resultst";
import {Postulation} from "../../model/postulation";
import {ResultatService} from "../../services/resultat.service";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";
import {ExcelService} from "../../services/excel.service";

@Component({
  selector: 'app-liste-postulant',
  templateUrl: './liste-postulant.component.html',
  styleUrls: ['./liste-postulant.component.scss']
})
export class ListePostulantComponent implements OnInit {
    resultat: Resultst;


    resultats: any[] = [];
    admisArr: number[] = [];
    page: number = 0;
    size: number = 15;
    totalElements: number = 0;
    searchTerm: string;
    isPublish: boolean = false;
    jsonToExport: any[] = [];

    displayedColumns: string[] = ['prenom', 'nom', 'telephone'];

    constructor(private route: ActivatedRoute,
                private resultatService: ResultatService,
                private toastr: ToastrService,
                private location: Location,
                private excelService: ExcelService
    ) { }

    ngOnInit(): void {
        this.getRoutingData();

    }

    exportAsXLSX():void {
        // this.resultatService.exportToExcel(this.resultat.id).subscribe((res) => {
        //     console.log(res);
        // })
        this.resultats.forEach(value => {
            this.jsonToExport.push({
                prenom: value.postulant.prenom,
                nom: value.postulant.nom,
                telephone: value.postulant.telephone,
                situation: 'admis(e)'
            });
        });
        this.excelService.exportAsExcelFile(this.jsonToExport, this.resultat.name);
    }

    getRoutingData() {
        this.route.queryParams.subscribe((query) => {
            this.resultat = JSON.parse(query.resultat);
           if (this.resultat) {
               this.getPostulant(0, 50, this.resultat.id);
           }
            console.log("resultat", this.resultat);
        });
    }

    getPostulant(page: number, size: number, resultatId: number) {
        this.resultatService.getPostulantByResultat(page, size, resultatId).subscribe((res) => {

            if (res.code == 100) {
                this.resultats = res.response.content;
                this.totalElements = res.response.totalElements;
                console.log("resultats", this.resultats);
            }
        });
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
        // this.getPostulations(event.pageIndex, event.pageSize, this.concours.id);
    }
}
