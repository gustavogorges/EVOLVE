import { Chart } from "chart.js";

export class ChartData{
    id : number = 0;
    chart !: Chart;
    label : string = "";
    value : number = 0;
}