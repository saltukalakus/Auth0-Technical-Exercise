import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../service/data.service";
import { Observable } from "rxjs/Observable";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith
} from "rxjs/operators";
import { Client } from "../shared/client";
import { MatDialog } from "@angular/material";
import { ClientDetailsComponent } from "../client-details/client-details.component";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.css"]
})
export class ClientComponent implements OnInit, OnDestroy {
  subs: Subscription;
  searchForm: FormGroup;
  clients: any;
  title = "app";
  loader = true;
  constructor(
    private data: DataService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.searchForm = this.fb.group({
      search: [""]
    });
  }
  ngOnInit() {
    //  this.clients = this.data.getClient();

    this.subs = this.searchForm.controls.search.valueChanges
      .pipe(
        startWith(""),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(m => this.data.getClient(m))
      )
      .subscribe(res => {
        this.clients = res;
        this.loader = false;
      });
  }

  loadRules(message: string) {
    this.data.changeMessage(message);
  }

  loadDetails(client: Client) {
    this.dialog.open(ClientDetailsComponent, {
      data: client,
      height: "500px"
    });
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
