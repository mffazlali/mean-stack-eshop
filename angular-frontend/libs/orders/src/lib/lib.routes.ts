import { Route } from '@angular/router'
import { AuthGuard } from '@eshop/users'
import { CartPageComponent } from './pages/cart-page/cart-page.component'
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component'
import { ThankYouComponent } from './pages/thank-you/thank-you.component'

export const ordersRoutes: Route[] = [
    {
        path: 'cart',
        component: CartPageComponent,
    },
    {
        path: 'checkout',
        canActivate: [AuthGuard],
        component: CheckoutPageComponent,
    },
    {
        path: 'success',
        component: ThankYouComponent,
    },
]
