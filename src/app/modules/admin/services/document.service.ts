import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MyResponse} from "../model/myResponse";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

    apiUrl: string = environment.apiUrl + "postulation-doc/"
    constructor(private http: HttpClient) { }

    getDocsByConcoursAndPostulant(postulationId: number, concoursId: number, postulantId: number): Observable<MyResponse> {
        let form: FormData = new FormData();
        form.append("postulationId", postulationId.toString());
        form.append("concoursId", concoursId.toString());
        form.append("postulantId", postulantId.toString());
        return this.http.post<MyResponse>(this.apiUrl + "by-postulant-concours", form);
    }

    changeState(docId: number, accepted: string, postulationId: number): Observable<MyResponse> {
        let form: FormData = new FormData();
        form.append("docId", docId.toString());
        form.append("accepted", accepted);
        form.append("postulationId", postulationId.toString());
        return this.http.post<MyResponse>(this.apiUrl + "chane-state", form);
    }

    makeDownloadUrl(path: string): string {
        return this.apiUrl + "download/" + path;
    }
}
