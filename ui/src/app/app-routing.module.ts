import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevGuard } from './shared/support/dev.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks-jobs/tasks/create'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
