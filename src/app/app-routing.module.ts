import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizesComponent } from './quizes/quizes.component';
import { QuizEditComponent} from './quiz-edit/quiz-edit.component';
import { QuizDashboardComponent} from './quiz-dashboard/quiz-dashboard.component';
import { QuizCreateComponent} from './quiz-create/quiz-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/quiz-dashboard', pathMatch: 'full' },
  { path: 'quizes', component: QuizesComponent },
  { path: 'quiz-edit/:id', component: QuizEditComponent },
  { path: 'quiz-dashboard', component: QuizDashboardComponent},
  { path: 'quiz-create', component: QuizCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
