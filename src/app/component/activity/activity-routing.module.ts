import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{activityComponent}from './activity.component'
import{HelpListComponent} from './help/list/help-list.component'
import{PublicComponent} from "./help/public/public.component"
const actRoutes: Routes = [
    {
        path: '', component: activityComponent,
        children: [
            {
                path:'helpList',
                component:HelpListComponent
            },
            {
                path:"public",
                component:PublicComponent
            }
        ]
    }
]


@NgModule({
  imports: [
    RouterModule.forChild(actRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ActivityRoutingModule { }