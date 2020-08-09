import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input() characters: Character[];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  labelChart = 'Personajes Breaking Bad';

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    {
      data: [],
      label: this.labelChart
    }
  ];

  public colors = [

    {
      backgroundColor: '#1fc1de'
    }

  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {

    console.log(this.characters);
    this.loadChartData();

  }

  loadChartData(): void {

    this.barChartLabels = [];

    this.barChartData = [
      {
        data: [],
        label: this.labelChart
      }
    ];

    // Mapear los datos obtenidos del service
    this.characters.map( (item: Character) => {

      this.barChartLabels.push( item.name );
      this.barChartData[0].data.push( item.votes );

    });

  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }

}
