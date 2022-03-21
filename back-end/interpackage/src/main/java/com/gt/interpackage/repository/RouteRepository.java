package com.gt.interpackage.repository;

import com.gt.interpackage.model.Route;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/**
 *
 * @author helmuth
 */
@Repository
public interface RouteRepository extends JpaRepository<Route, Long>{

    /**
     * Metodo que obtiene y retorna desde la base de datos todas las rutas
     * cuyo nombre inicie con el nombre que se recibe como parametro.
     * @param name 
     * @return Listado de rutas obtenidas.
     */
    public Optional<List<Route>> findByNameStartingWith(String name);

    /**
     * Metodo que consulta desde la base de datos si existe una ruta con el nombre
     * que se recibe como parametro.
     * @param name
     * @return True o false.
     */
    public boolean existsRouteByName(String name);
    
    /**
     * Metodo que consulta desde la base de datos si existe una ruta con el nombre 
     * que se recibe como parametro y cuyo id no sea igual al que se recibe como 
     * segundo parametro.
     * @param name
     * @param id
     * @return 
     */
    public boolean existsRouteByNameAndIdIsNot(String name, Long id);
    
     /**
     * Metodo que busca en la base de datos si existe por lo menos un ruta
     * cuyo id de destino sea igual al que se recibe como parametro.
     * @param destinationId 
     * @return True | False
     */
    public boolean existsRouteByDestinationId(Long destinationId);
}
