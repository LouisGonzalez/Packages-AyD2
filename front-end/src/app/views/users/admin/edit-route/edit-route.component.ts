import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as global from '../../../GLOBAL';
import { RouteService } from '../../others/services/route/route.service';
import { DestinationService } from '../../others/services/destination/destination.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { Location } from '@angular/common';
import {
  NbToastrService,
} from '@nebular/theme';
import { Route } from '../../others/models/Route';

@Component({
  selector: 'ngx-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.scss']
})

export class EditRouteComponent implements OnInit {
  
  @ViewChild("destinationLabel") destinationLabel: ElementRef;
  @ViewChild("destinationSearchInput") destinationSearchInput: ElementRef;
  @ViewChild("activeToggle") activeToggle: ElementRef;
  //Constantes globales
  ERROR_REQUIRED = global.GLOBAL.ERROR_REQUIRED;

  //Varaiables
  notification: NotificationsComponent;
  isLoading: boolean = false;
  src: string;
  data: any;

  routeId: number;
  packagesOnRoute: number;
  totalPackages: number;

  //Fomulario reactivo
  formRoute: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    destination: new FormControl(null, Validators.required),
    destinationId: new FormControl(null, null),
    active: new FormControl(null, null)
  });

  constructor(
    private routeService : RouteService,
    private destinationService : DestinationService, 
    private toastService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastService);
    this.getRoute();
  }
  
  private getRoute() {
    this.routeId = Number(this.route.snapshot.paramMap.get('id'));
    this.routeService.getRoute(this.routeId).subscribe({
      next:(res) => {
        this.formRoute.controls['name'].setValue(res.name);
        this.formRoute.controls['destination'].setValue(res.destinationId);          
        this.formRoute.controls['destinationId'].setValue(res.destinationId);
        this.formRoute.controls['active'].setValue(res.active);
        this.destinationLabel.nativeElement.innerHTML = res.destinationId;
        this.activeToggle.nativeElement.checked = Boolean(res.active);
        this.totalPackages = res.totalPackages;
        this.packagesOnRoute = res.packagesOnRoute;
      }, 
      error:(err) => {
        this.notification.showToast(3, 'Error', 'Hubo un error obteniendo los datos de la ruta.', 3000);
        setTimeout(() => {
          this.location.back();
        }, 2000);
      }
    })
  }


  /**
   * Procedimiento que valida que el form sea valido, de ser 
   * asi llama al metodo create enviando como parametros los 
   * datos obtenidos en el form.
   */
  public updateRoute(){
    if(this.formRoute.valid){
      this.update(
        this.formRoute.get('name').value,
        Number(this.formRoute.get('destinationId').value),
        Boolean(this.formRoute.get('active').value)
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
  private update(routeName: string, routeDestinationId: number, active: boolean){
    let route : Route = {
      name: routeName,
      destinationId: routeDestinationId,
      active: active,
      packagesOnRoute: this.packagesOnRoute,
      totalPackages: this.totalPackages
    };
    this.routeService.putRoute(route, this.routeId).subscribe({
      next : (res) => {
        this.notification.showToast(1, 'Exito', `Ruta ${routeName} modificada exitosamente.`, 5000);
        this.formRoute.reset();
        this.goBack();
      },
      error : () => {
        this.notification.showToast(3, 'Error', `Error en la modificacion de la ruta: ${routeName}, vuelva a intentarlo.`, 5000);
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

  public setActiveValue(){
    this.formRoute.controls['active'].setValue(!Boolean(this.formRoute.get('active').value));
    console.log(this.formRoute.get('active').value);
  }

  public goBack() {
    this.formRoute.reset();
    this.router.navigate(['views', 'admin', 'route-list'])
  }
}