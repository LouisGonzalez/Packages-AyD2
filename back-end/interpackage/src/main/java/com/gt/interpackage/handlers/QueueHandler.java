/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.handlers;

import com.gt.interpackage.model.Queue;
import com.gt.interpackage.service.QueueService;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author bryan
 */
@Service
public class QueueHandler {
    
    @Autowired 
    private QueueService queueService;
    
    @PersistenceContext
    private EntityManager entityManager;
    
    /*
    Metodo para recorrer la cola, y comprobar si hay espacio para ser ingresado
    */
    public void traverseQueue(Long idCheckpoint) {
        List<com.gt.interpackage.model.Package> queue = queueService.findByDestination(entityManager, idCheckpoint);
        System.out.println("# Paquetes: " + queue.size());
    }
    
}
