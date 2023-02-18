import { User } from '@eshop/users'
import { OrderItem } from './order-item'

export class Order {
    id?: string
    shippingAddress1?: string
    shippingAddress2?: string
    city?: string
    zip?: string
    country?: string
    phone?: string
    totalPrice?: number
    status?: string
    dateOrdered?: string
    user?: User | string
    orderItems?: OrderItem[]
}
