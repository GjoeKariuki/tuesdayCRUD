import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsFormComponent } from './details-form/details-form.component';
import { DetailsListComponent } from './details-list/details-list.component';
import { DetailsViewComponent } from './details-view/details-view.component';

const routes: Routes = [
  {path: 'counties', component: DetailsListComponent},
  {path: 'county_detail/:id', component: DetailsViewComponent},
  {path: 'county_form', component: DetailsFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
