package com.example.demo.service;

import com.example.demo.dao.Person;

import java.util.List;

public interface PersonService {

    List<Person> getPersons();
    Person getPerson(String surname);
    Person create(Person person);
    Person getPerson(int id);


}
