import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as global from '../../../../GLOBAL';
import { RouteService } from '../../../others/services/route/route.service';
import { DestinationService } from '../../../others/services/destination/destination.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { NotificationsComponent } from '../../../others/source/notifications/notifications.component';
import {
  NbToastrService,
} from '@nebular/theme';

@Component({
  selector: 'ngx-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.scss']
})

export class CreateRouteComponent implements OnInit {
  
  @ViewChild("destinationLabel") destinationLabel: ElementRef;
  @ViewChild("destinationSearchInput") destinationSearchInput: ElementRef;

  //Constantes globales
  ERROR_REQUIRED = global.GLOBAL.ERROR_REQUIRED;
  ADMIN_HOME = global.GLOBAL.ADMIN_HOME;

  //Varaiables
  notification: NotificationsComponent;
  isLoading: boolean = false;
  src: string;
  data: any;

  //Fomulario reactivo
  formRoute: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    destination: new FormControl(null, Validators.required),
    destinationId: new FormControl(null, null)
  });

  constructor(
    private routeService : RouteService,
    private destinationService : DestinationService, 
    private toastService: NbToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastService);
  }

  /**
   * Procedimiento que valida que el form sea valido, de ser 
   * asi llama al metodo create enviando como parametros los 
   * datos obtenidos en el form.
   */
  public createRoute(){
    if(this.formRoute.valid){
      this.create(
        this.formRoute.get('name').value,
        this.formRoute.get('destinationId').value
      );
    } else{
      this.formRoute.markAllAsTouched();
      return;
    }
  }

  /**
   * Procedimiento que llama al metodo createRoute del servicio 
   * RoutesServices, muestra un mensaje en pantalla segun el exito
   * o fallo de la peticion que manda a realizar.
   * @param routeName Nombre de la ruta
   * @param routeDestinationId  Id del destino de la ruta
   */
  private create(routeName: string, routeDestinationId: number){
    this.routeService.createRoute({
      name: routeName, 
      packagesOnRoute: 0,
      totalPackages: 0,
      active: false,
      destination: {
        id: routeDestinationId
      } 
    }).subscribe({
      next : (res) => {
        this.notification.showToast(1, 'Exito', `Ruta ${routeName} creada exitosamente.`, 5000);
        this.formRoute.reset();
        this.router.navigate([this.ADMIN_HOME]);
      },
      error : (error) => {
        switch(error.status){
          case 400:
            this.notification.showToast(3, 'Error', error.error , 3000);
            break;

          default:
            this.notification.showToast(3, 'Error', `Error desconocido en la creacion de la ruta: ${routeName}. Verifique los datos ingresados y vuelva a intentarlo.`, 3000);
            break;
        } 
      }
    });
  }

  /**
   * Procedimiento que llama a la funcion getDestinations del servicio
   * DestinationService para obtener todos los destinos que coinciden 
   * con el patron de busqueda que se recibe como parametro. Los datos
   * obtenidos se almacenan en la variable data.
   * @param pattern Patron de busqueda
   */
  public search(pattern: string){
    if(pattern != ''){
      this.isLoading = true;
      this.data = this.destinationService.getDestinations(pattern).pipe(
        finalize(() => this.isLoading = false )
      );
    } else this.data = null;
  }
  
  /**
   * Procedimiento que setea el valor del lable destinationLabel,
   * tambien establece el valor del formControl destinatioId, por
   * ultimo elimina todos los errores existentes en el formControl
   * destination.
   * @param destinationId id del destino
   * @param destinationName  nombre del destino
   */
  public setDestination(destinationId: number, destinationName: string){
    this.destinationLabel.nativeElement.innerHTML = destinationName;
    this.formRoute.get('destinationId').setValue(destinationId);
    this.formRoute.get('destination').setErrors(null)
    this.data = null;
    this.destinationSearchInput.nativeElement.value = '';
  }

  /**
   * Procedimiento que se encarga de establecer el tipo de borde
   * del elemento html que se recibe como parametro.
   * @param event Evento disparado
   */
  public setHoverBorder(event: MouseEvent) {
    const newsImage: HTMLDivElement = <HTMLDivElement>event.target;
    if (event.type === 'mouseenter') {
      newsImage.style.border = 'ridge';
    } else if (event.type === 'mouseleave') {
      newsImage.style.border = 'none';
    }
  }
}