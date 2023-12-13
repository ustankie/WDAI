import pooh from './resources/pooh.png'
import './Home.css';
import React from "react";
import { useEffect } from "react";



export function NoPage() {
    useEffect(() => {
        document.title = '404';
      }, [])
  return (
  
    <div class="content">
      <h1>
        Error 404
      </h1>
        <p>
            No such page
        </p>
      
      <img src={pooh} alt="Crying Winnie The Pooh" />
    </div>

  );
 
}
