import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuModel } from 'src/app/models/menuModel';
import { EstablishmentsService } from '../../services/establishments.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  public idEstablishment;
  public formProduct: FormGroup;
  public requestProduct: any;
  public loading:boolean = false;
  public date:any;
  public categoryMenuProduct = [];
  constructor(private establishmentService: EstablishmentsService, private router:Router, private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.idEstablishment = this.route.snapshot.paramMap.get('id');
    this,this.loadCategoryMenu();
    this.formProduct = new FormGroup({
      name: new FormControl('', [Validators.required]),
      categoryMenu: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      sideDish: new FormControl('', [Validators.required]),
    });
  }

  public loadCategoryMenu(){
    this.categoryMenuProduct = [
      {'name':'Principal', 'id': 1},
      {'name':'Combo', 'id': 2},
      {'name':'Promoção', 'id': 3},
      {'name':'Mais Pedidos', 'id': 4},
      {'name':'Gerais', 'id': 5}
    ];
  }

  submit(){
    let idCategoryMenuProduct;
    idCategoryMenuProduct = this.categoryMenuProduct.find(f =>
      f.id == +this.formProduct.get('categoryMenu').value
    );

    if (this.formProduct.valid) {
      this.date = Date.now();
      this.requestProduct = {
        price: this.formProduct.get('price').value,
        sideDish:this.formProduct.get('sideDish').value,
        name: this.formProduct.get('name').value,
        description: this.formProduct.get('description').value,
        statusActive:true,
        categoryMenu:idCategoryMenuProduct.name,
        urlImage:"",
        dateCreated:this.date,
        dateUpdate:this.date
    }
    console.log(this.requestProduct);
    this.loading = true;
    setTimeout(()=>{                           
      this.sendProduct(this.requestProduct);
  }, 3000);
  }
  else {
    console.error("ERRO DE VALIDAÇÃO DO FORMULARIO")
  }

}

sendProduct(product:MenuModel){
  this.establishmentService.createProduct(product, this.idEstablishment);
  this.loading = false;
  this.router.navigate(['establishments/detail/'+ this.idEstablishment]);
}

}