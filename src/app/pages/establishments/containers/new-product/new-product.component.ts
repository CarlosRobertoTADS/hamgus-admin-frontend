import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuModel } from 'src/app/models/menuModel';
import { ImageService } from 'src/app/shared/image/services/image.service';
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
  public imageUploaded;
  public timestamp;
  public urlImage;
  public imagePreview;
  constructor(private uploadService: ImageService, private establishmentService: EstablishmentsService, private router:Router, private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.idEstablishment = this.route.snapshot.paramMap.get('id');
    this,this.loadCategoryMenu();
    this.formProduct = new FormGroup({
      name: new FormControl('', [Validators.required]),
      categoryMenu: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      sideDish: new FormControl('', [Validators.required]),
      urlImage:new FormControl('', [Validators.required])
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
        urlImage:this.urlImage,
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
  this.uploadService.fileUploadProducts(this.imageUploaded, this.timestamp);
  this.loading = false;
  this.router.navigate(['establishments/detail/'+ this.idEstablishment]);
}

receiveImage(file){
  const urlAws = 'https://hamgus-products-assets.s3.us-east-2.amazonaws.com/';
  const current = new Date();
  const timestamp = current.getTime();
  this.imageUploaded = file;
  this.timestamp = timestamp;
  this.urlImage = urlAws + this.imageUploaded.name + timestamp;
  this.formProduct.controls['urlImage'].setValue(this.urlImage);
  // console.log(file);
}

}