/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.controller;

import com.gt.interpackage.model.Destination;
import com.gt.interpackage.service.DestinationService;
import com.gt.interpackage.source.Constants;
import java.net.URI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
}
