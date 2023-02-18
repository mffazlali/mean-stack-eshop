import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Category } from '../models/category'
import { environment } from '@eshop/shared/environments'

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    constructor(private http: HttpClient) {}
    apiURLCategories = `${environment.apiURL}/categories`

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiURLCategories)
    }

    getCategory(categoryId: string): Observable<Category> {
        return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`)
    }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.apiURLCategories, category)
    }

    updateCategory(category: Category): Observable<Category> {
        return this.http.put<Category>(
            `${this.apiURLCategories}/${category.id}`,
            category
        )
    }

    deleteCategory(categoryId: string): Observable<Category> {
        return this.http.delete<Category>(
            `${this.apiURLCategories}/${categoryId}`
        )
    }
}
