package com.gt.interpackage.controller;

import com.gt.interpackage.model.EmployeeType;
import com.gt.interpackage.service.EmployeeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
/**
 *
 * @author helmuth
 */
@Component
public class EmployeeTypeControlller {
    
    @Autowired
    private EmployeeTypeService employeeTypeService;
    
    /**
     * Metodo que se ejecuta al momento de iniciar la aplicacion.
     * Establece y hace uso del servicio de tipos de empleado para
     * crear los tipos de empleados de la aplicacion.
     * @param event 
     */
    @EventListener
    public void insertEmployeeTypes(ApplicationReadyEvent event){
    /*    employeeTypeService.deleteAllTypes();
        employeeTypeService.create( new EmployeeType(new Long(1), "administrator", "Administrador"));
        employeeTypeService.create( new EmployeeType(new Long(2), "operator", "Operador"));
        employeeTypeService.create( new EmployeeType(new Long(3), "receptionist", "Recepcionista"));*/
    }
   
}
