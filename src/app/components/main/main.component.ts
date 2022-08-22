import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  currency! : string 
  exchangeRate! : string
  date! : string
  last_30_days!: any[]
  canShow : boolean = false
  sign = '+'
  constructor(private apiService : ApiService) { }
  
  ngOnInit(): void {
  }

  handleClick(){
    this.apiService.getExchangeRate(this.currency).subscribe(
      {
        next: (data)=>{
          this.exchangeRate = data[0].bid.slice(0,4).replace(".",",")
          this.date = this.timeStampToDate(data[0].timestamp)
        }
      }
    )

    this.apiService.getLast30days(this.currency).subscribe(
      {
        next: (data) =>{
          this.last_30_days = data
          console.log(this.last_30_days)
        }
      }
    )
  }

  setCurrency(currency : string){
    this.currency = currency
  }

  timeStampToDate(timestamp : string){
    let unix_timestamp = Number.parseInt(timestamp)
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes().toString();

    if(date.getMinutes() < 10){
      minutes = "0" + date.getMinutes();
    }
    
    // Will display time in 10:30:23 format
    return `${date.toLocaleDateString()} - ${hours}h${minutes}`
  }

  toggleList(){
    if(this.last_30_days){
      this.canShow = !this.canShow
      this.sign = this.canShow?"-":"+"
    }
  }
}
