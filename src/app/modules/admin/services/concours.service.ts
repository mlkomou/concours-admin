import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Concours} from "../model/concours";
import {MyResponse} from "../model/myResponse";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConcoursService {
apiUrl: string = environment.apiUrl + 'concours/';
    httpOptions: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient,
              private _router: Router) { }

    saveConcours(concours: Concours, photo: any, documentNames: string[]): Observable<MyResponse> {
      let form: FormData = new FormData();
      form.append('concours', JSON.stringify(concours));
      form.append('photo', photo);
      form.append('documentNames', JSON.stringify(documentNames));
      return this.http.post<MyResponse>(this.apiUrl + "save", form);
    }
    getConcoursByPage(page: number, size: number): Observable<MyResponse> {
      let form: FormData = new FormData();
      form.append("page", page.toString());
      form.append("size", size.toString());
      return this.http.post<MyResponse>(this.apiUrl + "liste-pagination", form);
    }
    makeDownloadUrl(path: string): string {
      return this.apiUrl + "download/" + path;
    }
    signOut(): void
    {
        this._router.navigate(['/sign-out']);
    }
}
