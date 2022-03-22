import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as global from '../../../GLOBAL';
import { RouteService } from '../../others/services/route/route.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import {
  NbToastrService,
} from '@nebular/theme';
import { OperatorService } from '../../others/services/operator/operator.service';
import { RatesService } from '../../others/services/rates/rates.service';
import { CheckpointService } from '../../others/services/checkpoint/checkpoint.service';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';

@Component({
  selector: 'ngx-create-checkpoint',
  templateUrl: './create-checkpoint.component.html',
  styleUrls: ['./create-checkpoint.component.scss']
})

export class CreateCheckpointComponent implements OnInit {

   @ViewChild("routeLabel") routeLabel: ElementRef;
   @ViewChild("operatorLabel") operatorLabel: ElementRef;
   @ViewChild("operatorsSearchInput") operatorsSearchInput: ElementRef;
   @ViewChild("routesSearchInput") routesSearchInput: ElementRef;
   @ViewChild("rateInput") rateInput: ElementRef;

  //Constantes globales
  ERROR_REQUIRED = global.GLOBAL.ERROR_REQUIRED;
  ERROR_MIN = global.GLOBAL.ERROR_MIN;
  ERROR_NUMBER = global.GLOBAL.ERROR_NUMBER;
  ADMIN_HOME = global.GLOBAL.ADMIN_HOME;

  //Variables para busqueda de rutas
  routesSrc: string;
  routesData: any = null;
  routesLoading: boolean = false;

  //Variables para busqueda de operadores
  operatorsSrc: string;
  operatorsData: any = null;
  operatorsLoading: boolean = false;

  //Variable que almacena la tarifa de operacion global
  globalOperationFee: number;
  customOperationFee: boolean = false;

  notification: NotificationsComponent;

