import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class StorageServiceProvider {

  constructor(private storage: NativeStorage ) {
  }

  getToken() {
   return this.storage.getItem('token')
      .then( token => token )
      .catch( err => err);
  }

  setToken(token) {
    return this.storage.setItem('token', token)
      .then( res => res)
      .catch( err => err);
  }

  setUserData(userData) {
    this.storage.setItem('user', userData)
      .then(res => res)
      .catch(err => err)
  }

}
