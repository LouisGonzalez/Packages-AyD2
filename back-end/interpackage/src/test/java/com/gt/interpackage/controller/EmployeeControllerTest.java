/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gt.interpackage.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import com.gt.interpackage.model.Employee;
import com.gt.interpackage.source.Constants;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import java.util.Arrays;
import org.mockito.ArgumentMatchers;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
/**
 *
 * @author Luis
 */
@WebMvcTest (EmployeeController.class)
public class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private EmployeeService _empService;
    
    private Employee emp;
    private ObjectMapper objectMapper;
    
    @BeforeEach
    public void setUp(){
        MockitoAnnotations.initMocks(this);
        emp = new Employee(12355L, "Jose Manuel", "Garcia", 1, "12345678", "prueba@gmail.com", "josema12", true);
        objectMapper = new ObjectMapper();
    }
    
    @Test
    public void testGetAllEmployees() throws Exception {
        System.out.println("EmployeeControllerTest - findAllActivates");
        Mockito.when(_empService.findAllActivates()).thenReturn(Arrays.asList(emp));
        mockMvc.perform(MockMvcRequestBuilders.get(Constants.API_V1 + "/employee/actives/")
        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(Arrays.asList(emp))));
        Mockito.verify(_empService).findAllActivates();
    }
    
    @Test
    public void testGetAllDeactivates() throws Exception {
        System.out.println("EmployeeControllerTest - findAllDeactivates");
        Mockito.when(_empService.findAllDeactivates()).thenReturn(Arrays.asList(emp));
        mockMvc.perform(MockMvcRequestBuilders.get(Constants.API_V1 + "/employee/deactivates/")
        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(Arrays.asList(emp))));
        Mockito.verify(_empService).findAllDeactivates();
    }
    
    @Test
    public void testAddEmployee() throws Exception {
        System.out.println("EmployeeControllerTest - save");
        Mockito.when(_empService.save(ArgumentMatchers.any(Employee.class))).thenReturn(emp);
        mockMvc.perform(MockMvcRequestBuilders.post(Constants.API_V1+"/employee/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(emp)))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(emp)));
        Mockito.verify(_empService).save(ArgumentMatchers.any(Employee.class));
    }
    
    @Test
    public void testUpdateEmployee() throws Exception {
            System.out.println("EmployeeControllerTest - update");
            Mockito.when(_empService.getByCUI(ArgumentMatchers.any(Long.class))).thenReturn(emp);
            Mockito.when(_empService.update(ArgumentMatchers.any(Employee.class), ArgumentMatchers.any(Long.class))).thenReturn( new Employee(12382L, "Diego Andres", "Marquez", 1, "12345678", "prueba@gmail.com", "diegoan44", true));
            Employee updated = new Employee(12382L, "Diego Andres", "Marquez", 1, "12345678", "prueba@gmail.com", "diegoan44", true);
            mockMvc.perform(MockMvcRequestBuilders.put(Constants.API_V1 + "/employee/12382")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(updated)))
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Diego Andres"))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.lastname").value("Marquez"));
            Mockito.verify(_empService).update(ArgumentMatchers.any(Employee.class), ArgumentMatchers.any(Long.class));
    }
}
