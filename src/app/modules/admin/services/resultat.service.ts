import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ResultatPostulant} from "../model/resultatPostulant";
import {Observable} from "rxjs";
import {MyResponse} from "../model/myResponse";

@Injectable({
  providedIn: 'root'
})
export class ResultatService {

    apiUrl = environment.apiUrl + "resultats/";
  constructor(private http: HttpClient) { }

    publishResult(resultatPostulant: ResultatPostulant): Observable<MyResponse> {
      return this.http.post<MyResponse>(this.apiUrl + "save", resultatPostulant);
    }
    getResults(page: number, size: number): Observable<MyResponse> {
      let form: FormData = new FormData();
      form.append('page', page.toString());
      form.append('size', size.toString());
      return this.http.post<MyResponse>(this.apiUrl + "liste", form);
    }

    getChangeVisibility(visibility: boolean, id: number): Observable<MyResponse> {
        let form: FormData = new FormData();
        form.append('visibility', visibility.toString());
        form.append('id', id.toString());
        return this.http.post<MyResponse>(this.apiUrl + "change-visibiliy", form);
    }

    getPostulantByResultat(page: number, size: number, resultatId: number): Observable<MyResponse> {
        let form: FormData = new FormData();
        form.append('page', page.toString());
        form.append('size', size.toString());
        form.append('resultatId', resultatId.toString());
        return this.http.post<MyResponse>(this.apiUrl + "liste-by-resultat", form);
    }

    exportToExcel(resultatId: number): Observable<MyResponse> {
        let form: FormData = new FormData();
        form.append('resultatId', resultatId.toString());
        return this.http.post<MyResponse>(this.apiUrl + "export-excel", form);
    }

}
