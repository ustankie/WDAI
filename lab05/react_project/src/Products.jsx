import {ProductList} from './ProductList'
import React from "react";
import { useState, useEffect } from "react";
import {useRef} from 'react';
import { useLocation } from 'react-router-dom';



function Products(){
    // const [includeDesc, setIncludeDesc] = useState(false);
    // const [filter, setFilter] = useState('');
    // const [sortOrder, setSortOrder] = useState(null);
    // // const location = useLocation();
    // const updatedProduct1 = location.state?.updatedProduct;
    // const updatedProducts=location.state?.updatedProducts;

    const inputRef = useRef(null);



    
    useEffect(() => {
        document.title = 'ProductList';
      }, [])

    const headd=(
        <div id="whole">
   
            <ProductList />
           
        </div>
    );



    return headd

        
        
    

}

export default Products