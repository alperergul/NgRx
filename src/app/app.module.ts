import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterbuttonComponent } from './component/counterbutton/counterbutton.component';
import { CounterdisplayComponent } from './component/counterdisplay/counterdisplay.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Material.Module';
import { CustomcounterComponent } from './component/customcounter/customcounter.component';
import {FormsModule , ReactiveFormsModule} from "@angular/forms";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeComponent } from './component/home/home.component';
import { MenuHeaderComponent } from './component/menu-header/menu-header.component';
import { BlogComponent } from './component/blog/blog.component';
import { CounterComponent } from './component/counter/counter.component';
import {AppState} from "./shared/store/Global/App.state";
import { AddBlogComponent } from './component/add-blog/add-blog.component';
import {HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";
import {BlogEffects} from "./shared/store/Blog/blog.effects";

@NgModule({
  declarations: [AppComponent, CounterbuttonComponent, CounterdisplayComponent, CustomcounterComponent, HomeComponent, MenuHeaderComponent, BlogComponent, CounterComponent, AddBlogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(AppState),
    BrowserAnimationsModule,
    FormsModule,
    StoreDevtoolsModule.instrument({ maxAge: false, logOnly: !isDevMode() }),
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([BlogEffects])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
