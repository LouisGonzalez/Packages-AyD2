package com.gt.interpackage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gt.interpackage.model.PackageCheckpoint;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author helmuth
 */
@Repository
public interface PackageCheckpointRepository extends JpaRepository<PackageCheckpoint, Long>{

    public boolean existsPackageCheckpointByCheckpointId(Long id);
    
    /**
     * Metodo que consulta la tabla package-chekpoint de la base de datos para obtener 
     * una objeto de tipo PackageCheckpoint en base al id del paquete que se recibe como
     * parametro.
     * @param id
     * @return 
     */
    public PackageCheckpoint findByPackagesIdAndCurrentCheckpointTrue(Long id);
    
    @Query(value="SELECT cast(sum(time_on_checkpoint) AS varchar) AS time FROM package_checkpoint WHERE id_package =?1", nativeQuery = true)
    public String getTimeOnRouteByPackageId(Long id);
}
