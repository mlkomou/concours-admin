import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MyResponse} from "../model/myResponse";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostulationService {
apiUrl: string = environment.apiUrl + "postulations/"
  constructor(private http: HttpClient) { }

  getPostulationsByConcours(concoursId: number, page: number, size: number): Observable<MyResponse> {
      let form: FormData = new FormData();
      form.append("page", page.toString());
      form.append("size", size.toString());
      form.append("concoursId", concoursId.toString());
    return this.http.post<MyResponse>(this.apiUrl + "concours-postulations", form);
  }
}
