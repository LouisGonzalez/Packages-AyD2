/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.controller;

import com.gt.interpackage.model.Destination;
import com.gt.interpackage.service.DestinationService;
import com.gt.interpackage.source.Constants;
import java.net.URI;
import java.net.URISyntaxException;
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
            return service(destination, false, null);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build(); // 400 Bad Request
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
    
    public ResponseEntity<Destination> service(Destination destination, boolean update, Long id) throws URISyntaxException, Exception {
        if (destination != null) {
            if (destination.getFee() == null || destination.getName() == null || destination.getName().isEmpty() || destination.getName().isBlank()) {
                return ResponseEntity
                        .badRequest()
                        .header("Error", "Todos los campos son obligatorios.")
                        .build();
            } else {
                if (destination.getFee() < 0) {
                     return ResponseEntity
                        .badRequest()
                        .header("Error", "La tarifa debe de ser mayor a 0.")
                        .build();
                } else {
                    if (update) {
                        // Agregar metodo para el update
                        return null;
                    } else {
                        Destination savedDestination = destinationService.save(destination);
                        return ResponseEntity
                                .created (
                                        new URI("/fee/" + savedDestination.getId()))
                                .body(savedDestination);
                    }
                }
            }
        } 
        return ResponseEntity.badRequest().build();
    }
}
