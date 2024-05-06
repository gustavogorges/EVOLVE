import { DashBoardCharts } from "./DashBoardCharts";
import { Project } from "./project";

export class Dashboard{
    id !: number;
    name: string = ''
    styleDash !: any[]
    charts : Array<DashBoardCharts> = new Array

}