package com.gt.interpackage.service;

import com.gt.interpackage.repository.PackageCheckpointRepository;
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
    
}
