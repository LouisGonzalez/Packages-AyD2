package com.gt.interpackage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gt.interpackage.repository.CheckpointRepository;
/**
 *
 * @author helmuth
 */
@Service
public class CheckpointService {
    
    @Autowired
    private CheckpointRepository checkpointRepository;
    
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
    
}
