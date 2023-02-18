import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@eshop/shared/environments'
import { Order, OrderItem } from '@eshop/orders'
import { Observable, switchMap } from 'rxjs'
import { StripeService } from 'ngx-stripe'

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    constructor(
        private http: HttpClient,
        private stripeService: StripeService
    ) {}
    apiURLOrders = `${environment.apiURL}/orders`
    apiURLProducts = `${environment.apiURL}/products`

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiURLOrders)
    }

    getCountOrders() {
        return this.http.get<{ count: number }>(
            `${this.apiURLOrders}/get/count`
        )
    }

    getTotalSalesOrders() {
        return this.http.get<any>(`${this.apiURLOrders}/get/totalsales`)
    }

    getOrder(orderId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`)
    }

    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.apiURLOrders, order)
    }

    updateOrder(
        orderStatus: { status: string },
        orderId: string
    ): Observable<Order> {
        return this.http.put<Order>(
            `${this.apiURLOrders}/${orderId}`,
            orderStatus
        )
    }

    deleteOrder(orderId: string): Observable<Order> {
        return this.http.delete<Order>(`${this.apiURLOrders}/${orderId}`)
    }

    getProduct(productId: string): Observable<any> {
        return this.http.get<any>(`${this.apiURLProducts}/${productId}`)
    }

    createCheckoutSession(orderItem: OrderItem[]) {
        return this.http
            .post(`${this.apiURLOrders}/create-checkout-session`, orderItem)
            .pipe(
                switchMap((session: { id: string }) => {
                    return this.stripeService.redirectToCheckout({
                        sessionId: session.id,
                    })
                })
            )
    }

    cacheOrderData(order: Order) {
        localStorage.setItem('orderData', JSON.stringify(order))
    }

    getCachedOrderData(): Order {
        return JSON.parse(localStorage.getItem('orderData'))
    }

    removeCachedOrderData() {
        localStorage.removeItem('orderData')
    }
}
