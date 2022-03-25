package com.gt.interpackage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("module-service")
public class InterpackageApplication {

    public static void main(String[] args) {
        SpringApplication.run(InterpackageApplication.class, args);
    }

}
