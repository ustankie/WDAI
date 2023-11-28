package com.example.demo.service;

import com.example.demo.dao.Person;
import com.example.demo.repository.PersonsRepository;
import com.example.demo.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class Service1 implements PersonService {
    @Autowired
    private PersonsRepository personsRepository;
//    List<Person> personList;
    @Override
    public List<Person> getPersons() {
        return (List<Person>) personsRepository.findAll();
    }

    @Override
    public Person getPerson(String surname) {
        List<Person> personList=(List<Person>) personsRepository.findAll();
        int n=personList.size();
        for(int i=0;i<n;i++){
            if(Objects.equals(personList.get(i).surname, surname)){
                return personList.get(i);
            }
        }
        return null;
    }

    @Override
    public Person create(Person person) {
        return personsRepository.save(person);
    }

    @Override
    public Person getPerson(int id) {
        Optional<Person> a=personsRepository.findById(id);
        return a.orElse(null);
    }
}
