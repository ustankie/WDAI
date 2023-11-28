package com.example.demo.repository;

import com.example.demo.dao.Person;
import org.springframework.data.repository.CrudRepository;

public interface PersonsRepository extends CrudRepository<Person, Integer>{
}
