package com.gt.interpackage.service;

import com.gt.interpackage.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import com.gt.interpackage.model.Employee;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
/**
 *
 * @author Luis
 */
@Service
public class EmployeeService {
       
    @Autowired
    private EmployeeRepository _empRepository;
    
    public List<Employee> findAll(){
        return _empRepository.findAll();
    }
    
    public Employee getByCUI(Long CUI) throws Exception {
        try {
            Employee emp = _empRepository.getById(CUI);
            if(emp.getName() != null){  }
            return emp;
        } catch(EntityNotFoundException e){
            return null;
        }
    }
        
    public <S extends Employee> S save(S entity){
        return _empRepository.save(entity);
    }
    
    public <S extends Employee> Employee update(S entity, Long CUI) throws Exception{
        Employee emp = getByCUI(CUI);
        if(emp != null){
            emp.setEmail(entity.getEmail());
            emp.setEmployeeType(entity.getEmployeeType());
            emp.setLastName(entity.getLastName());
            emp.setName(entity.getName());
            emp.setPassword(entity.getPassword());
            return _empRepository.save(emp);
        } return null;
    }
    
    /**
     * Metodo que llama al repositorio de empleados para obtener todos aquellos 
     * empleados cuyo CUI inicie con el patron que se recibe como parametro.
     * @param cui
     * @param employeeType
     * @return Listado de rutas obtenidas. 
     */
    public Optional<List<Employee>> getAllOperatorsByCUI(String cui, Integer employeeType){
        return _empRepository.findByCuiContainsAndEmployeeTypeIs(cui, employeeType);
    }
    
}
