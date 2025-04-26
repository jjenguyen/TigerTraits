import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from "@angular/common/http";
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './head-create/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { ResultsComponent } from './results/results.component';
import { MobileLayoutComponent } from './mobile-layout/mobile-layout.component';
import { LayoutDeciderComponent } from './layout-decider/layout-decider.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    QuizComponent,
    InfoCardComponent,
    WelcomeComponent,
    ProfileComponent,
    ResultsComponent,
    MobileLayoutComponent,
    LayoutDeciderComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatTableModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [LayoutDeciderComponent]
})
export class AppModule { }
