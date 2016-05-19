package com.swarm; /**
 * Created by igorsorokin on 5/19/16.
 */
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.swarm")
@EnableAutoConfiguration
public class MainApp {
    public static void main(String[] args) throws Exception {
        SpringApplication.run(MainApp.class, args);
    }
}
