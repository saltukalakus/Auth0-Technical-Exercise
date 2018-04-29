import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ViewComponent } from "./view/view.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "view", component: ViewComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
