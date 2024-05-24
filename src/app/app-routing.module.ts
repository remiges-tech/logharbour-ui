import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DatachangeLogComponent } from './logs/datachange-log/datachange-log.component';
import { DebugLogComponent } from './logs/debug-log/debug-log.component';
import { HighpriLogComponent } from './logs/highpri-log/highpri-log.component';
import { ShowactivityLogComponent } from './logs/showactivity-log/showactivity-log.component';
import { UnusualIpComponent } from './logs/unusual-ip/unusual-ip.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: '', component: DatachangeLogComponent },
  { path: 'showactivity-log', component: ShowactivityLogComponent },
  { path: 'highpri-log', component: HighpriLogComponent },
  { path: 'debug-log', component: DebugLogComponent },
  { path: 'unusual-ip', component: UnusualIpComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
