import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PepUIModule } from '../../modules/pepperi.module';
import { MaterialModule } from '../../modules/material.module';
import { ExperimentComponent } from './experiment.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ExperimentComponent
    ],
    imports: [
        CommonModule,
        PepUIModule,
        MaterialModule,
        FormsModule
    ],
    providers: []
})
export class ExperimentModule {
}




