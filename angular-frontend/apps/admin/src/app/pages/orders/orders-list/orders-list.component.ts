import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Order, OrdersService, ORDER_STATUS } from '@eshop/orders'
import { MessageService, ConfirmationService } from 'primeng/api'
import { Subject, takeUntil } from 'rxjs'

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: [],
})
export class OrdersListComponent implements OnInit, OnDestroy {
    orders: Order[] = []
    orderStatus = ORDER_STATUS
    endsubs$: Subject<any> = new Subject()

    constructor(
        private ordersService: OrdersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit() {
        this._getOrders()
    }

    ngOnDestroy() {
        this.endsubs$.next(null)
        this.endsubs$.complete()
    }

    deleteOrder(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this order?',
            accept: () => {
                this.ordersService
                    .deleteOrder(id)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe({
                        next: () => {
                            this._getOrders()
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Order is deleted!',
                            })
                        },
                        error: () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Order is not deleted!',
                            })
                        },
                    })
            },
        })
    }

    showOrder(orderId: string) {
        this.router.navigateByUrl(`orders/${orderId}`)
    }

    private _getOrders() {
        this.ordersService
            .getOrders()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((cats) => {
                this.orders = cats
            })
    }
}
