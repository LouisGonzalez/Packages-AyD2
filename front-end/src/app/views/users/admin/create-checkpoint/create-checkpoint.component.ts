import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as global from '../../../GLOBAL';
import { RouteService } from '../../others/services/route/route.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
  NbToastrConfig
} from '@nebular/theme';
import { OperatorService } from '../../others/services/operator/operator.service';
import { RatesService } from '../../others/services/rates/rates.service';
import { CheckpointService } from '../../others/services/checkpoint/checkpoint.service';

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

  //Varaiables
  config: NbToastrConfig;
  index = 1;
  
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
    this.ratesService.getOperationFee().subscribe(
      (response) => {
        this.globalOperationFee = response[0].rate;
        this.rateInput.nativeElement.value = this.globalOperationFee;
        this.formCheckpoint.get('fee').setValue(this.globalOperationFee);
        this.showToast(
          'primary',
          'Tarifa de Operacion Global',
           `La tarifa de operacion global es de Q` + this.globalOperationFee
        ); 
      },
      (error) => {
        this.showToast('warning', 'Error', `Hubo un error obteniendo la tarifa de operacion global.`);
      } 
    );
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
      packagesOnQueue: 0,
      assignedOperator: operatorCUI,
      route: routeId,
      active: true
    }).subscribe({
      next : (res) => {
        this.showToast('success', 'Exito', `Punto de Control ${checkpointName} creado exitosamente.`);
        this.formCheckpoint.reset();
        this.router.navigate([this.ADMIN_HOME]);
      },
      error : () => {
        this.showToast('warning', 'Error', `Error en la creacion del Punto de Control ${checkpointName}, vuelva a intentarlo.`);
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

     /**
   * Procedimiento que muestra en pantalla un Toast
   * @param type Tipo de toast a mostrar.
   * @param title Titulo del toast
   * @param body Cuerpo del toast
   */
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };

    const titleContent = title ? `${title}` : '';
    this.index += 1;
    this.toastService.show(
      body,
      `${titleContent}`,
      config);
  }

}