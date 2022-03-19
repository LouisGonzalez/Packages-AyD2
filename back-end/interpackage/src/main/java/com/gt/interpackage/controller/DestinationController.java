/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.controller;

import com.gt.interpackage.model.Destination;
import com.gt.interpackage.service.DestinationService;
import com.gt.interpackage.source.Constants;
import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author bryan
 */
@CrossOrigin (origins = Constants.URL_FRONT_END, allowCredentials = "true")
@RestController
@RequestMapping (Constants.API_V1 + "/destination")
public class DestinationController {
    
    @Autowired
    private DestinationService destinationService;
    
    @PostMapping ("/")
    public ResponseEntity<Destination> addDestination(@RequestBody Destination destination) {
        try { 
            Destination savedFee = destinationService.save(destination);
            return ResponseEntity.created(
                    new URI("/destination/" + savedFee.getId()))
                    .body(savedFee);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        }
    }
    
    /**
     * Metodo que realiza una llamada al servicio de destinos para obtener todos los 
     * destinos cuyo nombre inicie con el nombre que se recibe como parametro.
     * @param name
     * @return Listado de destinos encontrados | Error 400
     */
    @GetMapping(value ="/search-by-name/{name}")
    public ResponseEntity<List<Destination>> getDestinationByName(@PathVariable String name){
        try{
            return ResponseEntity.ok(destinationService.findByName(name));
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
