/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.repository;
import com.gt.interpackage.model.Employee;
import com.gt.interpackage.model.Fee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
/**
 *
 * @author Luis
 */
@Repository
public interface AuthRepository extends JpaRepository<Employee, Long>{
    
    @Query(value = "SELECT * FROM employee e WHERE e.username = ?1 AND e.password = ?2", nativeQuery = true)
   // @Query(value = "SELECT * FROM employee e WHERE e.username = 'luis123'", nativeQuery = true)
    Employee findByLogin(String username, String password);
    
}
