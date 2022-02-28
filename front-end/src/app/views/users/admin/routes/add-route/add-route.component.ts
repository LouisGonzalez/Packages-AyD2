import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Route } from '../../../others/models/Route';

@Component({
  selector: 'ngx-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent implements OnInit {

  destinationForm: FormGroup;
  checkpointForm: FormGroup;

  nameForm : FormGroup = new FormGroup ({
    name : new FormControl('', [
      Validators.required
    ])
  });

  route: Route = new Route();

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    




    this.destinationForm = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.checkpointForm = this.formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });

  }

  onNameSubmit() {
    this.nameForm.markAsDirty();   
    console.log(this.nameForm.value.name);
    this.route.description = this.nameForm.value.name;
  }

  onDestinationSubmit() {
    this.destinationForm.markAsDirty();
  }

  onCheckpointsSubmit(){
    this.checkpointForm.markAsDirty();
  }

  goHome(){
    this.router.navigateByUrl('views/users/admin');
  }
}

