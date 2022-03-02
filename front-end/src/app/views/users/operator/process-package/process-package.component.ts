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
  checkpointId: number;
  packageCheckpointId: number;

  ERROR_REQUIRED = GLOBAL.ERROR_REQUIRED;
  notification : NotificationsComponent;

   //Fomulario reactivo
   formPackage: FormGroup = new FormGroup({
    time: new FormControl(null, Validators.required),
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
    this.checkpointId = Number(this.route.snapshot.paramMap.get('id'));
    this.receptionistService.getPackage(this.checkpointId).subscribe(response => {
      this.id = response[0].packageId;
      this.description = response[0].description;
      this.weight = response[0].weight
      this.packageCheckpointId = response[0].id
    })
  }

  public proccessPackage(){
    if(this.formPackage.valid){
      this.operatorService.processPackage(this.packageCheckpointId, {
        timeOnCheckpoint: this.formPackage.get('time').value,
        processed: Boolean(true)
      }).subscribe({
        next : (res) => {
          this.notification.showToast(1, 'Exito', `Paquete procesado exitosamente.`, 3000);
          this.goBack();
        },
        error : () => {
          this.notification.showToast(4, 'Error', `Error al procesar el paquete.`, 3000);
        }
      });
    }else{
      this.formPackage.markAllAsTouched();
    }
  }

  public goBack(){
    this.router.navigate(['views', 'operator', 'packages-list', this.checkpointId]);
  }

}
