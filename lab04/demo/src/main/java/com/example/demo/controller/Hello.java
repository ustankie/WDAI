package com.example.demo.controller;

import com.example.demo.DemoApplication;
import com.example.demo.dao.Person;
import com.example.demo.model.GreetingController;
import com.example.demo.repository.PersonsRepository;
import com.example.demo.service.Service1;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.rmi.ServerException;

@RestController
public class Hello {
    private Service1 userService;
    private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);

    @Autowired
    public Hello(Service1 userService){
        this.userService=userService;

    }

    @GetMapping(value="/hello",name="hello")
    public ResponseEntity<GreetingController> hello(@RequestParam(value = "name", defaultValue = "World") String name){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Custom-Header", "foo");
        return new ResponseEntity<>(new GreetingController("cześć "+name),headers, HttpStatus.OK) ;
    }

    @GetMapping("/person")
    public ResponseEntity<Person> person(@RequestParam(value = "surname") String surname)  {
        Person person=userService.getPerson(surname);
        System.out.println(person);
        if(person==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(person,HttpStatus.OK);
        }
    }

    @GetMapping("/person/{id}")
    public ResponseEntity<Person> personId(@PathVariable int id) {
        Person person=userService.getPerson(id);
        if(person==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(person,HttpStatus.OK);
        }

    }

    @PostMapping(value="/create",name="AddNewPerson")
    public ResponseEntity<Person> create(@RequestBody Person newPerson) throws ServerException {
        Person person=userService.create(newPerson);
        System.out.println(person.getSurname());
        if (person == null) {
            String a="failed";
            throw new ServerException(a);
        } else {
            return new ResponseEntity<>(person, HttpStatus.CREATED);
        }
    }
    @Bean
    public CommandLineRunner demo(PersonsRepository repository) {
        return (args) -> {
// save a few customers
            repository.save(new Person("John", "Doe","IT"));
            repository.save(new Person("John", "Smith","tester"));
// fetch all customers
            logger.info("Customers found with findAll():");
            logger.info("-------------------------------");
            repository.findAll().forEach(customer -> {
                logger.info(customer.toString());
            });
        };
    }
}
