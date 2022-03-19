/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.service;

import com.gt.interpackage.repository.DestinationRepository;
import com.gt.interpackage.model.Destination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author bryan
 */
@Service
public class DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;
    
    public <S extends Destination> S save(S entity) {
        return destinationRepository.save(entity);
    }
    
}
