import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpPageComponent } from './help-page/help-page.component';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  { path: '', component: TabsComponent },
  { path: 'help', component: HelpPageComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
