import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ordersRoutes } from './lib.routes'
import { CartIconComponent } from './components/cart-icon/cart-icon.component'
import { ButtonModule } from 'primeng/button'
import { BadgeModule } from 'primeng/badge'
import { InputTextModule } from 'primeng/inputtext'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputMaskModule } from 'primeng/inputmask'
import { DropdownModule } from 'primeng/dropdown'
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api'
import { CartPageComponent } from './pages/cart-page/cart-page.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { OrderSummaryComponent } from './components/order-summary/order-summary.component'
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component'
import { ThankYouComponent } from './pages/thank-you/thank-you.component'
import { NgxStripeModule } from 'ngx-stripe'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(ordersRoutes),
        // NgxStripeModule.forChild(
        //     'pk_test_51Mc2tKJdtUormTWZZrzA0hyiXwHGzfhr3f4Bjws9shlJHUlryxisfLKXffaXlNhmEYw8fDyL9UiAsz3p793Zsa3E00eHCoJsZz'
        // ),
        BadgeModule,
        ToastModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        InputMaskModule,
        DropdownModule,
    ],
    declarations: [
        CartIconComponent,
        CartPageComponent,
        OrderSummaryComponent,
        CheckoutPageComponent,
        ThankYouComponent,
    ],
    exports: [
        CartIconComponent,
        CartPageComponent,
        OrderSummaryComponent,
        CheckoutPageComponent,
        ThankYouComponent,
    ],
    providers: [MessageService],
})
export class OrdersModule {}
