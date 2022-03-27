package com.gt.interpackage.service;

import com.gt.interpackage.repository.PackageCheckpointRepository;
import com.gt.interpackage.model.PackageCheckpoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author helmuth
 */
@Service
public class PackageCheckpointService {
    
    @Autowired
    private PackageCheckpointRepository packageCheckpointRepository;
    
    public boolean existsAnyRegisterOfCheckpointById(Long id){
        return packageCheckpointRepository.existsPackageCheckpointByCheckpointId(id);
    }
    
    /**
     * Metodo que utliza el repositorio de paquetes-puntos de control para obtener 
     * un objeto de tipo PackageCheckpoint en base al id del paquete que se recibe 
     * como parametro.
     * @param id
     * @return 
     */
    public PackageCheckpoint getPackageCheckpoint(Long id){
        return packageCheckpointRepository.findByPackagesIdAndCurrentCheckpointTrue(id);
    }
    
    /**
     * Metodo que utiliza el repositorio de paquetes-puntos de control para 
     * obtener el tiempo total que un paquete ha estado en ruta segun el id
     * del paquete que se recibe como parametro.
     * @param id
     * @return 
     */
    public String getTimeOnRouteByPackageId(Long id){
        return packageCheckpointRepository.getTimeOnRouteByPackageId(id);
    }
    
}
