/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.controller;

import com.gt.interpackage.model.Fee;
import com.gt.interpackage.service.FeeService;
import com.gt.interpackage.source.Constants;
import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
 * @author bryan
 */
@CrossOrigin (origins = Constants.URL_FRONT_END, allowCredentials = "true")
@RestController
@RequestMapping (Constants.API_V1 + "/fee")
public class FeeController {
    
    @Autowired
    private FeeService feeService;

    @GetMapping ("/")
    public ResponseEntity<List<Fee>> getAllFees() {
        return ResponseEntity.ok(feeService.findAll());
    }
    
    @GetMapping ("/{id}")
    public ResponseEntity<Fee> getFee(@PathVariable Long id) {
        try {
            Fee fee = feeService.getById(id);
            return fee != null ? 
                    ResponseEntity.ok(fee) :    // 200 OK 
                    ResponseEntity              // 404 Not Found
                        .notFound()
                        .header("Error", "No se encuentra registrado una tarifa con el ID: " + id)
                        .build();
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().build(); // 500 Internal Server Error
        }
    }
    
    @PostMapping ("/") 
    public ResponseEntity<Fee> addFee(@RequestBody Fee fee) {
        try { 
            Fee savedFee = feeService.save(fee);
            return ResponseEntity.created(
                    new URI("/fee/" + savedFee.getId()))
                    .body(savedFee);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        }
    }
    
    @PutMapping ("/{id}")
    public ResponseEntity<Fee> updateFee(@RequestBody Fee update, @PathVariable Long id) {
        try {
            Fee fee = feeService.update(update, id);
            return fee != null ?
                    ResponseEntity.ok(fee) :    // 200 OK 
                    ResponseEntity              // 404 Not Found
                        .notFound()
                        .header("Error", "No se encuentra registrado una tarifa con el ID: " + id)
                        .build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
}