  //Fomulario reactivo
  formCheckpoint: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    route: new FormControl(null, Validators.required),
    routeId: new FormControl(null, null),
    operator: new FormControl(null, Validators.required),
    operatorCUI: new FormControl(null, null),
    fee: new FormControl(null, [ 
      Validators.required, 
      Validators.min(0), 
      Validators.pattern('[0-9]+(.[0-9]+)?')]
    ),
    queueCapacity: new FormControl(null, [ 
      Validators.required, 
      Validators.min(0), 
      Validators.pattern('[0-9]+(.[0-9]+)?')
     ])
  });

  constructor(
    private routeService : RouteService,
    private operatorService: OperatorService,
    private ratesService: RatesService,
    private checkpointService: CheckpointService,
    private toastService: NbToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastService);
    this.ratesService.getOperationFee().subscribe(
      (response) => {
        this.setGlobalOperationFee(response)
        this.rateInput.nativeElement.value = this.globalOperationFee;
        this.formCheckpoint.get('fee').setValue(this.globalOperationFee);
        this.notification.showToast(
          0,
          'Tarifa de Operacion Global',
          `La tarifa de operacion global es de Q` + this.globalOperationFee,
          5000
        ); 
      },
      (error) => {
        this.notification.showToast(3, 'Error', `Hubo un error obteniendo la tarifa de operacion global.`, 5000);
      } 
    );
  }    

  private setGlobalOperationFee(fees){
    for (const iterator of fees) {
      if (iterator['name'] === 'Tarifa por operación') 
        this.globalOperationFee = iterator['fee']
    }
  }

  /**
   * Procedimiento que valida que el form sea valido, de ser 
   * asi llama al metodo create enviando como parametros los 
   * datos obtenidos en el form.
   */
  public createCheckpoint(){
    if(this.formCheckpoint.valid){
      this.create(
        this.formCheckpoint.get('name').value,
        this.formCheckpoint.get('routeId').value,
        this.formCheckpoint.get('operatorCUI').value,
        this.formCheckpoint.get('fee').value,
        this.formCheckpoint.get('queueCapacity').value
      );
    } else{
      this.formCheckpoint.markAllAsTouched();
      return;
    }
  }

  /**
   * Procedimiento que llama al metodo createRoute del servicio 
   * RoutesServices, muestra un mensaje en pantalla segun el exito
   * o fallo de la peticion que manda a realizar.
   * @param checkpointName Nombre de la ruta
   * @param routeDestinationId  Id del destino de la ruta
   */
  private create(checkpointName: string, routeId: number, operatorCUI: number, fee: number, queueCapacity: number){
    this.checkpointService.createCheckpoint({
      description: checkpointName, 
      queueCapacity: queueCapacity,
      operationFee: fee,
      packageOnQueue: 0,
      assignedOperator: operatorCUI,
      route: routeId,
      active: true
    }).subscribe({
      next : (res) => {
        this.notification.showToast(1, 'Exito', `Punto de Control ${checkpointName} creado exitosamente.`, 5000);
        this.formCheckpoint.reset();
        this.router.navigate([this.ADMIN_HOME]);
      },
      error : () => {
        this.notification.showToast(3, 'Error', `Error en la creacion del Punto de Control ${checkpointName}, vuelva a intentarlo.`, 5000);
      }
    });
  }

    /**
   * Procedimiento que llama a la funcion getRoutes del servicio
   * RouteService para obtener todas la rutas que coinciden con 
   * el patron de busqueda que se recibe como parametro. Los datos
   * obtenidos se almacenan en la variable routesData.
   * @param pattern Patron de busqueda
   */
    public searchRoutes(pattern: string){
      if(pattern != ''){
        this.routesLoading = true;
        this.routesData = this.routeService.getRoutes(pattern).pipe(
          finalize(() => this.routesLoading = false)
        );
      } else this.routesData = null;
    }

    /**
   * Procedimiento que llama a la funcion getOperators del servicio
   * OperatorService para obtener todas la rutas que coinciden con 
   * el patron de busqueda que se recibe como parametro. Los datos
   * obtenidos se almacenan en la variable routesData.
   * @param pattern Patron de busqueda
   */
     public searchOperators(pattern: string){
      if(pattern != ''){
        this.operatorsLoading = true;
        this.operatorsData = this.operatorService.getOperators(pattern).pipe(
          finalize(() => this.operatorsLoading = false)
        );
      } else this.operatorsData = null;
    }

  /**
   * Procedimiento que setea el valor del label routeLabel,
   * tambien establece el valor del formControl routeId, por
   * ultimo elimina todos los errores existentes en el formControl
   * route.
   * @param routeId id del destino
   * @param routeName  nombre del destino
   */
  public setRoute(routeId: number, routeName: string){
    this.routeLabel.nativeElement.innerHTML = routeName;
    this.formCheckpoint.get('routeId').setValue(routeId);
    this.formCheckpoint.get('route').setErrors(null)
    this.routesData = null;
    this.routesSearchInput.nativeElement.value = '';
  }

  /**
   * Procedimiento que setea el valor del label operatorLabel,
   * tambien establece el valor del formControl operatorCUI, por
   * ultimo elimina todos los errores existentes en el formControl
   * operator.
   * @param routeId id del destino
   * @param routeName  nombre del destino
   */
      public setOperator(cui: number, name: string, surname: string){
        this.operatorLabel.nativeElement.innerHTML = cui +' - '+ name +" "+ surname;
        this.formCheckpoint.get('operatorCUI').setValue(cui);
        this.formCheckpoint.get('operator').setErrors(null)
        this.operatorsData = null;
        this.operatorsSearchInput.nativeElement.value = '';
      }

    /**
     * Procedimiento que modifica el valor booleano de la variable
     * customOperationFee. 
     */
    public setToogleValue(){
      this.customOperationFee = !this.customOperationFee
      if(!this.customOperationFee){
        this.rateInput.nativeElement.value = this.globalOperationFee;
      }
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