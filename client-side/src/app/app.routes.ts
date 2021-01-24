import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyRouteComponent } from './components/empty-route/empty-route.component';
import { AddonComponent } from './components/addon/addon.component';
import { ApiTesterComponent } from './components/api-tester/api-tester.component';
import { ExperimentComponent } from './components/experiment/experiment.component';

// import * as config from '../../../addon.config.json';

const routes: Routes = [
    {
        path: `settings/:addon_uuid`,
        children: [
            {
                path: 'addon',
                component: AddonComponent
            },
            {
                path: 'api-tester',
                component: ApiTesterComponent
            },
            {
                path: 'experiment',
                component: ExperimentComponent
            },
        ]
    },
    {
        path: '**',
        component: EmptyRouteComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
