package com.gt.interpackage.controller;

import com.gt.interpackage.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gt.interpackage.model.Route;
import com.gt.interpackage.service.CheckpointService;
import com.gt.interpackage.source.Constants;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
/**
 *
 * @author helmuth
 */
@RestController
@RequestMapping(Constants.API_V1 + "/route")
public class RouteController {
    
    @Autowired
    private RouteService routeService;
    
    @Autowired
    private CheckpointService checkpointService;
    
    /**
     * Metodo que recibe una peticion POST para la creacion de una ruta.
     * Valida que no exista ninguna ruta registrada con el nombre recibido
     * y que ese nombre tenga un formato valido. 
     * @param route Ruta a crear.
     * @return 
     */
    @CrossOrigin
    @PostMapping
    private ResponseEntity<Route> createRoute(@RequestBody Route route){
        try{
            if(routeService.exists(route.getName()))
                return new ResponseEntity("Nombre de ruta ya registrado en el sistema", HttpStatus.BAD_REQUEST);
                
            if(route.getName().isBlank() || route.getName().isEmpty() )
                return new ResponseEntity("Nombre de ruta no valido", HttpStatus.BAD_REQUEST);
                
            Route tempRoute = routeService.create(route);
            return ResponseEntity.created(new URI("/routes/"+tempRoute.getId())).body(tempRoute);
        } catch(Exception e){
            return new ResponseEntity("Error en el servidor.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Metodo que recibe una peticion GET para obtener un listado paginado de rutas.
     * @param page Numero de pagina actual. Por defecto 1.
     * @param size Tamaño de la pagina. Por defecto 10.
     * @return 
     */
    @CrossOrigin
    @GetMapping("list")
    public ResponseEntity<Page<Route>> getRoutes(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size
    ){
        try{          
            Page<Route> routes = routeService.getAll(
               PageRequest.of(page, size, Sort.by("name"))
            );
            return new ResponseEntity<Page<Route>>(routes, HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity("Error en el servidor.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Metodo que recibe una peticion GET para obtener una ruta en base al id que se 
     * recibe como parametro.
     * @param id Id de la ruta a obtener.
     * @return 
     */
    @CrossOrigin
    @GetMapping(value ="/{id}")
     public ResponseEntity<Optional<Route>> getRoute(@PathVariable Long id){
        try{
            return ResponseEntity.ok(routeService.getRouteById(id));
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
     
    /**
     * Metodo que recibe una peticion PATCH para actualizar una ruta.
     * Valida que no exista ninguna ruta registrada que no sea la ruta que se desea
     * actualizar con el nombre recibido y que ese nombre tenga un formato valido. 
     * @param route
     * @return 
     */ 
     @CrossOrigin
     @PatchMapping
     public ResponseEntity<Route> updateRoute(@RequestBody Route route){
        try{
            if(route.getName().isBlank() || route.getName().isEmpty() )
                return new ResponseEntity("Nombre de ruta no valido", HttpStatus.BAD_REQUEST);
            
            if(routeService.exists(route.getName(), route.getId()))
                return new ResponseEntity("Nombre de ruta ya registrado en el sistema", HttpStatus.BAD_REQUEST);
            
            Route updatedRoute = routeService.getRouteById(route.getId()).get();
            updatedRoute.setName(route.getName());
            updatedRoute.setActive(route.getActive());
            updatedRoute.setDestination(route.getDestination());
            routeService.update(updatedRoute);
            return ResponseEntity.ok(updatedRoute);
      } catch(Exception e){
        return new ResponseEntity("Error en el servidor.", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    /**
     * Metodo que recibe una peticion DELETE para eliminar la ruta cuyo id se 
     * recibe como parametro. Valida que la ruta no tenga paquetes en ruta y eliminar
     * todos los puntos de control asignados a esa ruta para poder realizar la 
     * eliminacion de la ruta.
     * @param id
     * @return 
     */
    @Transactional 
    @CrossOrigin
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Route> deleteRoute(@PathVariable Long id){
        try{
            if(checkpointService.routeHasCheckpointsAssigned(id))
                return new ResponseEntity("No se puede eliminar la ruta ya que tiene puntos de control asignados.", HttpStatus.BAD_REQUEST);
            
            Route tempRoute = routeService.getRouteById(id).get();
            if(tempRoute.getPackagesOnRoute() > 0)
                return new ResponseEntity("No se puede eliminar una ruta que contiene paquetes en ruta.", HttpStatus.BAD_REQUEST);
         
            routeService.delete(tempRoute);
            return ResponseEntity.ok().build();
      } catch(Exception e){
            System.out.println(e.getMessage());
        return new ResponseEntity("Error en el servidor.", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    /**
     * Metodo que realiza una llamada al servicio de rutas para obtener todas las 
     * rutas cuyo nombre inicie con el nombre que se recibe como parametro.
     * @param name
     * @return Listado de rutas encontradas | Error 400
     */
    @CrossOrigin
    @GetMapping(value ="/search-by-name/{name}")
    public ResponseEntity<List<Route>> getRoutesByName(@PathVariable String name){
        try{
            return ResponseEntity.ok(routeService.getAllByName(name).get());
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
     
}
    
