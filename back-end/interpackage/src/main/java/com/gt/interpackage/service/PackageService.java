/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.service;

import com.gt.interpackage.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gt.interpackage.model.Package;
import java.util.List;
import javax.persistence.EntityNotFoundException;
/**
 *
 * @author Luis
 */
@Service
public class PackageService {
    
    @Autowired
    private PackageRepository _packageRepository;
    
    /*
     * Metodo que llama al repositorio de paquetes para obtener
     * los datos del paquete que se recibe como parametro
    */
    public Package getById(Long id) throws Exception {
        try {
            Package pack = _packageRepository.getById(id);
            return pack;
        } catch(EntityNotFoundException e){
            return null;
        }
    }
    
    /*
     * Metodo que llama al repositorio de paquetes en busca de 
     * los paquetes que ya se encuentran en destino
    */
    public List<Package> findInDestination(){
        return _packageRepository.getInDestination();
    }
    
    /*
     * Metodo que llama al repositorio de paquetes para agregar
     * un nuevo paquete a la bse de datos
    */
    public Package addPackage(Package pack){
       return _packageRepository.save(pack);
    }
    
    /*
     * Metodo que llama al repositorio de paquetes para actualizar
     * un paquete especifico
    */
    public <S extends Package> Package update(S entity, Long id) throws Exception {
        Package pack = getById(id);
        if(pack != null) {
            pack.setDescription(entity.getDescription());
            pack.setOnWay(entity.getOnWay());
            pack.setRetired(entity.getRetired());
            pack.setAtDestination(entity.getAtDestination());
            pack.setUnitTotal(entity.getUnitTotal());
            pack.setRoute(entity.getRoute());
            pack.setWeight(entity.getWeight());
            return _packageRepository.save(pack);
        } return null;
    }
    
    public List<Package> getPackagesByInvoice(Long id_invoice){
        return _packageRepository.getPackagesByInvoice(id_invoice);
    }
    
    
}
