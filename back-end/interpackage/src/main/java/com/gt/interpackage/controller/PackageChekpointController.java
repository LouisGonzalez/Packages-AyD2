package com.gt.interpackage.controller;

import com.gt.interpackage.service.PackageCheckpointService;
import com.gt.interpackage.source.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gt.interpackage.model.PackageCheckpoint;
import java.sql.Time;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author helmuth
 */
@RestController
@RequestMapping(Constants.API_V1 + "/package-checkpoint")
public class PackageChekpointController {
    
    @Autowired
    private PackageCheckpointService packageCheckpointService;
    
    /**
     * Metodo que recibe una peticion de tipo GET para obtener un objeto
     * de tipo PackageChekpoint cuyo id de paquete sea el que se recibe 
     * como parametro. Se modifica el valor del atributo timeOnCheckpoint
     * y se setea dentro del mismo la cantidad de tiempo que el paquete 
     * ha estado en ruta, es decir, la sumatoria de tiempos de cada uno 
     * de los puntos de control registrados.
     * @param id
     * @return 
     */
    @GetMapping("/{id}")
    @CrossOrigin
    public ResponseEntity<PackageCheckpoint> getPackageCheckpoint(@PathVariable Long id){
        try{
            PackageCheckpoint tempPackageCheckpoint = packageCheckpointService.getPackageCheckpoint(id);
            
            String timeOnRoute = packageCheckpointService.getTimeOnRouteByPackageId(id);
            if(timeOnRoute != null)
                tempPackageCheckpoint.setTimeOnCheckpoint(Time.valueOf(timeOnRoute) );
            else
                tempPackageCheckpoint.setTimeOnCheckpoint(new Time(00,00,00));
            
            return ResponseEntity.ok(tempPackageCheckpoint);
        } catch(Exception e){
            return new ResponseEntity("Error en el servidor", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Metodo que recibe una peticion de tipo GET para obtener el tiempo
     * total que un paquete cuyo id de paquete sea el que se recibe 
     * como parametro dentro de la ruta hasta el momento de la peticion.
     * @param id
     * @return 
     */
    @GetMapping("time/{id}")
    @CrossOrigin
    public ResponseEntity<String> getTimeOnRoute(@PathVariable Long id){
        try{
            return ResponseEntity.ok(packageCheckpointService.getTimeOnRouteByPackageId(id));
        } catch(Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity("Error en el servidor", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
}
