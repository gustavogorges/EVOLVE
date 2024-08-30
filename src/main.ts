import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

import './../instrument';

import { init as initApm } from '@elastic/apm-rum'
import { ApmService } from '@elastic/apm-rum-angular'

const apmConfig = {
  serviceName: 'evolve',  // Nome do serviço que você quer definir
  serverUrl: 'http://localhost:8200',
  serviceVersion: '1.0.0',  // Versão do seu serviço
  environment: 'production',  // Ambiente (ex: production, development)
}
const apm = initApm(apmConfig);


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  export function initializeApp(apmService: ApmService) {
    return (): Promise<void> => {
      return new Promise((resolve) => {
        console.log('Initializing APM...');
        apmService.init(apmConfig);
        console.log('APM Initialized');
        resolve();
        console.log("Resolved!");
        
      });
    };
  }
