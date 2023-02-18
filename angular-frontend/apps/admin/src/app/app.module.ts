// import { NgModule } from '@angular/core'
// import { BrowserModule } from '@angular/platform-browser'

// import { AppComponent } from './app.component'

// @NgModule({
//     declarations: [AppComponent],
//     imports: [BrowserModule],
//     providers: [],
//     bootstrap: [AppComponent],
// })
// export class AppModule {}

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { ShellComponent } from './shared/shell/shell.component'
import { SidebarComponent } from './shared/sidebar/sidebar.component'
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component'
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component'
import { ProductsListComponent } from './pages/products/products-list/products-list.component'
import { ProductsFormComponent } from './pages/products/products-form/products-form.component'
import { UsersListComponent } from './pages/users/users-list/users-list.component'
import { UsersFormComponent } from './pages/users/users-form/users-form.component'
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component'
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component'

import { JwtInterceptor, UsersModule } from '@eshop/users'
import { CardModule } from 'primeng/card'
import { FieldsetModule } from 'primeng/fieldset'
import { ToolbarModule } from 'primeng/toolbar'
import { TagModule } from 'primeng/tag'
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputMaskModule } from 'primeng/inputmask'
import { InputSwitchModule } from 'primeng/inputswitch'
import { DropdownModule } from 'primeng/dropdown'
import { ToastModule } from 'primeng/toast'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ColorPickerModule } from 'primeng/colorpicker'
import { ImageModule } from 'primeng/image'
import { EditorModule } from 'primeng/editor'
import { CategoriesService, ProductsService } from '@eshop/products'
import { MessageService, ConfirmationService } from 'primeng/api'
import { AppRoutingModule } from './app-routing.module'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { NgxStripeModule } from 'ngx-stripe'

const UX_Module = [
    CardModule,
    FieldsetModule,
    ToastModule,
    ConfirmDialogModule,
    TagModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    DropdownModule,
    ColorPickerModule,
    ToolbarModule,
    ButtonModule,
    ImageModule,
    TableModule,
    EditorModule,
]

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ShellComponent,
        SidebarComponent,
        CategoriesListComponent,
        CategoriesFormComponent,
        ProductsListComponent,
        ProductsFormComponent,
        UsersListComponent,
        UsersFormComponent,
        OrdersListComponent,
        OrdersDetailComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        NgxStripeModule.forRoot(
            'pk_test_51Mc2tKJdtUormTWZZrzA0hyiXwHGzfhr3f4Bjws9shlJHUlryxisfLKXffaXlNhmEYw8fDyL9UiAsz3p793Zsa3E00eHCoJsZz'
        ),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        UsersModule,
        ...UX_Module,
    ],
    providers: [
        CategoriesService,
        ProductsService,
        MessageService,
        ConfirmationService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
