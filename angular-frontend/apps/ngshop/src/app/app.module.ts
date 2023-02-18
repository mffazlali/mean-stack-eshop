import { isDevMode, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiModule } from '@eshop/ui'

import { AppComponent } from './app.component'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { FooterComponent } from './shared/footer/footer.component'
import { HeaderComponent } from './shared/header/header.component'
import { AccordionModule } from 'primeng/accordion'
import { NavComponent } from './shared/nav/nav.component'
import { ProductsModule } from '@eshop/products'
import { OrdersModule } from '@eshop/orders'
import { JwtInterceptor, UsersModule } from '@eshop/users'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgxStripeModule } from 'ngx-stripe'
import { AppRoutingModule } from './app-routing.module'

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        FooterComponent,
        HeaderComponent,
        NavComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(), // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
        }),
        NgxStripeModule.forRoot(
            'pk_test_51Mc2tKJdtUormTWZZrzA0hyiXwHGzfhr3f4Bjws9shlJHUlryxisfLKXffaXlNhmEYw8fDyL9UiAsz3p793Zsa3E00eHCoJsZz'
        ),
        UiModule,
        AccordionModule,
        ProductsModule,
        OrdersModule,
        UsersModule,
    ],
})
export class AppModule {}
