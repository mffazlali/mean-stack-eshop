import { Component, OnDestroy, OnInit } from '@angular/core'
import { OrdersService } from '@eshop/orders'
import { ProductsService } from '@eshop/products'
import { UsersService } from '@eshop/users'
import { Subject, takeUntil } from 'rxjs'

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    totalSales = 0
    ordersCount = 0
    usersCount = 0
    productsCount = 0
    endsubs$: Subject<any> = new Subject()

    constructor(
        private ordersService: OrdersService,
        private usersService: UsersService,
        private productsService: ProductsService
    ) {}

    ngOnInit() {
        this.ordersService
            .getTotalSalesOrders()
            .pipe(takeUntil(this.endsubs$))
            .subscribe({
                next: (orders) => {
                    this.totalSales = orders.totalSales
                },
            })
        this.ordersService
            .getCountOrders()
            .pipe(takeUntil(this.endsubs$))
            .subscribe({
                next: (orders) => {
                    this.ordersCount = orders.count
                },
            })
        this.usersService
            .getCountUsers()
            .pipe(takeUntil(this.endsubs$))
            .subscribe({
                next: (users) => {
                    this.usersCount = users.count
                },
            })
        this.productsService
            .getCountProducts()
            .pipe(takeUntil(this.endsubs$))
            .subscribe({
                next: (products) => {
                    this.productsCount = products.count
                },
            })
    }

    ngOnDestroy() {
        this.endsubs$.next(null)
        this.endsubs$.complete()
    }
}
