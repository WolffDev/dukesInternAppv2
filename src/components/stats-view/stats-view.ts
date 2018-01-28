import { ServerStatsServiceProvider } from './../../providers/server-stats-service/server-stats-service';
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

  constructor(public serverStatsService: ServerStatsServiceProvider) {
    console.log('constructor load from statsView');
    this.attendees = this.getTestAsync();
    this.getAttendees();
  }

  ionViewDidLoad(){
  }
  
  ngOnInit() {
  }

  async getAttendees() {
    let response = await this.serverStatsService.getAttendess();
    return response.subscribe(res => {
      console.log(res[0]);
      this.attendeesAPI = res[0];
    });
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
