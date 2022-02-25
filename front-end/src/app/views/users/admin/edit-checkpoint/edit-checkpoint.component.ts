import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { NbToastrService } from '@nebular/theme';
import { CheckpointsService } from '../../others/services/checkpoint/checkpoints.service';
import { Checkpoint } from '../../others/models/Checkpoint';

@Component({
  selector: 'ngx-edit-checkpoint',
  templateUrl: './edit-checkpoint.component.html',
  styleUrls: ['./edit-checkpoint.component.scss']
})
export class EditCheckpointComponent implements OnInit {

  notification : NotificationsComponent;
  data;

  constructor( 
    private route: ActivatedRoute,
    private location: Location,
    private toastrService: NbToastrService,
    private api : CheckpointsService) { }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
    this.getCheckpoint();
  }

  private getCheckpoint() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Este es el ID: ' + id);    
    this.api.getCheckpoint(id)
    .subscribe({
      next:(res) => {
        this.data = res;
        if (parseInt(this.data['packageOnQueue']) > 0) {
          this.notification.showToast(4, "Error", "Error no se puede editar el punto de control porque tiene paquetes en cola", 3000);
          this.location.back();
        }
      }
    });
  }

}
