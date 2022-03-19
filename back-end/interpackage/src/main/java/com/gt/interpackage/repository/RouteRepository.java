package com.gt.interpackage.repository;

import com.gt.interpackage.model.Route;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
/**
 *
 * @author helmuth
 */
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
}
