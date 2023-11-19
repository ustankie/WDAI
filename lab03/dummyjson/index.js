
async function getData(){
    try{
        const requestURL="https://dummyjson.com/products";
        const request=new Request(requestURL);

        const response=await fetch(request);
        const products=await response.json();
        const only_products=products.products;
        var products1=only_products;

        populateProducts(products1,false);

        return products1;
    }catch(error){
        console.error("Error getting data");
    }
    


}


function populateProducts(products,first){
    const section=document.querySelector("section");

    const data=document.getElementById("data");

    const itemsDisplayed=document.getElementById("itemsDisplayed");
    const a=Math.min(products.length,30);
    itemsDisplayed.innerHTML='';
    itemsDisplayed.textContent=`${a}`;




    for(var i=0;i<products.length && i<30;i++){
        const prod= products[i];
        const dataLi=document.createElement("li");
        const myH2=document.createElement("h2");
        const myPara1 = document.createElement("p");
        const myId=document.createElement("a");
        myId.id="myId";
        
        const icon=document.createElement("img");

        myH2.textContent = prod.title;
        myId.textContent=prod.id;
        if(first){
            myPara1.textContent = `Description: ${prod.description}`;
        }
        else{
            myPara1.textContent = `${prod.description}`;
        }
        
        icon.src=`${prod.thumbnail}`;

        myId.style.visibility="hidden";
        myId.style.display="none";
        dataLi.appendChild(myH2);
        dataLi.appendChild(myId);
        dataLi.appendChild(myPara1);
        dataLi.appendChild(icon);
        


        data.appendChild(dataLi);
    }
    

}

function htmlListToJson(){
    const dataList=document.getElementById('data');
    const items=dataList.getElementsByTagName('li');
    const products=[];

    // console.log(dataList);

    for(let i=0;i<items.length;i++){
        const item=items[i];
        const title=item.querySelector('h2').innerText;
        const myId=item.querySelector('#myId').innerHTML;
        const description=item.querySelector('p').innerText;
        const img=item.querySelector('img').getAttribute('src');

        const itemObject={
            title: title,
            id: parseInt(myId),
            description: description,
            thumbnail:img

        };

        products.push(itemObject);
       
    } 
    return products;
}

function sortData(order){

    const data= htmlListToJson();
    const p = Promise.resolve(data);
    p.then((v) => {

    var products1;

    products1=v.sort((a,b)=>{
        if(order=='asc'){
            if (a.title < b.title) { return -1;}
            return 1;
        }else
        if(order=='desc'){
            if (a.title < b.title) { return 1;}
            return -1;}
        else
        if(order=='original'){
            if (a.id < b.id) { return -1;}
            return 1;}
        
    });

        console.log(products1);
        const dataList=document.getElementById('data');
        dataList.innerHTML='';
        populateProducts(products1,false);
    });
    

    

}

function clearFilter() {
    const dataList=document.getElementById('data');
    dataList.innerHTML='';
    getData();
}

function clearSort() {
    sortData('original');
}




getData();

document.getElementById("submit").addEventListener("click",(event)=>{

    const filterData=document.getElementById("filter");
    const checked=document.getElementById("includeDesc").checked;
    const data=getData();
    const p = Promise.resolve(data);
    p.then((v) => {
        var products1;

        products1=v.filter((a)=>{
            if(checked){
                return a.title.toLowerCase().includes(filterData.value.trim().toLowerCase())
                || a.description.toLowerCase().includes(filterData.value.trim().toLowerCase());
            }
            // console.log(a);
            return a.title.toLowerCase().includes(filterData.value.trim().toLowerCase());
        });

        console.log(products1);
        const dataList=document.getElementById('data');
        dataList.innerHTML='';
        populateProducts(products1,false);
    });
    filterData.innerHTML='';


    // event.preventDefault();



});

