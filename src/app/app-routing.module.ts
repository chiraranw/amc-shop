import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';

const newLocal = 'products';
const ROUTES: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/product.module').then((m) => m.ProductModule),
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
