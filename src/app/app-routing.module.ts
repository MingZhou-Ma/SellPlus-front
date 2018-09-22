import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SelectivePreloadingStrategy} from "./selective-preloading-strategy";

import { PageNotFoundComponent } from './error-page/page-not-found.component';
import{AdminLoginGuard} from './service/guard/admin-login-guard.service';


/**
 * app路由
 */
const appRoutes: Routes = [
  { path: '',   // 初始路由重定向
    redirectTo: '/login', 
    pathMatch: 'full'   // 必须要设置
  },
  { 
     path: 'login',  
     loadChildren: 'app/login/login.module#LoginModule',
    // canActivate:[AdminLoginGuard]
  },
  { 
     path: 'home',  
     loadChildren: 'app/component/main/main.module#MainModule',
     canActivate:[AdminLoginGuard]
  },
  {
     path:'**',   //错误路由重定向
     component: PageNotFoundComponent,
     pathMatch: 'full'  // 必须要设置
  },
//  {
//    path:'register',
//    loadChildren: 'app/register/register.module#RegisterModule',
//  },

];

@NgModule({
  imports: [
   RouterModule.forRoot(appRoutes,{preloadingStrategy: SelectivePreloadingStrategy,useHash:true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}


