    import React, { useState } from "react";
    import { useEffect } from "react";
    // import {useRef} from 'react';
    import { useLocation } from 'react-router-dom';
    import './Edit.css'
    import { useNavigate } from "react-router-dom";


    export function EditProduct(product1){
        

        // const location = useLocation();
        // const jsonData = new URLSearchParams(location.search).get('data');

        // Parse the JSON string back to an object
        // const [product, setProduct] = useState(JSON.parse(decodeURIComponent(jsonData || '{}')));  
        const [product,setProduct]=useState(product1.product);
        const [prevProduct,setPrevProduct]=useState(product);  
    
        // Access the arguments from the URL
        // const product = queryParams.get('product');
        console.log("product:",product)
        const [title, setTitle] = useState(product.title);
        const [description,setDescription]=useState(product.description);

        const handleDesc=(e)=>{
            setDescription(e.target.value)
            let pr = { ...product, description: e.target.value };
            setProduct(pr);
            
        }

        const handleTitle=(e)=>{
            setTitle(e.target.value)
            let pr = { ...product, title: e.target.value };
            setProduct(pr);
            
        }

        let navigate = useNavigate(); 
        const handleClick = () => {
        
            navigate("/productlist", { state: { updatedProduct: product} });
          };
          const handleClickCancel = () => {
        
            navigate("/productlist", { state: { updatedProduct: prevProduct } });
          };

        useEffect(() => {
            document.title = 'EditProduct';
        }, [])
        

        return (
            <div>
                <h1>Edit product</h1>             
                
                <li key={product.id}>
                    <input value={title} onChange={(e) =>handleTitle(e)} />
                    <input value={description} onChange={(e) =>handleDesc(e) } />
                    <img src={product.thumbnail} alt="" />
                </li>


                    
                
                    
            
            </div>
        );
            
            
        

    }

    export default EditProduct