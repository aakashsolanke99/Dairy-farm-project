import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export class Customer{
  address:any;
  bill:any;
  checkDate:any;
  contactNo:any;
  customerName:any;
  delivered:any;
  emailId:any;
  idOfSociety:any;
  milkType:any;
  outStandingBill:any;
  quantity:any;
  rate:any;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{

  customerForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private customerService : CustomerService, private router : Router) {
    
    this.customerForm = this.formBuilder.group({
      costumerName: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      emailId: ['', [Validators.email]],
      address: [''],
      milkType: [''],
      quantity: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

   customer:Customer=new Customer();

  onSubmit() {
    this.submitted = true;

    if (this.customerForm.invalid) {
      // return;
    }

    // Submit the form data to your service
    this.customerService.customer(this.customer)
      .subscribe(
        response => {
          this.success = true;
          console.log('Form submitted successfully. Response:', response);
           this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Form submission error:', error);
        }
      );
  }


}
