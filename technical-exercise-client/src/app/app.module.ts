import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DataService } from "./service/data.service";
import { MaterialModule } from "./material.module";
import { RuleComponent } from "./rule/rule.component";
import { ViewComponent } from "./view/view.component";
import { ClientComponent } from "./client/client.component";
import { HomeComponent } from "./home/home.component";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";
import { TokenInterceptor } from "./interceptor/TokenInterceptor";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClientDetailsComponent } from "./client-details/client-details.component";
import { LoadingSpinnerRectComponent } from "./loading-spinner-rect/loading-spinner-rect.component";
@NgModule({
  declarations: [
    AppComponent,
    RuleComponent,
    ViewComponent,
    ClientComponent,
    HomeComponent,
    ClientDetailsComponent,
    LoadingSpinnerRectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    DataService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ClientDetailsComponent]
})
export class AppModule {}
