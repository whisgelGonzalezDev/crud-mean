import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  titulo = 'Crear Producto'
  id: string | null;
  productoForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private producto: ProductoService,
    private aRoute: ActivatedRoute) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.esEditar()
  }

  agregarProducto() {
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    if(this.id !== null) {
      // Editar producto
      this.producto.editarProducto(this.id, PRODUCTO).subscribe(response => {
        this.toastr.info('Registro Actualizado exitosamente', 'El producto fue actualizado exito!!!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    } else {
      // Crear producto
      console.log(PRODUCTO)
      this.producto.guardarProducto(PRODUCTO).subscribe(response => {
        this.toastr.success('Registro creado exitosamente', 'El producto fue agregado exito!!!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    }

  }

  ngOnInit(): void {
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = "Editar Producto"
      this.producto.obtenerProducto(this.id).subscribe(response => {
        this.productoForm.setValue({
          producto: response.nombre,
          categoria: response.categoria,
          ubicacion: response.ubicacion,
          precio: response.precio,
        })
      })
    }
  }


}
