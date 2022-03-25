/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gt.interpackage.dto.ChangePasswordDTO;
import com.gt.interpackage.model.Employee;
import com.gt.interpackage.service.EmployeeService;
import com.gt.interpackage.service.EmployeeTypeService;
import com.gt.interpackage.source.Constants;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

/**
 *
 * @author bryan
 */
@WebMvcTest (EmployeeController.class)
public class EmployeeControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private EmployeeService employeeService;
    
    @MockBean 
    private EmployeeTypeService employeeTypeService;
    
    private Employee employee;
    private ObjectMapper objectMapper;
    private ChangePasswordDTO dto;
    
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        this.employee = new Employee("Juan", "Gonzales", 1, "12345678", "juan123@gmail.com", "juan123", true);
        this.objectMapper = new ObjectMapper();
        this.dto = new ChangePasswordDTO("12345678", "12345678", "as3d21asd2f1as3d2f1a3sd21fasd32f");
    }
    
    @Test
    public void testGetUserByEmail() throws Exception {
        System.out.println("EmployeeControllerTest - getUserByEmail");
        Mockito
                .when(employeeService.getUserByUsernameOrEmail(ArgumentMatchers.any(String.class)))
                .thenReturn(employee);
        mockMvc.perform(MockMvcRequestBuilders.get(Constants.API_V1 + "/employee/search-by-email/juan123@gmail.com")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("juan123@gmail.com"))
                .andExpect(MockMvcResultMatchers.content().json(this.objectMapper.writeValueAsString(employee)));
        Mockito.verify(employeeService).getUserByUsernameOrEmail(ArgumentMatchers.any(String.class));
    }
    
    @Test
    public void testChangePassword() throws Exception {
        System.out.println("EmployeeControllerTest - changePassword");
        Mockito
                .when(employeeService.getUserByTokenPassword(ArgumentMatchers.any(String.class)))
                .thenReturn(employee);
        Mockito
                .when(employeeService.save(ArgumentMatchers.any(Employee.class)))
                .thenReturn(employee);
        mockMvc.perform(MockMvcRequestBuilders.post(Constants.API_V1 + "/employee/change-password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Contraseña actualizada con exito."));
        Mockito.verify(employeeService).getUserByTokenPassword(ArgumentMatchers.any(String.class));
        Mockito.verify(employeeService).save(ArgumentMatchers.any(Employee.class));
    }
}
