// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
 import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { tokenInterceptor } from '../interceptor/token.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';


 export const appConfig: ApplicationConfig = {
   providers: [provideZoneChangeDetection({eventCoalescing:true}) ,provideRouter(routes), provideHttpClient(withInterceptors([tokenInterceptor])) ]
 };
