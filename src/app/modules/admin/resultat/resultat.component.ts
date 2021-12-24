import { Component, OnInit } from '@angular/core';
import {ResultatService} from "../services/resultat.service";
import {Resultst} from "../model/resultst";
import {ConcoursService} from "../services/concours.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.scss']
})
export class ResultatComponent implements OnInit {
    displayedColumns: string[] = ['photo', 'name', 'concours', 'visibily', 'action'];
    resultats: Resultst[] = [];
    size: number = 0;
    totalElements: number = 0;
  constructor(private resultatService: ResultatService,
              private concoursService: ConcoursService,
              private tostService: ToastrService) { }

  ngOnInit(): void {
      this.getResultats(0, 2);
  }
    makeImageUrl(path: string) {
        return this.concoursService.makeDownloadUrl(path);
    }

  getResultats(page: number, size: number) {
      this.resultatService.getResults(page, size).subscribe((res) => {
          console.log("results", res);
          if (res.code == 100) {
              this.resultats = res.response.content;
              console.log('ressss', this.resultats);
              this.totalElements = res.response.totalElements;
              this.size = res.response.size;
          }
      });
  }

    updateVisibility(vis, id) {
        this.resultatService.getChangeVisibility(vis, id).subscribe((res) => {
            console.log("res update", res);
            if (res.code == 100) {

                if (localStorage.getItem("paginationResultHistorique")) {
                    let event = JSON.parse(localStorage.getItem("paginationResultHistorique"));
                    this.getResultats(event.pageIndex, event.pageSize);
                } else {
                    this.getResultats(0, 2);
                }
                this.tostService.success(res.message);
            } else {
                this.tostService.warning(res.message);
            }
        }, (error => {
            this.tostService.error("Modification échouée !");
        }));
    }
    toggle(event, id: number) {
        console.log(event.checked, id);
        this.updateVisibility(event.checked, id);
    }

    getPage(event) {
        console.log(event);
        localStorage.setItem("paginationResultHistorique", JSON.stringify(event));
        // pageIndex: 1
        // pageSize: 2
        this.getResultats(event.pageIndex, event.pageSize);
    }
}
