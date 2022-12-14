import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstablishmentModel } from 'src/app/models/establishment';
import { EstablishmentsService } from '../../services/establishments.service';

@Component({
  selector: 'app-new-establishment',
  templateUrl: './new-establishment.component.html',
  styleUrls: ['./new-establishment.component.css']
})
export class NewEstablishmentComponent implements OnInit {

  public formEstablishment: FormGroup;
  public requestEstablishment: any;
  public loading:boolean = false;
  public date:any;
  constructor(private establishmentService: EstablishmentsService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.formEstablishment = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      typeEstablishment: new FormControl('', [Validators.required]),
      typeRestaurant: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required])
    });

  }

  submit() {
    if (this.formEstablishment.valid) {
      this.date = Date.now();
      this.requestEstablishment = {
        city: this.formEstablishment.get('city').value,
        country:"Brasil",
        district:this.formEstablishment.get('district').value,
        idCategoryRestaurant: 1,
        idTypeRestaurant: 1,
        name: this.formEstablishment.get('name').value,
        cnpj: this.formEstablishment.get('cnpj').value,
        number:this.formEstablishment.get('number').value,
        state:this.formEstablishment.get('state').value,
        statusActive:true,
        street:this.formEstablishment.get('street').value,
        typeEstablishment:this.formEstablishment.get('typeEstablishment').value,
        typeRestaurant:this.formEstablishment.get('typeRestaurant').value,
        uf:"",
        urlImage:"",
        zipcode:this.formEstablishment.get('zipcode').value,
        dateCreated:this.date
    }
      console.log(this.requestEstablishment)
      this.loading = true;
      setTimeout(()=>{                           
        this.sendEstablishment(this.requestEstablishment);
    }, 3000);
       
    }
    else {
      console.error("ERRO DE VALIDAÇÃO DO FORMULARIO")
    }
  }

  sendEstablishment(establishment){
    this.establishmentService.create(establishment);
    this.loading = false;
    this.router.navigate(['establishments']);
  }

}
