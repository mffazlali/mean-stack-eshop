import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './pages/home-page/home-page.component'

const routes: Routes = [{ path: '', component: HomePageComponent }]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        // { initialNavigation: 'enabledBlocking' }),
    ],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRoutingModule {}
