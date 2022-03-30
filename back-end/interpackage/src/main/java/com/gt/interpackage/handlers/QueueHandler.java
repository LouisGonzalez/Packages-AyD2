/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.handlers;

import com.gt.interpackage.model.*;
import com.gt.interpackage.model.Package;
import com.gt.interpackage.service.*;

import java.time.LocalDate;
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
    private PackageService packageService;

    @Autowired 
    private QueueService queueService;

    @Autowired
    private DestinationService destinationService;

    @Autowired
    private CheckpointService checkpointService;

    @Autowired
    private PackageCheckpointService packageCheckpointService;

    @Autowired
    private RouteService routeService;

    /*
    Metodo para recorrer la cola, y comprobar si hay espacio para ser ingresado
    */
    public void traverseQueue() throws Exception {
        List<Destination> destinations = destinationService.findAll();
        for (Destination destination : destinations) {
            List<Queue> queue = queueService.findByDestination(destination.getId());
            for (Queue packageOnQueue : queue) {
                List<Checkpoint> checkpoints = checkpointService.getAllCheckpointsByDestinationId(destination.getId());
                if (!checkpoints.isEmpty()) {
                    Checkpoint checkpoint = getCheckpointWithQueueAvailable(checkpoints);
                    if (checkpoint != null) {
                        Package p = packageOnQueue.getPackages();
                        PackageCheckpoint packageCheckpoint = new PackageCheckpoint(checkpoint, p, null, true);
                        packageCheckpointService.create(packageCheckpoint);
                        Route route = routeService.getRouteById(checkpoint.getRoute().getId()).get();
                        route.setPackagesOnRoute(route.getPackagesOnRoute() + 1);
                        route.setTotalPackages(route.getTotalPackages() + 1);
                        routeService.create(route);
                        checkpoint.setPackagesOnQueue(checkpoint.getPackagesOnQueue() + 1);
                        checkpointService.create(checkpoint);
                        p.setOnWay(true);
                        p.setDateStart(LocalDate.now());
                        p.setRoute(route);
                        packageService.update(p, p.getId());
                        //queueService.deletePackageOnQueue(packageOnQueue);
                    }
                }
            }
        }
    }

    public void verifiyQueue() {
        try {
            traverseQueue();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public Checkpoint getCheckpointWithQueueAvailable(List<Checkpoint> checkpoints) {
        for (Checkpoint checkpoint : checkpoints) {
            if (checkpoint.getQueueCapacity() > checkpoint.getPackagesOnQueue()) return checkpoint;
        } return null;
    }
    
}
