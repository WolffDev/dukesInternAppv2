import { Component } from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'stats-view',
  templateUrl: 'stats-view.html'
})
export class StatsViewComponent {

  templateString = 'Henter data...';

  attendees;

  constructor() {
    this.getAttendes();
    
    
  }
  
  ionViewDidLoad(){
  }
  
  ngOnInit() {
  }


  clogHttp() {
  }
  


  getAttendes() {
    // this.serverStatsSerive.getAttendeesNumber()
    //   .then( res => this.attendees = res)
    //   .catch( err => console.log(err))
  }


}
