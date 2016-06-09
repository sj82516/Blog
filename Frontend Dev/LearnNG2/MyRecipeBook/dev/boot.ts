///<reference path="../typings/browser.d.ts"/>
import {bootstrap} from "@angular/platform-browser-dynamic";
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from "@angular/router";

//noinspection TypeScriptValidateTypes
bootstrap(AppComponent, [ROUTER_PROVIDERS]);