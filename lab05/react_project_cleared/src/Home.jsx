import './App.css';
import React from "react";
import penguin from './resources/penguins.webp'
import { useEffect } from "react";




export function Home() {
    useEffect(() => {
        document.title = 'Home';
      }, [])
  return (
  
    <div class="content">
        <h1>Welcome!</h1>
        <img src={penguin} alt="" />
    </div>

  );
 
}
