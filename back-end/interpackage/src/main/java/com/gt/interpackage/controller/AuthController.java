/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.controller;


import com.gt.interpackage.model.Auth;
import com.gt.interpackage.model.Employee;
import com.gt.interpackage.service.AuthService;
import com.gt.interpackage.source.Constants;
import com.gt.interpackage.utils.JWTUtil;
import java.net.URI;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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

@CrossOrigin(origins = Constants.URL_FRONT_END, allowCredentials = "true")
@RestController
@RequestMapping (Constants.API_V1 + "/auth")
public class AuthController {
    
    @Autowired
    private AuthService _authService;
    
    @Autowired
    private JWTUtil _jwtUtil;
    
    @PostMapping("/login")
    public ResponseEntity<Auth> login(@RequestBody Employee empRequest){
        Employee empLogg;
        System.out.println("datos recibidos: "+empRequest+"         asdfa   "+empRequest.getUsername());
        try {
            System.out.println("Hola mundo");
            empLogg = _authService.login(empRequest.getUsername(), empRequest.getPassword());
            if(empLogg != null){
                String tokenJwt = _jwtUtil.create(String.valueOf(empLogg.getCUI()), empLogg.getUsername());
                Auth authUser = new Auth(tokenJwt, empLogg);
                return authUser != null ?
                        ResponseEntity.ok(authUser) :
                        ResponseEntity
                            .notFound()
                            .header("Error", "Mala insercion de credenciales, porfavor intente otra vez")
                            .build();
            }
            System.out.println("Entro aqui");
            return ResponseEntity.internalServerError().build();
        } catch (Exception ex) {
            System.out.println("Entro a la excepcion");
            return ResponseEntity.internalServerError().build();
        }
    }
    
}
