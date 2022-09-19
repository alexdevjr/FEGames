import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGameComponent } from './components/form-game/form-game.component';
import { ListGameComponent } from './components/list-game/list-game.component';

const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games', component: ListGameComponent },
  { path: 'games/add', component: FormGameComponent },
  { path: 'games/edit/:id', component: FormGameComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
