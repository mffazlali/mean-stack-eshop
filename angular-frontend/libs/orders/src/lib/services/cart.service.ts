import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Cart, CartItem } from '../models/cart'

const CART_KEY = 'cart'
@Injectable({
    providedIn: 'root',
})
export class CartService {
    cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart())

    constructor() {}

    initCartLocalstorage() {
        const cart = this.getCart()
        if (!cart) {
            const initialCart = {
                items: [],
            }
            const initialCartJson = JSON.stringify(initialCart)
            localStorage.setItem(CART_KEY, initialCartJson)
        }
    }

    emptyCart() {
        const initialCart = {
            items: [],
        }
        const initialCartJson = JSON.stringify(initialCart)
        localStorage.setItem(CART_KEY, initialCartJson)
        this.cart$.next(initialCart)
    }

    setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
        const cart = this.getCart()
        const existCartItem = cart.items.find(
            (item) => item.productId === cartItem.productId
        )
        if (existCartItem) {
            cart.items.map((item) => {
                if (item.productId === cartItem.productId) {
                    if (updateCartItem) item.quantity = cartItem.quantity
                    else item.quantity = item.quantity + cartItem.quantity
                    return item
                }
            })
        } else {
            cart.items.push(cartItem)
        }

        const cartJson = JSON.stringify(cart)
        localStorage.setItem(CART_KEY, cartJson)
        this.cart$.next(cart)
        return cart
    }

    deleteCartItem(productId: string): CartItem {
        const cart = this.getCart()
        const existCartItem = cart.items.find(
            (cartItem) => cartItem.productId === productId
        )
        if (existCartItem) {
            const cartItems = cart.items.filter(
                (cartItem) => cartItem.productId !== productId
            )
            cart.items = cartItems
            const cartJson = JSON.stringify(cart)
            localStorage.setItem(CART_KEY, cartJson)
            this.cart$.next(cart)
        }
        return existCartItem
    }

    getCart(): Cart {
        const cartJsonString = localStorage.getItem(CART_KEY)
        const cart = JSON.parse(cartJsonString)
        return cart
    }
}
