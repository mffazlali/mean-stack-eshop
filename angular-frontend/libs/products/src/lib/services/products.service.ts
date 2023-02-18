import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Product } from '../models/product'
import { environment } from '@eshop/shared/environments'

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private http: HttpClient) {}
    apiURLProducts = `${environment.apiURL}/products`

    getProducts(categoriesFilter?: string[]): Observable<Product[]> {
        let params = new HttpParams()
        if (categoriesFilter) {
            params = new HttpParams().append(
                'categories',
                categoriesFilter.join(',')
            )
        }
        return this.http.get<Product[]>(this.apiURLProducts, { params: params })
    }

    getCountProducts() {
        return this.http.get<{ count: number }>(
            `${this.apiURLProducts}/get/count`
        )
    }

    getFeaturedProducts(count: number) {
        return this.http.get<Product[]>(
            `${this.apiURLProducts}/get/featured/${count}`
        )
    }

    getProduct(productId: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiURLProducts}/${productId}`)
    }

    createProduct(product: FormData): Observable<Product> {
        return this.http.post<Product>(this.apiURLProducts, product)
    }

    updateProduct(product: FormData): Observable<Product> {
        return this.http.put<Product>(
            `${this.apiURLProducts}/${product.get('id')}`,
            product
        )
    }

    deleteProduct(productId: string): Observable<Product> {
        return this.http.delete<Product>(`${this.apiURLProducts}/${productId}`)
    }
}
