# Auth0-Technical-Exercise

# Technical-Exercise-Client
Run ```npm install``` to install npm packages. Run ```ng serve``` for a dev server. Navigate to http://localhost:4200/. 

This client application is a simple Angular 5 Application (Single Page Application). it makes authenticated HTTP requests to a resource (API SERVER) using an access token. the access tokens is issued by Authorization server(Auth0) with the approval of resource owner . The application implements the auto complete search on the clients (Application) collections. At this moment, it only search on client_id and name. 

 It follows implict grant and retrieve access token. 

Angular  has the concept of token interceptor for outgoing message. In this application, an interceptor is created to dynamically add access token for each outgoing request.

# Auth0.Exercise.Server
This is an ASPNET CORE 2.1 project.A simple server app which communicate to Auth0 Management Api. Management API is meant to be used by back-end servers or trusted parties performing administrative tasks. It can be considered as a wrapper on top of Auth0 management API. At this moment, it only retrives auth0 clientS(Applications) and rules. Then, it exposes the resourcess as RestFul API for client application to consume the resources. 
The main purpose for this layer to  to dynamically generate, at any time, a list of the applications in our account and the rules which apply to each application. It throws a chalange to use. Because, There is no direct communication between auth0 client and rules. However, to apply a rules to a application, rules contains client identifier property (clientId, name) in the script. Thus, it is possible to figure out which rules applies to which application just by simply running a search in the script property with clientId. 

To communicate with Auth0 Management Api, It reqires token and domain property. This is a server to server communication or machine to machine communication. The token is generated using using auth0 dashboard. It follows the client credientials authorization grant flows.

The resources are secured.So, client application requires access token to include in the HTTP header for accessing the resources. Otherwise, request will be denied. It simply returns Unauthorised status code (401).



# User whitelisting for client

The application requires to be protected and available to only few users. Therefore, as we are using auth0, we can leverage the auth0 rules for white listing users for specific client. 

Only white listed user is

username : t.h.aia@outlook.com
password : Muna011074#

## Screenshoot

![pic](https://user-images.githubusercontent.com/38843176/39411655-39e9961e-4c06-11e8-8085-0705c6f55d10.JPG)
![pic2](https://user-images.githubusercontent.com/38843176/39411680-b1db1aee-4c06-11e8-8343-fc98bd0bb0b7.JPG)
![pic3](https://user-images.githubusercontent.com/38843176/39411721-da58b606-4c07-11e8-812b-220cd585a2a0.JPG)
