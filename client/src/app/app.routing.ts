import { ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

//components
import {TaskListComponent} from "./components/task-list.component";

//vars
const appRoutes: Routes = [
  {path: '', component: TaskListComponent},
  {path: '*', component: TaskListComponent},
];

export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
