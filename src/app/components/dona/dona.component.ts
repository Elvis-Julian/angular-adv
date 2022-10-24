import { Component, Input, SimpleChanges } from '@angular/core';

import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() title: string = 'sin titulo'; 

  @Input('labels') doughnutChartLabels: string[] = [ 'Lablel1', 'Label2', 'Label3' ];
  
  @Input('data') public data:any = [350, 455, 100];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] }
    ]
  };

  ngOnChanges(changes: SimpleChanges): void {
  this.doughnutChartData={
 
    labels: this.doughnutChartLabels,
    datasets:[{ data:  [ 350, 450, 100 ]}]
 
  }
 
}

}
