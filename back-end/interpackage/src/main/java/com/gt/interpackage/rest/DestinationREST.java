package com.gt.interpackage.rest;

import com.gt.interpackage.service.DestinationService;
import com.gt.interpackage.model.Destination;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 *
 * @author helmuth
 */
@RestController
@RequestMapping("/destinations")
public class DestinationREST {
    
    @Autowired
    private DestinationService destinationService;
    
    /**
     * Metodo que realiza una llamada al servicio de destinos para obtener todos los 
     * destinos cuyo nombre inicie con el nombre que se recibe como parametro.
     * @param name
     * @return Listado de destinos encontrados | Error 400
     */
    @CrossOrigin 
    @GetMapping(value ="/search-by-name/{name}")
    public ResponseEntity<List<Destination>> getDestinationByName(@PathVariable String name){
        try{
            return ResponseEntity.ok(destinationService.findByName(name));
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
