import { RefreshTokenResponse } from './../../models/auth/refreshTokenResponse.interface';
import { LoginResponse } from './../../models/login/loginResponse.interface';
import { StorageServiceProvider } from './../storage-service/storage-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthServiceProvider {

  // public authChanged = new Subject<boolean>();
  private fingerprint: boolean = false;
  private user;
  private token: string;
  private loginUrl = 'https://www.dukesdenmark.dk/wp-json/jwt-auth/v1/token';
  private refreshTokenUrl = 'http://dukesdenmark.dk/api/v1/refresh-token';

  constructor(
    private http: HttpClient,
    private storageService: StorageServiceProvider,
    // private navCtrl: NavController
  ) {
    
  }

  login(username, password) {
    let credentials = {
      'username': username,
      'password': password
    };
    return this.http.post<LoginResponse>(this.loginUrl, credentials).toPromise();
  }

  public setToken(token) {
    this.token = token;
  }

  public setUser(user) {
    this.user = user;
  }

  public async logout() {
    // await this.storageService.clearStorage();
    await this.storageService.setLoginStatus('false');
    console.log('#### calling logout ####');
  }
  
  public async clearAllData() {
    await this.storageService.setLoginStatus('false');
    await this.storageService.clearStorage();
    this.setFingerprint(false);
  }


  public getToken() {
    return this.token;
  }

  public getUser() {
    return this.user;
  }

  public setFingerprint(value: boolean) {
    this.fingerprint = value;
  }

  public getFingerprint(): boolean {
    return this.fingerprint;
  }

  public async refreshToken() {
    this.setToken(await this.storageService.getToken());
    return this.http.get<RefreshTokenResponse>(this.refreshTokenUrl).toPromise()
      // .then(RefreshTokenResponse => {
      //   console.log(JSON.stringify(RefreshTokenResponse.token));
      //   this.setToken(RefreshTokenResponse.token);
      //   this.storageService.setToken(RefreshTokenResponse.token);
      // })
  }


}
