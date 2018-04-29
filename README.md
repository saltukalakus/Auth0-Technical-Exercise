# Auth0-Technical-Exercise

# Development server
# Technical-Exercise-Client
Run npm install to install npm packages. Run ng serve for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

This client application is a simple Angular 5 Application. it makes Http call to RestFul api endpoint to consume resources such as auth0 clients and rules. The application implements the auto complete search on the clients property. At this moment it only search on client_id and name. 

# Auth0.Exercise.Server
A simple client which communicate to Auth0 Management Api. It can be considered as a wrapper on top of Auth0 management API. At this moment, it only retrives auth0 client and rules and exposes the resourcess as rest api for client application to consume the resources. 
The main purpose for this layer is that there is no direct communication between auth0 client and rules. However, to apply a rules to a application, rules contains client identifier property in the script. Thus, it is possible to figure out which rules applies to which application just by simply running a search in the script property with client id. 
