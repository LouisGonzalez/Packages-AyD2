import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
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

  notification : NotificationsComponent;

  constructor (
    private receptionistService : RecepService, 
    private router : Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
    this.receptionistService.getPackageInfo(Number(this.route.snapshot.paramMap.get('id'))).subscribe({
      next:(res) => {
        this.description = res.description;
        this.currentCheckpoint = res.currentCheckpoint;
        this.timeOnRoute = res.timeOnRoute;
      }, 
      error:(err) => {
        this.notification.showToast(3,'Error', 'Hubo un error obteniendo la informacion del paquete.', 3000);
      }
    })
  }

  onClose() {
    this.router.navigate(['views', 'recep' , 'trace-package']);
  }
}
