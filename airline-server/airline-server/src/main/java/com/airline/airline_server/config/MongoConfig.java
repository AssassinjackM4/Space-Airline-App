package com.airline.airline_server.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoConfig {

    @Primary
    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(
         "mongodb+srv://airlinedb:mongoairline@airline-db.zkajqfe.mongodb.net/?appName=Airline-db"
        );
    }

    @Primary
    @Bean
    public MongoTemplate mongoTemplate(MongoClient mongoClient) {
        return new MongoTemplate(mongoClient, "airline-db");
    }
}
