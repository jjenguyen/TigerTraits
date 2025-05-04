import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
// add more components here as we need them

const routes: Routes = [
  // { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // redirect to the welcome page by default
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'quiz', component: QuizComponent},
  // { path: 'profile', component: ProfileComponent},
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'contact-card/:id', component: ContactComponent}
  // add more routes here as we need them
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
