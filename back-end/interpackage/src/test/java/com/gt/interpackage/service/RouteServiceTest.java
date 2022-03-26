/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.service;


import com.gt.interpackage.model.Destination;
import com.gt.interpackage.model.Route;
import com.gt.interpackage.repository.RouteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 *
 * @author bryan
 */
public class RouteServiceTest {

    @Mock
    private RouteRepository routeRepository;
    
    private Route route;
    private Destination destination;
    
    @InjectMocks
    private RouteService routeService;
    
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        destination = new Destination(1L, "GUATEMALA-PETEN", "De Gautemala a Peten", 52.50);
        route = new Route(1L, "Ruta 1", 45, 150, true, destination);
    }
    
    @Test
    public void testGetRoutesByActive() {
        System.out.println("RouteServiceTest - getRoutesByActive");
        Mockito.when(
                routeRepository
                        .findAllByActive(ArgumentMatchers.any(Pageable.class), ArgumentMatchers.any(Boolean.class)))
                .thenReturn(Page.empty());
        Page<Route> page =routeService.getRoutesByActive(ArgumentMatchers.any(Pageable.class), ArgumentMatchers.any(Boolean.class));
        assertNotNull(Page.empty());
    }
}