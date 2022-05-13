import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { TemperatureHumidityService } from '../../../../@core/mock/temperature-humidity.service';
import { RecepService } from '../../others/services/recep.service';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';

@Component({
  selector: 'ngx-package-info',
  templateUrl: './package-info.component.html',
  styleUrls: ['./package-info.component.scss']
})

export class PackageInfoComponent implements OnInit {

  description: string;
  currentCheckpoint: string;
  timeOnRoute: string;
  routeName: string
  total: number;
  weight: number;

  notification : NotificationsComponent;

  constructor (
    private receptionistService : RecepService, 
    private router : Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.setPackageInfo(id);
  }

  private setPackageInfo(id: number){
    this.receptionistService.getPackageInfo(id).subscribe({
      next:(res) => {
        console.log(res)
        this.description = res.packages.description;
        this.currentCheckpoint = res.checkpoint.description;
        this.timeOnRoute = res.timeOnCheckpoint;
        this.routeName = res.checkpoint.route.name;
        this.total = res.packages.invoice.total;
        this.weight = res.packages.weight;
      }, 
      error:(err) => {
        this.notification.showToast(3,'Error', 'Hubo un error obteniendo la informacion del paquete.', 3000);
      }
    })
  }
   
  public onClose() {
    this.router.navigate(['views', 'recep' , 'trace-package']);
  }
}
