import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  // predicted_date: any = [];
  // predicted_column: any = [];
  predictedColumnName: any;
  ids: any;
  values: any;
  period: any;

  val=[];
  barChart: any = [];
  date: any[] = [];
  sale: any[] = [];

  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }     
  ngOnInit(): void {

    // this.http.get('http://localhost:3001/datas').subscribe((response: any) => {
    //   // Extract the last item from the response
    //   this.ids = response[response.length - 1];
    //   Object.assign(this, this.ids);
    // });
    this.http.get("http://127.0.0.1:5000/val").subscribe(
      (dat: any) => {
        this.val=dat;
    })
    this.http.get("http://127.0.0.1:5000/value").subscribe(
      (data: any) => {
        for (var i = 0; i < data.length; i++) {
          this.date[i] = data[i].Date;
          this.sale[i] = data[i].Sales;
        }

        console.log(this.date, this.sale)

        var myChart = new Chart("myChart", {
          type: 'line',
          data: {
            labels: this.date,
            datasets: [{
              label: '# of SALES',
              data: this.sale,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 2
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        // barchart
        var barchart = new Chart("barchart", {
          type: 'bar',
          data: {
            labels: this.date,
            datasets: [{
              label: '# of SALES',
              data: this.sale,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 2
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });

      console.log(this.val);
    // json to flask

    // this.http.post<any>('http://127.0.0.1:5000/siva',this.values).subscribe(res=>{
    //   console.log(this.ids)
    //   alert("hi")
    // },err=>{
    //   alert('hjdg')
    // })
  }

}