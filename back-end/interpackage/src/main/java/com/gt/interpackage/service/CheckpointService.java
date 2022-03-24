package com.gt.interpackage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gt.interpackage.repository.CheckpointRepository;
import com.gt.interpackage.model.Checkpoint;
/**
 *
 * @author helmuth
 */
@Service
public class CheckpointService {
    
    @Autowired
    private CheckpointRepository checkpointRepository;
    
     
    /**
     * Metodo que llama al repositorio de puntos de control para crear un nuevo punto de control.
     * @param checkpoint 
     * @return Punto de control creado.
     */
    public Checkpoint create(Checkpoint checkpoint){
        return checkpointRepository.save(checkpoint);
    }
    
    /**
     * Metodo que llama al repositorio de puntos de control para buscar
     * si existe un punto de control cuyo id de ruta sea igual al que se 
     * recibe como parametro.
     * @param routeId 
     * @return  True | False
     */
    public boolean routeHasCheckpointsAssigned(Long routeId){
        return checkpointRepository.existsCheckpointByRouteId(routeId);
    }
    
    /**
     * Metodo que llama al repositorio de puntos de control para buscar
     * si existe un punto de control cuyo id de ruta y descripcion sean
     * iguales a los parametros que se reciben.
     * @param routeId 
     * @return  True | False
     */
    public boolean routeAlreadyHasACheckpointWithName(Long routeId, String description){
        return checkpointRepository.existsCheckpointByRouteIdAndDescription(routeId, description);
    }
    
}
