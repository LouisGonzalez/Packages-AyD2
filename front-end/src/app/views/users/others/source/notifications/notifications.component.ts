import { Component, OnInit } from '@angular/core';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from '@nebular/theme';

@Component({
  selector: 'ngx-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

   /** Toastr */
   config: NbToastrConfig;

   index = 1;
   destroyByClick = true;
   duration = 2500;
   hasIcon = true;
   position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
   preventDuplicates = false;
 
   types: NbComponentStatus[] = [
     'primary',
     'success',
     'info',
     'warning',
     'danger',
   ];

  constructor(private toastrService: NbToastrService) { }

  ngOnInit(): void {
  }

  showToast(typeNotification, title: string, body: string, durationNotification) {
    let type: NbComponentStatus;
    type = this.types[typeNotification];
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: durationNotification,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

}
