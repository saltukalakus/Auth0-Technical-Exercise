import { Component, OnInit } from "@angular/core";
import { DataService } from "./service/data.service";
import { Client } from "./shared/client";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  constructor(private auth: AuthService) {
    auth.handleAuthentication();
    auth.scheduleRenewal();
  }
  ngOnInit() {}
  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
}

// .subscribe(res => {
//   this.clients = res as Client[];
//   console.log(this.clients);
// });
