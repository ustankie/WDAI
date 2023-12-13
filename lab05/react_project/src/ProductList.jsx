import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import {useRef} from 'react';



export function ProductList(val){
    const [includeDesc, setIncludeDesc] = useState(false);
    const [filter, setFilter] = useState('');
    const [order, setSortOrder] = useState(null);
    // const location = useLocation();
    // const updatedProduct1 = location.state?.updatedProduct;
    // const updatedProducts=location.state?.updatedProducts;

    const inputRef = useRef(null);
    const [products,setProducts]=useState([]);
    const [defaultProducts,setDefaultProducts]=useState([]);
    const [editVisibility, setEditVisibility]=useState(false);
    const [editProduct,setEditProduct]=useState(products[0]);
    const [title,setTitle]=useState('')
    const [desc,setDesc]=useState('')


    const updateState = (newValue) => {
        setProducts((prevState) => {
            const _ = require('lodash');
          if (_.isEqual(newValue,prevState) ){
            return prevState;
          }
          return newValue; 
        });
      };
    const updateState2 = (newValue) => {
    setDefaultProducts((prevState) => {
        const _ = require('lodash');
        if (_.isEqual(newValue,prevState) ){
        return prevState; 
        }
        return newValue; 
    });
    };



    const updateProducts=(updatedProduct)=>{
        
            let pr=products.map(product => {
                if (product.id === updatedProduct.id) {
                return { ...updatedProduct};
                }
                return product;
            });
            
            updateState(pr);


            let pr1=defaultProducts.map(product => {
                if (product.id === updatedProduct.id) {
                    
                return { ...updatedProduct};
                }
                return product;
            });
            updateState2(pr1);
            
    }
    
    const fetchData=(orderr,filter,includeDesc,products)=>{
        fetch('https://dummyjson.com/products')
            .then(response=>{
                return response.json()
            })
            .then(data=>{
                let pr=data.products.slice(0,30);
                

                    setDefaultProducts(pr);   
                
                if (order === "asc") {
                    pr=(pr.sort((a, b) => (a.title > b.title ? 1 : -1)));
                } else if (order === 'desc') {
                    pr=(pr.sort((a, b) => (a.title > b.title ? -1 : 1)));
                }
 

                    setProducts(pr);
                    console.log("set!!!!!")

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const getData=(order,filter,includeDesc)=>{
        let pr=products;
                if (order === "asc") {
                    pr=(pr.sort((a, b) => (a.title > b.title ? 1 : -1)));
                } else if (order === 'desc') {
                    pr=(pr.sort((a, b) => (a.title > b.title ? -1 : 1)));
                }else{
                    pr=(pr.sort((a, b) => (a.id > b.id ? 1 : -1)));
                }
                if(includeDesc){
                    pr=pr.filter(f=>(f.title.toLowerCase().includes(filter.toLowerCase())|| f.description.toLowerCase().includes(filter.toLowerCase()) || filter ===''));
                }else{
                    pr=pr.filter(f=>(f.title.toLowerCase().includes(filter.toLowerCase()) || filter ===''));
                }
                updateState(pr)    
    }



    useEffect(()=>{
        fetchData(null,'',false);
        console.log('fetch');
    },[])


    
    const handleClickEdit = (prod) => {
        setEditVisibility(true);
        setEditProduct(prod);
        setTitle(prod.title);
        setDesc(prod.description);
      };


    const handleClick = () => {
        let pr = { ...editProduct, title: title, description:desc };
        updateProducts(pr);
        setEditVisibility(false);
      };
    const handleClickCancel = () => {

    setEditVisibility(false);
    };

    const handleTitle=(e)=>{
        setTitle(e.target.value)
    }

    const handleDesc=(e)=>{
        setDesc(e.target.value)
    }
    const sortData=(orderr)=>{
        setSortOrder(orderr);
        getData(orderr,filter,includeDesc,products);
    }

    const clearSort=()=>{
        setSortOrder(null);
        getData(null,filter,includeDesc);

    }
    const clearFilter=()=>{
        setFilter('');
        setProducts(defaultProducts);
    }
    const handleFilter = () => {
        setTimeout(() => {
            setProducts(defaultProducts);
          }, 0);
        setProducts(defaultProducts);
        const inputValue = inputRef.current.value;
        clearFilter();
        setFilter(inputValue);
    
        setTimeout(() => {
          getData(order, inputValue, includeDesc);
        }, 0);
      };


    return (
        <div>         <header>
        <h1>Products</h1>   
    </header>
    <div id="content">
        <div id="sort">
            Sort
            <button onClick={() => sortData('asc')}>asc</button>
            <button onClick={() => sortData('desc')}>desc</button>
            <button onClick={()=>clearSort()}>clear</button>
        </div>
        
        <div id="filter1">
            <label class="bold" for="filter" >Filter data: </label>
            <div>
                <label for="includeDesc">Include description</label>
                <input type="checkbox" id="includeDesc" value="include description"
                onChange={e=>{
                    setIncludeDesc(e.target.checked);
                    getData(order,filter,e.target.checked);}}/>
            </div>
        
            <div>
                <input type="text" id="filter" ref={inputRef}/>
                <input type="submit" id="submit" value="Filter" onClick={() => {
                    setProducts(defaultProducts);
                    handleFilter();
                   }}/>
                <button onClick={()=>clearFilter()}>clear</button>
            </div>
            
        </div>

        <section>
            <ul id="data"></ul>
        </section>
    </div>
            <div >
                <p>
                    Items displayed: &nbsp;
                    {products.length}
                </p>
            </div>  
            {editVisibility?             <div>
                <h1>Edit product</h1>             
                
                <li key={editProduct.id}>
                    <input value={title} onChange={(e) =>handleTitle(e)} />
                    <input value={desc}onChange={(e) =>handleDesc(e)} />
                    <img src={editProduct.thumbnail} alt="" />
                </li>


                               
            
            </div>:null }
            {editVisibility?  <button onClick={()=>{setTimeout(()=>handleClick(),0);sortData(order,filter,includeDesc) }}>save</button>:null}
            {editVisibility? <button onClick={()=>handleClickCancel()}>cancel</button>:null}
            
            {products.length > 0 && (editVisibility ? null:
               
                <ul>

                {products.map(product => (
                    <li key={product.id}>
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                        <img src={product.thumbnail} alt="" />
                        <button onClick={()=>handleClickEdit(product)}>edit</button>
                    </li>
                    
                ))
                }
                </ul>
            )}
        </div>
    );
}

