/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/UnitTests/JUnit4TestClass.java to edit this template
 */
package com.gt.interpackage.service;

import com.gt.interpackage.model.Destination;
import com.gt.interpackage.repository.DestinationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

/**
 *
 * @author bryan
 */
public class DestinationServiceTest {
    
    @Mock
    private DestinationRepository destinationRepository;
    
    private Destination destination;
    
    @InjectMocks
    private DestinationService destinationService;
    
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        destination = new Destination(1L, "GUATEMALA-PETEN", "De Gautemala a Peten", 52.50);
    }

    /**
     * Test of save method, of class DestinationService.
     */
    @Test
    public void testSave() {
        System.out.println("DestinationServiceTest - save");
        Mockito.when(destinationRepository.save(ArgumentMatchers.any(Destination.class))).thenReturn(destination);
        assertNotNull(destinationService.save(new Destination("GUATEMALA-PETEN", "De Gautemala a Peten", 52.50)));
    }

    /**
     * Test of findByName method, of class DestinationService.
     */
    @Test
    public void testFindByName() {
        fail("The test case is a prototype.");
    }
}
