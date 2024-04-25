import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatachangeLogComponent } from './datachange-log/datachange-log.component';
import { ShowactivityLogComponent } from './showactivity-log/showactivity-log.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HighpriLogComponent } from './highpri-log/highpri-log.component';
import { DebugLogComponent } from './debug-log/debug-log.component';

const routes: Routes = [
  {path: '', component:DatachangeLogComponent},
  {path: 'showactivity-log', component:ShowactivityLogComponent},
  {path: 'highpri-log', component:HighpriLogComponent},
  {path: 'debug-log', component:DebugLogComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
