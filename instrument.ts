import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { 
    WebTracerProvider,
    ConsoleSpanExporter,
    SimpleSpanProcessor,
    BatchSpanProcessor,
} from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ZoneContextManager } from '@opentelemetry/context-zone-peer-dep';

const provider = new WebTracerProvider();

provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
// Configura o exportador OTLP para enviar traces para o Nginx (proxy reverso configurado)
provider.addSpanProcessor(
    new BatchSpanProcessor(
         new OTLPTraceExporter({
             url: 'http://localhost:4200/collector/v1/traces',  // Agora aponta para o Nginx
             headers: {
                 'Content-Type': 'application/json',
             },
         }),
     ),
 ); 

provider.register({
    contextManager: new ZoneContextManager(),
  });

registerInstrumentations({
    instrumentations: [
        getWebAutoInstrumentations({
            '@opentelemetry/instrumentation-document-load': {},
            '@opentelemetry/instrumentation-user-interaction': {},
            '@opentelemetry/instrumentation-fetch': {},
            '@opentelemetry/instrumentation-xml-http-request': {},
        }),
    ],
});