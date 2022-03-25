package com.gt.interpackage.service;

import com.gt.interpackage.repository.EmployeeTypeRepository;
import com.gt.interpackage.model.EmployeeType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
/**
 *
 * @author helmuth
 */
@Service
public class EmployeeTypeService {
    
    @Autowired
    private EmployeeTypeRepository employeeTypeRepository;
    
    /**
     * Metodo que hace uso del repositorio de tipos de empleado para obtener un objeto
     * de tipo EmployeeType en base al nombre que se recibe como parametro.
     * @param name
     * @return 
     */
    public EmployeeType getEmployeeTypeByName(String name){
        return employeeTypeRepository.findByName(name).get();
    }
    
}
