import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../service/data.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { Rule } from "../shared/rule";
import { Subscription } from "rxjs/Subscription";
@Component({
  selector: "app-rule",
  templateUrl: "./rule.component.html",
  styleUrls: ["./rule.component.css"]
})
export class RuleComponent implements OnInit, OnDestroy {
  subs: Subscription;
  rules: any;
  loader = true;
  private rulesSource$ = new BehaviorSubject<string>(null);
  rulesMessage = this.rulesSource$.asObservable();

  constructor(private data: DataService) {}

  ngOnInit() {
    this.subs = this.data.clientIdMessage
      .switchMap(m => this.data.getRules(m))
      .subscribe(res => {
        this.rules = res;
        this.loader = false;
      });
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
