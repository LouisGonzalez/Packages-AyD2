package com.gt.interpackage.service;

import com.gt.interpackage.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gt.interpackage.model.Route;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public boolean existsById(String name){
        return routeRepository.existsRouteByName(name);
    }
    
    /**
     * Metodo que llama al repositorio de rutas para consultar si existe una
     * ruta cuyo id sea el  parametro que se recibe.
     * @param id
     * @return True o False. 
     */
    public boolean existsById(Long id){
        return routeRepository.existsById(id);
    }
    
    /**
     * Metodo que llama al repositorio de rutas para consultar si existe una
     * ruta cuyo nombre sea el  parametro que se recibe y cuyo id no sea el 
     * parametro que se recibe.
     * @param name
     * @param id
     * @return True o False. 
     */
    public boolean existsAndIdIsNot(String name, Long id){
        return routeRepository.existsRouteByNameAndIdIsNot(name, id);
    }
    
    /**
     * Metodo que llama al repositorio de rutas para obtener todas 
     * las rutas y retornarlas en una paginacion. 
     * @param pageable
     * @return 
     */
    public Page<Route> getAll(Pageable pageable){
        return routeRepository.findAll(pageable);
    }
    
    /**
     * Metodo que llama al repositorio de rutas para obtener una ruta 
     * cuyo id sea igual al que se recibe como parametro. 
     * @param id
     * @return 
     */
    public Optional<Route> getRouteById(Long id){
        return routeRepository.findById(id);
    }
    
    /**
     * Metodo que llama al repositorio de rutas para actualizar 
     * la ruta que se recibe como parametro. 
     * @param route 
     */
    public void update(Route route){
        routeRepository.save(route);
    }
    
    /**
     * Metodo que llama al repositorio de rutas para eliminar 
     * la ruta que se recibe como parametro. 
     * @param route 
     */
    public void delete(Route route){
        routeRepository.delete(route);
    }
    
    /**
     * Metodo que llama al repositorio de rutas para buscar
     * si existe una ruta cuyo id de destino sea igual al que se 
     * recibe como parametro.
     * @param destinationId 
     * @return  True | False
     */
    public boolean routeHasDestinationAssigned(Long destinationId){
        return routeRepository.existsRouteByDestinationId(destinationId);
    }
    
}
