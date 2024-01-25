import kot from './resources/kot.jpeg'
import './App.css';
import React from "react";
import {  useEffect } from "react";



export function Hello() {
  useEffect(() => {
    document.title = 'Hello World';
  }, [])
  return (
  
    <div class="content">
      <h1>
        Hello World!
      </h1>
      
      <img src={kot} alt="kot" />
    </div>

  );
 
}
