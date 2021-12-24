import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserPostulant} from "../model/userPostulant";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
apiUrl: string = environment.apiUrl;
    private _authenticated: boolean;
  constructor(private http: HttpClient) { }

    signIn(user: UserPostulant): Observable<any> {
      return this.http.post(this.apiUrl + "users/login", user);
    }
    signout() {
        {
            // Remove the access token from the local storage
            localStorage.removeItem('accessToken');

            // Set the authenticated flag to false
            this._authenticated = false;

            // Return the observable
            return of(true);
        }
    }
}
