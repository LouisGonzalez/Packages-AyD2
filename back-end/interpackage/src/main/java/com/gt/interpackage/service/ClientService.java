/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.service;

import com.gt.interpackage.repository.ClientRepository;
import com.gt.interpackage.model.Client;
import java.util.List;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Luis
 */
@Service
public class ClientService {
    
    @Autowired
    private ClientRepository _clientRepository;
    
    public Client getByNit(Integer nit) throws Exception{
        try{
            Client client = _clientRepository.findByNit(nit);
            return client;
        } catch(EntityNotFoundException e){
            return null;
        }
    }
    
    public List<Client> findAll(){
        return _clientRepository.findAll();
    }
    
    public <S extends Client> S save(S entity){
        return _clientRepository.save(entity);
    }
}
