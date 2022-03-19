package com.gt.interpackage.service;

import com.gt.interpackage.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gt.interpackage.model.Route;
import java.util.List;
import java.util.Optional;
/**
 *
 * @author helmuth
 */
@Service
public class RouteService {
    
    @Autowired
    private RouteRepository routeRepository; 
    
    /**
     * Metodo que llama al repositorio de rutas para crear una nueva ruta.
     * @param route
     * @return Ruta creada.
     */
    public Route create(Route route){
        return routeRepository.save(route);
    }
    
    /**
     * Metodo que llama al repositorio de rutas para obtener todas aquellas 
     * rutas cuyo nombre inicie con el nombre que se recibe como parametro.
     * @param name
     * @return Listado de rutas obtenidas. 
     */
    public Optional<List<Route>> getAllByName(String name){
        return routeRepository.findByNameStartingWith(name);
    }
    
    /**
     * Metodo que llama al repositorio de rutas para consultar si existe una
     * ruta cuyo nombre sea el  parametro que se recibe.
     * @param name
     * @return True o False. 
     */
    public boolean exists(String name){
        return routeRepository.existsRouteByName(name);
    }
    
}
