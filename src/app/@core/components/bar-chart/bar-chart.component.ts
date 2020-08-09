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
      backgroundColor: '#17a2b8'
    }

  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void { // Cuando hay cambios en el componente

    console.log(this.characters);
    this.characters = changes.characters.currentValue;
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

}
