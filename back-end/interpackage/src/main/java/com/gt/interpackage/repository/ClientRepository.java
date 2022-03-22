/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.gt.interpackage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.gt.interpackage.model.Client;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author Luis
 */
@Repository
public interface ClientRepository extends JpaRepository<Client, Long>{
    
    @Query(value = "SELECT * FROM client e WHERE e.nit = ?1", nativeQuery = true)
    Client findByNit(Integer nit);
}
