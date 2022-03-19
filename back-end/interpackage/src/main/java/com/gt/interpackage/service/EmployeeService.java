/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.service;

import com.gt.interpackage.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import com.gt.interpackage.model.Employee;
import java.net.URI;
import java.util.List;
import javax.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
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
    
}
