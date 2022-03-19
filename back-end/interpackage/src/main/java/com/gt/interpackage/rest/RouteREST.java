package com.gt.interpackage.rest;

import com.gt.interpackage.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gt.interpackage.model.Route;
import java.net.URI;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
/**
 *
 * @author helmuth
 */
@RestController
@RequestMapping("/routes")
public class RouteREST {
    
    @Autowired
    private RouteService routeService;
    
    @CrossOrigin
    @PostMapping
    private ResponseEntity<Route> createRoute(@RequestBody Route route){
        try{
            if(routeService.exists(route.getName()))
                return new ResponseEntity("Nombre de ruta ya registrado en el sistema", HttpStatus.BAD_REQUEST);
                
            if(route.getName().isBlank() || route.getName().isEmpty() )
                return new ResponseEntity("Nombre de ruta no valido", HttpStatus.BAD_REQUEST);
                
            Route tempRoute = routeService.create(route);
            return ResponseEntity.created(new URI("/routes/"+tempRoute.getId())).body(tempRoute);
        } catch(Exception e){
            return new ResponseEntity("Error en la creacion de la ruta " +route.getName()+ "Vuevla a intentarlo" , HttpStatus.BAD_REQUEST);
        }
    }
    
}
