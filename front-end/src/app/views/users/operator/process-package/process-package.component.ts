import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecepService } from '../../others/services/recep.service';
import { GLOBAL } from '../../../GLOBAL';
import { OperatorService } from '../../others/services/operator/operator.service';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-process-package',
  templateUrl: './process-package.component.html',
  styleUrls: ['./process-package.component.scss']
})
export class ProcessPackageComponent implements OnInit {

  id: number;
  description: string;
  weight: number;
  packageId: number;
  checkpointId: number;

  ERROR_REQUIRED = GLOBAL.ERROR_REQUIRED;
  notification : NotificationsComponent;

   //Fomulario reactivo
   formPackage: FormGroup = new FormGroup({
    time: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required)
  });

  constructor(
    private receptionistService: RecepService,
    private operatorService: OperatorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService : NbToastrService
  ) { }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
    this.getPackage();
  }

  public getPackage(){
    this.packageId = Number(this.route.snapshot.paramMap.get('id'));
    this.receptionistService.getPackage(this.packageId).subscribe(response => {
      this.id = response.packages.id;
      this.description = response.packages.description;
      this.weight = response.packages.weight;
      this.checkpointId = response.checkpoint.id;
    })
  }

  public proccessPackage(){
    if(this.formPackage.valid){
      this.operatorService.processPackage({
        checkpoint: {
          id: this.checkpointId
        },
        packages: {
          id: this.packageId
        },
        timeOnCheckpoint: this.formPackage.get('time').value,
        date: this.formPackage.get('date').value,
        currentCheckpoint: Boolean(false)
      }).subscribe({
        next : (res) => {
          setTimeout(() => {
            console.log('Recorriendo cola');
            this.notification.showToast(1, 'Exito', `Paquete procesado exitosamente.`, 3000);
            this.operatorService.processQueue().subscribe({
              next: (res) => {
                console.log('Cola recorrdia: ');
                this.goBack();
              },
              error: (err) => {
                console.log('Error al recorrer la cola');
                console.log(err);
                this.goBack();
              }
            });  
          }, 1000);
        },
        error : (error) => {
          this.notification.showToast(4, 'Error', error.error, 5000);
        }
        
      });
      this.operatorService.processQueue();
    }else{
      this.formPackage.markAllAsTouched();
    }
  }

  public processQueue() {
    
  }

  public goBack(){
    this.router.navigate(['views', 'operator', 'packages-list', this.checkpointId]);
  }

}
