import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  isAuthenticated: boolean = false;
  isLoggedIn: boolean = false;
  private loginUrl = 'https://www.dukesdenmark.dk/wp-json/jwt-auth/v1/token';

  constructor(
    private http: HttpClient,
    ) {
  }

  login(username, password) {
    let credentials = {
      'username': username,
      'password': password
    };

    return new Promise( (resolve, reject) => {
      this.http.post(this.loginUrl, credentials).subscribe( res => {
        this.isLoggedIn = true;

        resolve(res);
      }, (err) => {
        reject(err);
      })
    })
  }


}
