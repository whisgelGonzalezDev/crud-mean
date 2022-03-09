import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from '../../services/producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.scss']
})
export class ListarProductosComponent implements OnInit {
  listarProducto: Producto[] = []
  producto = 'Producto';
  categoria = 'Categoria';
  ubicacion = 'Ubicacion';
  precio = 'Precio'
  constructor(private productos: ProductoService,
              private toastr: ToastrService) {
   }

  ngOnInit(): void {
    this.obtenerProductos();
  }
  obtenerProductos() {
    this.productos.getProducto().subscribe(response => {
      console.log(response)
      this.listarProducto = response
    }, error => {
      console.log(error);
    })
  }

  eliminarProducto(id: any) {
    this.productos.eliminarProducto(id).subscribe(response => {
      this.toastr.error('El producto fue eliminado', 'producto eliminado');
      this.obtenerProductos();
    }, error => {
      console.log(error)
    })
  }


}
