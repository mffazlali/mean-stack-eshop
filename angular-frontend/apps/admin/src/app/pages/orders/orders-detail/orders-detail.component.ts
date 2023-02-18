import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Order, OrdersService, ORDER_STATUS } from '@eshop/orders'

@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: [],
})
export class OrdersDetailComponent implements OnInit {
    order: Order
    orderStatuses: { id: string; name: string }[]
    selectedStatus: string
    messageService: any

    constructor(
        private route: ActivatedRoute,
        private ordersService: OrdersService
    ) {}

    ngOnInit() {
        this._mapOrderStatus()
        this._getOrder()
    }

    private _getOrder() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.ordersService.getOrder(params['id']).subscribe((order) => {
                    this.order = order
                    this.selectedStatus = order.status.toString()
                })
            }
        })
    }

    private _mapOrderStatus() {
        this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
            return {
                id: key,
                name: ORDER_STATUS[key].label,
            }
        })
    }

    onStatusChange(event) {
        this.ordersService
            .updateOrder({ status: event.value }, this.order.id)
            .subscribe({
                next: () => {
                    this._getOrders()
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Order is updated!',
                    })
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Order is not updated!',
                    })
                },
            })
    }
    _getOrders() {
        throw new Error('Method not implemented.')
    }
}
