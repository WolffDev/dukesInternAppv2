import { StorageServiceProvider } from './../storage-service/storage-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthServiceProvider {

  public authChanged = new Subject<boolean>();
  public authenticated: boolean = false;
  private user;
  private token;
  private loginUrl = 'https://www.dukesdenmark.dk/wp-json/jwt-auth/v1/token';

  constructor(
    private http: HttpClient,
    private storageService: StorageServiceProvider
  ) {
    
  }

  login(username, password) {
    let credentials = {
      'username': username,
      'password': password
    };

    return new Promise( (resolve, reject) => {
      this.http.post(this.loginUrl, credentials).subscribe( res => {
        this.authenticated = true;
        this.authChanged.next(this.authenticated);
        resolve(res);
      }, (err) => {
        reject(err);
      })
    })
  }

  public setToken(token) {
    this.token = token;
  }

  public setUser(user) {
    this.user = user;
  }

  public logout() {
    this.storageService.clearStorage();
    this.authenticated = false;
    this.authChanged.next(this.authenticated);
  }

  public async checkAuth() {
    this.token = await this.storageService.getToken();
    if(this.token !== '') {
      this.user = await this.storageService.getUserData();
      this.authenticated = true;
      this.authChanged.next(this.authenticated);
    } else {
      this.authenticated = false;
      this.authChanged.next(this.authenticated);
    }
  }

  public getToken() {
    return this.token;
  }

  public getUser() {
    return this.user;
  }


}
