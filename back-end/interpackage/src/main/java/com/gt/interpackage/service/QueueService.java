/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.service;

import com.gt.interpackage.model.Queue;
import com.gt.interpackage.repository.QueueRepository;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author bryan
 */
@Service
public class QueueService {
    
    @Autowired
    private QueueRepository queueRepository;
    
    public List<com.gt.interpackage.model.Package> findByDestination(EntityManager entityManager, Long idDestination) {
      /*  TypedQuery<com.gt.interpackage.model.Package> query
                // select * from queue INNER JOIN package ON  queue.id_package = package.id WHERE package.id_destiantion = '';
                = entityManager.createNativeQuery("SELECT * FROM queue INNER JOIN package ON queue.id_package = package.id", com.gt.interpackage.model.Package.class)
       return query.getResultList();*/
      return new ArrayList<>();
    }
    
}
