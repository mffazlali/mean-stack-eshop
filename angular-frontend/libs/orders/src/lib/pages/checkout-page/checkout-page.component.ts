import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { UsersService } from '@eshop/users'
import { MessageService } from 'primeng/api'
import { Subject, takeUntil } from 'rxjs'
import { Order } from '../../models/order'
import { OrderItem } from '../../models/order-item'
import { ORDER_STATUS } from '../../order.constants'
import { CartService } from '../../services/cart.service'
import { OrdersService } from '../../services/orders.service'

@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html',
    styles: [],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
    checkoutFormGroup!: FormGroup
    isSubmitted = false
    editMode = false
    orderItems: OrderItem[]
    userId: string
    countries: { id: string; name: string }[] = []
    endsubs$: Subject<any> = new Subject()

    constructor(
        private formbuilder: FormBuilder,
        private usersService: UsersService,
        private ordersService: OrdersService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private cartService: CartService
    ) {}

    ngOnInit() {
        this._initCheckoutForm()
        this._autoFillUserData()
        this._getCartItems()
        this._getCountries()
    }
    ngOnDestroy() {
        this.endsubs$.next(null)
        this.endsubs$.complete()
    }

    private _initCheckoutForm() {
        this.checkoutFormGroup = this.formbuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: [''],
            street: ['', Validators.required],
            apartment: ['', Validators.required],
            zip: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
        })
    }

    private _autoFillUserData() {
        this.usersService
            .observeCurrentUser()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((user) => {
                this.userId = user.id
                this.checkoutForm.name.setValue(user.name)
                this.checkoutForm.email.setValue(user.email)
                this.checkoutForm.phone.setValue(user.phone)
                this.checkoutForm.street.setValue(user.street)
                this.checkoutForm.apartment.setValue(user.apartment)
                this.checkoutForm.city.setValue(user.city)
                this.checkoutForm.country.setValue(user.country)
                this.checkoutForm.zip.setValue(user.zip)
            })
    }

    private _getCountries() {
        this.countries = this.usersService.getCountries()
    }

    private _getCartItems() {
        const cart = this.cartService.getCart()
        this.orderItems = cart.items.map((cartItem) => {
            return { product: cartItem.productId, quantity: cartItem.quantity }
        })
    }

    placeOrder() {
        this.isSubmitted = true
        if (this.checkoutFormGroup.invalid) {
            return
        }

        const order: Order = {
            city: this.checkoutForm.city.value,
            country: this.checkoutForm.country.value,
            dateOrdered: `${Date.now()}`,
            orderItems: this.orderItems,
            phone: this.checkoutForm.phone.value,
            shippingAddress1: this.checkoutForm.street.value,
            shippingAddress2: this.checkoutForm.apartment.value,
            status: Object.keys(ORDER_STATUS)[0],
            user: this.userId,
            zip: this.checkoutForm.zip.value,
        }
        this.ordersService.cacheOrderData(order)

        this.ordersService
            .createCheckoutSession(this.orderItems)
            .subscribe((error) => {
                if (error) {
                    console.log(error)
                }
            })

        // this.ordersService.createOrder(order).subscribe({
        //     next: () => {
        //         this.cartService.emptyCart()
        //         this.router.navigate(['/success'])
        //     },
        //     error: () => {
        //         this.messageService.add({
        //             severity: 'error',
        //             summary: 'Error',
        //             detail: 'Order is not created!',
        //         })
        //     },
        // })
    }

    get checkoutForm() {
        return this.checkoutFormGroup.controls
    }

    backToCart() {
        this.router.navigate(['/cart'])
    }
}
