import { Component, OnInit } from '@angular/core';
import { Task } from 'src/model/task';
import { User } from 'src/model/user';
import { CookiesService } from 'src/service/cookies-service.service';
import { BackendEVOLVEService } from 'src/service/backend-evolve.service';
import { Team } from 'src/model/team';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tela-reports',
  templateUrl: './tela-reports.component.html',
  styleUrls: ['./tela-reports.component.scss']
})
export class TelaReportsComponent implements OnInit {
  loggedUser: User | null = null;
  teamsWithReports: { team: Team, report: any[] }[] = [];

  constructor(private cookieService: CookiesService, private backendService: BackendEVOLVEService) { }

  async ngOnInit(): Promise<void> {
    // Obtém o usuário logado
    this.loggedUser = await this.cookieService.getLoggedUser();

    if (this.loggedUser) {
      // Itera sobre cada equipe do usuário
      for (const team of this.loggedUser.teams) {
        const teamReportContent = [];

        // Itera sobre cada projeto na equipe
        for (const project of team.projects) {
          const projectTasksContent = [];

          // Itera sobre cada tarefa no projeto
          for (const taskId of project.tasks) {
            const task: Task = await this.backendService.getOne("task", taskId.id);
            const associateNames: string = (task.associates as User[]).map(associate => associate.name).join(', ');

            // Adiciona as informações da tarefa ao conteúdo da tabela
            projectTasksContent.push([
              { text: task.name, style: 'value' },
              { text: associateNames, style: 'value' },
              { text: task.currentStatus.name, style: 'value' },
              { text: task.finalDate, style: 'value' }
            ]);
          }

          // Adiciona o conteúdo das tarefas do projeto ao relatório da equipe
          teamReportContent.push(
            { text: `Projeto: ${project.name}`, style: 'header' },
            {
              table: {
                widths: ['*', '*', '*', '*'],
                body: [
                  ['Nome da tarefa', 'Associados', 'Status Atual', 'Data Final'],
                  ...projectTasksContent
                ]
              }
            }
          );
        }

        // Adiciona o relatório da equipe e suas respectivas sessões de projeto à lista
        this.teamsWithReports.push({ team, report: teamReportContent });
      }
    }
  }

  generatePdf(teamReport: any[]): void {
    const docDefinition: TDocumentDefinitions = {
      content: teamReport,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 20], // top, right, bottom, left
          alignment: 'center',
          color: '#333',
        },
        value: {
          fontSize: 12,
          margin: [0, 5, 0, 10], // top, right, bottom, left
          color: '#333',
        },
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
