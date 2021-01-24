import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmptyRouteComponent } from "./empty-route/empty-route.component";
import { ImportAtdComponent } from "./import-atd/import-atd.component";
import { ExportAtdComponent } from "./export-atd/export-atd.component";
import { OrenPlaygroundComponent } from "./oren-playground/oren-playground.component";
import { ApiTesterComponent } from "./api-tester/api-tester.component";

// import * as config from '../../../addon.config.json';

const routes: Routes = [
    {
        path: `settings/d9999883-ef9a-4295-99db-2f1d3fc34af6/export-atd`,
        component: ExportAtdComponent,
    },
    {
        path: `settings/d9999883-ef9a-4295-99db-2f1d3fc34af6/import-atd`,
        component: ImportAtdComponent,
    },
    {
        path: `settings/d9999883-ef9a-4295-99db-2f1d3fc34af6/oren-playground`,
        component: OrenPlaygroundComponent,
    },
    {
        path: `settings/d9999883-ef9a-4295-99db-2f1d3fc34af6/api-tester`,
        component: ApiTesterComponent,
    },
    {
        path: "**",
        component: EmptyRouteComponent,
    },

    // {
    //   path: 'settings/95501678-6687-4fb3-92ab-1155f47f839e/themes',
    //   loadChildren: () => import('./plugin/plugin.module').then(m => m.PluginModule)
    // },
    // {
    //   path: '',
    //   loadChildren: () => import('./plugin/plugin.module').then(m => m.PluginModule)
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
