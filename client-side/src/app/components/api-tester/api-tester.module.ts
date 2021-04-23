import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PepUIModule } from '../../modules/pepperi.module';
import { MaterialModule } from '../../modules/material.module';
import { ApiTesterComponent } from './api-tester.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ApiTesterComponent
    ],
    imports: [
        CommonModule,
        PepUIModule,
        MaterialModule,
        FormsModule
    ],
    providers: []
})
export class ApiTesterModule {
}




