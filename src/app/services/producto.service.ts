import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
URL = 'http://localhost:4000/api/productos/'
  constructor(private http: HttpClient) { }

  getProducto(): Observable<any> { 
    return this.http.get(this.URL)
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(this.URL + id)
  }

  guardarProducto(producto: Producto):Observable<any>{
    return this.http.post(this.URL, producto);
  }

  obtenerProducto(id: string): Observable<any> {
    return this.http.get(this.URL + id );
  }

  editarProducto(id: string, producto: Producto):Observable<any>{
    return this.http.put(this.URL + id, producto)
  }

}
