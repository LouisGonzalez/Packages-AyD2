package com.gt.interpackage.controller;

import com.gt.interpackage.model.Checkpoint;
import com.gt.interpackage.service.CheckpointService;
import com.gt.interpackage.service.EmployeeService;
import com.gt.interpackage.service.RouteService;
import com.gt.interpackage.source.Constants;
import com.gt.interpackage.utils.RequestType;
import com.gt.interpackage.model.Employee;
import com.gt.interpackage.service.EmployeeTypeService;
import java.net.URI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 *
 * @author helmuth
 */
@RestController
@RequestMapping(Constants.API_V1 + "/checkpoint")
public class CheckpointController {
    
    @Autowired
    private CheckpointService checkpointService;
    
    @Autowired
    private RouteService routeService;
    
    @Autowired 
    private EmployeeService employeeService;
    
    @Autowired
    private EmployeeTypeService employeeTypeService;
    
    /**
     * Metodo que recibe una peticion POST para la creacion de un punto
     * de control. Llama al metodo execute para realizar validaciones y
     * ejecutar la creacion del punto de control. 
     * @param checkpoint Punto de control a crear.
     * @return 
     */
    @CrossOrigin
    @PostMapping
    public ResponseEntity<Checkpoint> createCheckpoint(@RequestBody Checkpoint checkpoint){
        return execute(checkpoint, RequestType.SAVE, null);
    }
    
    private ResponseEntity<Checkpoint> execute(Checkpoint checkpoint, RequestType type, Long id){
        try{
            if(checkpoint.getDescription() == null || checkpoint.getQueueCapacity() == null || checkpoint.getAssignedOperator().getCUI() == null
            || checkpoint.getActive() == null || checkpoint.getRoute().getId() == null || checkpoint.getOperationFee() == null)
                return new ResponseEntity("Todos los campos son obligatorios.", HttpStatus.BAD_REQUEST);
            
            if(checkpoint.getDescription().isEmpty() || checkpoint.getDescription().isBlank())
                return new ResponseEntity("Nombre de punto de control no valido.", HttpStatus.BAD_REQUEST);

            if(checkpointService.routeAlreadyHasACheckpointWithName(checkpoint.getRoute().getId(), checkpoint.getDescription()))
                return new ResponseEntity("Nombre de punto de control ya registrado en la ruta seleccionada.", HttpStatus.BAD_REQUEST);

            if(!routeService.existsById(checkpoint.getRoute().getId()))
                return new ResponseEntity("La ruta seleccionada no existe en el sistema.", HttpStatus.BAD_REQUEST);

            Employee employee = employeeService.getByCUI(checkpoint.getAssignedOperator().getCUI());
            if(employee == null)
                return new ResponseEntity("El operador seleccionada no existe en el sistema.", HttpStatus.BAD_REQUEST);

            if(employeeTypeService.getEmployeeTypeByName("operator").getId() != Long.parseLong(employee.getType().toString()))
              return new ResponseEntity("El empleado seleccionada no es un operador.", HttpStatus.BAD_REQUEST);
            
            if(type == RequestType.SAVE){
                Checkpoint tempCheckpoint = checkpointService.create(checkpoint);
                return ResponseEntity.created(new URI("/checkpoint/"+tempCheckpoint.getId())).body(tempCheckpoint);
            } 
                
            //Agregar la parte de actualizacion y retornar el valor correspodiente
            return null;
            
        } catch(Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity("Error en el servidor.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
