/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.service;
import com.gt.interpackage.model.Employee;
import com.gt.interpackage.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import javax.persistence.EntityNotFoundException;
/**
 *
 * @author Luis
 */
@Service
public class AuthService {

    @Autowired
    private AuthRepository _authRepository;
    
    public Employee login(String username, String pass) throws Exception{
        try {
            int a = 2+2;
            Employee emp2 = _authRepository.findByLogin(username, pass);
            //if(emp2.getName() != null){}
            return emp2;
        } catch(EntityNotFoundException e){
            return null;
        }
    }
    
}
