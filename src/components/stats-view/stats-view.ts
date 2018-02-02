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

  constructor(private serverStatsSerive: ServerStatsServiceProvider) {
    this.getAttendes();
    
    
  }
  
  ionViewDidLoad(){
    console.log('stats view is LAOADING!');
  }
  
  ngOnInit() {
  }


  clogHttp() {
  }
  


  getAttendes() {
    this.serverStatsSerive.getAttendeesNumber()
      .then( res => this.attendees = res)
      .catch( err => console.log(err))
  }


}
