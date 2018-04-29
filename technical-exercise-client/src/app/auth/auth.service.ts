import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import "rxjs/add/operator/filter";
import * as auth0 from "auth0-js";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import { environment } from "./../../environments/environment";
import { JwtHelper } from "angular2-jwt";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class AuthService {
  accessToken: any;
  private collectionName = new BehaviorSubject<string>("");
  public currentCollectionName = this.collectionName.asObservable();
  refreshSubscription: any;
  auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: "token id_token",
    audience: environment.auth.audience,
    redirectUri: environment.auth.callbackURL,
    scope: environment.auth.scope
  });

  userProfile: any;
  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log(authResult);
        window.location.hash = "";
        this.setSession(authResult);
        this.router.navigate(["/home"]);
      } else if (err) {
        this.router.navigate(["/home"]);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public getProfile(cb: any): void {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("Access token must exist to fetch profile");
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  private setSession(authResult: any): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    // this.accessToken = authResult.accessToken;
    // console.log(authResult);
    const jwthelper = new JwtHelper();
    const decodedToken = jwthelper.decodeToken(authResult.idToken);
    console.log(decodedToken);
    const url = `${environment.auth.callbackURL}/roles`;
    const roles = decodedToken[url];

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("email", authResult.idTokenPayload.email);
    localStorage.setItem("expires_at", expiresAt);
    this.scheduleRenewal();
  }

  changeCollectinName(message: string) {
    this.collectionName.next(message);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");

    this.unscheduleRenewal();
    this.router.navigate(["/"]);
  }
  renewToken(loginOnError?: boolean): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.setSession(authResult);
      } else if (err) {
        // this._setAuthEvent('error', 'Could not renew token', err);
        // Log out to clear auth data
        this.logout();
        if (loginOnError) {
          // If scheduled autorenewal fails, prompt to log in
          // Set auth_redirect back to current page
          this.login();
        }
      }
    });
  }
  getAccessTocken() {
    const token = localStorage.getItem("access_token");
    return token;
  }
  public scheduleRenewal() {
    // tslint:disable-next-line:curly
    if (!this.isAuthenticated()) return;
    this.unscheduleRenewal();

    const expiresAt: any = localStorage.getItem("expires_at");

    const source = Observable.of(expiresAt).flatMap(
      // tslint:disable-next-line:no-shadowed-variable
      expiresAt => {
        const now = Date.now();

        return Observable.timer(Math.max(1, expiresAt - Date.now()));
      }
    );

    this.refreshSubscription = source.subscribe(() => {
      this.renewToken(true);
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    // tslint:disable-next-line:curly
    if (!this.refreshSubscription) return;
    this.refreshSubscription.unsubscribe();
  }

  public isAuthenticated(): boolean {
    const expiresAt: any = localStorage.getItem("expires_at");
    return new Date().getTime() < expiresAt;
  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes: any = localStorage.getItem("scopes");
    console.log("granted scopes", grantedScopes);
    const splitedGrantedScopes = grantedScopes.split(" ");
    return scopes.every(scope => splitedGrantedScopes.includes(scope));
  }
}
