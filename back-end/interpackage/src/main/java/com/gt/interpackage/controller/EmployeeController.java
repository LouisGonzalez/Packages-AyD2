package com.gt.interpackage.controller;

import com.gt.interpackage.model.Employee;
import com.gt.interpackage.repository.EmployeeRepository;
import com.gt.interpackage.service.EmployeeService;
import com.gt.interpackage.service.EmployeeTypeService;
import com.gt.interpackage.source.Constants;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Luis
 */
@CrossOrigin (origins = Constants.URL_FRONT_END, allowCredentials = "true")
@RestController
@RequestMapping (Constants.API_V1 + "/employee")
public class EmployeeController {
    
    @Autowired
    private EmployeeService _employeeService;
    
    @Autowired
    private EmployeeTypeService employeeTypeService;
        
    @GetMapping("/")
    public ResponseEntity<List<Employee>> getAllEmployees(){
        return ResponseEntity.ok(_employeeService.findAll());
    }
    
    @PostMapping ("/")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee emp){
        try{
            Employee savedEmp = _employeeService.save(emp);
            return ResponseEntity.created(
            new URI("/employee/"+savedEmp.getCui()))
                    .body(savedEmp);
        } catch(Exception e){
            return ResponseEntity.badRequest().build(); //404 Bad Request
        }
    }

    @PutMapping ("/{cui}")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee empUpdate, @PathVariable Long cui){
        try {
            Employee emp = _employeeService.update(empUpdate, cui);
            return emp != null ?
                    ResponseEntity.ok(emp) :
                    ResponseEntity
                        .notFound()
                        .header("Error", "No se encuentra registrado un empleado con el CUI: "+cui)
                        .build();
        } catch(Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }
    
      /**
     * Metodo que realiza una llamada al servicio de empleados para obtener todos los 
     * operadores cuyo cui inicie con el nombre que se recibe como parametro.
     * @param cui
     * @return Listado de rutas encontradas | Error 400
     */
    @CrossOrigin
    @GetMapping(value ="/search-by-cui/{cui}")
    public ResponseEntity<List<Employee>> getOperatorsByCUI(@PathVariable String cui){
        try{
            Long operatorTypeId = employeeTypeService.getEmployeeType("operator").getId();
            Optional<List<Employee>> operators = _employeeService.getAllOperatorsByCUI(cui, Integer.valueOf(operatorTypeId.toString()));
            return  ResponseEntity.ok(operators.get());   
        } catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
}
