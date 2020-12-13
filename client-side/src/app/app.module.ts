import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PepUIModule } from "./modules/pepperi.module";
import { MaterialModule } from "./modules/material.module";
import { ImportAtdComponent } from "./import-atd/import-atd.component";
import { ExportAtdComponent } from "./export-atd/export-atd.component";
import { OrenPlaygroundComponent } from "./oren-playground/oren-playground.component";
import { ApiTesterComponent } from "./api-tester/api-tester.component";

@NgModule({
    declarations: [AppComponent, ImportAtdComponent, ExportAtdComponent, OrenPlaygroundComponent, ApiTesterComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        PepUIModule,
        MaterialModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
