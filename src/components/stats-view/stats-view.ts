import { Component } from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'stats-view',
  templateUrl: 'stats-view.html'
})
export class StatsViewComponent {

  templateString = 'Henter data...';

  attendees;
  attendeesAPI;

  constructor() {
    console.log('constructor load from statsView');
  }

  ionViewDidLoad(){
  }
  
  ngOnInit() {
  }


  clogHttp() {
    console.log(this.attendeesAPI.name);
  }
  


  async getTestAsync() {
    return await this.testAsync();
  }

  testAsync() {
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        console.log('from promise');
        resolve('123');
      }, 3000)
    })
  }

}
