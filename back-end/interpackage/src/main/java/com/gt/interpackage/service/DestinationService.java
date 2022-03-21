package com.gt.interpackage.service;

import com.gt.interpackage.repository.DestinationRepository;
import com.gt.interpackage.model.Destination;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
/**
 * @author bryan
 * @author helmuth
 */
@Service
public class DestinationService {
    
    @Autowired
    private DestinationRepository destinationRepository;
    
    public <S extends Destination> S save(S entity) {
        return destinationRepository.save(entity);
    }
    
    /**
    * Metodo que llama al repositorio de destinos para obtener todas aquellos 
    * rutas cuyo nombre inicie con el nombre que se recibe como parametro.
    * @param name
    * @return Listado de destinos obtenidos. 
    */
    public List<Destination> findByName(String name){
        return destinationRepository.findByNameStartingWith(name);
    }
}
