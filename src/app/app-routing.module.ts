import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveLoadingService } from './products/services/selective-loading.service';

const newLocal = 'products';
const ROUTES: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'products',
    data: { preload: true },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./products/product.module').then((m) => m.ProductModule),
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES, {
      preloadingStrategy: SelectiveLoadingService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/**
 * Preloading conflicts with canLoad, it goes with canActivate
 */
