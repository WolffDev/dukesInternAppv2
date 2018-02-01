import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class StorageServiceProvider {

  constructor(private storage: NativeStorage ) {
  }

  async getToken() {
   return await this.storage.getItem('token')
      .then( token => token )
      .catch( err => err);
  }

  async setToken(token) {
    return await this.storage.setItem('token', token)
      .then( res => res)
      .catch( err => err);
  }

  async setUserData(userData) {
    return await this.storage.setItem('user', userData)
      .then(res => res)
      .catch(err => err)
  }

  async getUserData() {
    return await this.storage.getItem('user')
      .then(res => res)
      .catch( err => err)
  }

  async clearStorage() {
    await this.storage.setItem('user', '')
    await this.storage.setItem('token', '')
      .then(res => res)
      .catch( err => err)
  }

}
