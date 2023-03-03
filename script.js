const dataLoad=(dataLimit)=>{
    // start spinner
    toggleSpinner(true);
     fetch('https://openapi.programming-hero.com/api/ai/tools')
     .then(res=>res.json())
     .then(data=>displayTools(data.data.tools, dataLimit));
}
const displayTools=(tools, dataLimit)=>{
  const toolsContainer=document.getElementById('container');
  toolsContainer.textContent='';
  console.log(tools);



//   show all section start
   const showAll=document.getElementById('show-all');
    if(dataLimit && tools.length>5){
         tools=tools.slice(0, 6);
         showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
// show all section end
   tools.forEach(tool=>{
    // console.log(tool);
    const {features, image,name, published_in, id}=tool;
    const [x, y, z]=features;
    const div=document.createElement('div');
  div.classList.add('col');
  div.innerHTML=`
   <div class="card h-100">
      <img src="${image}" class="card-img-top rounded-lg" alt="...">
      <div class="card-body">
      <h2>Features</h2>
      <p>1. ${x?x:'No data found'}</p>
      <p>2. ${y?y:'No data found'}</p>
      <p>3. ${z?z:'No data found'}</p>
      </div>
      <div class="card-footer">
      <h5 class="card-title">${name}</h5>
      <div class="row align-items-center">
          <div class="text-muted col text-left">
           <div>
            <span><i class="fa-regular fa-calendar-days"></i></span>
             <span class="ms-2">${published_in}</span>
        </div>
        </div>
        <div class="col text-end">
           <button onclick="loadToolsDetails('${id}')" class="btn btn-danger rounded-pill" data-bs-toggle="modal" data-bs-target="#toolsModal">
             <i class="fa-solid fa-arrow-right "></i>
           </button>
        </div>
      </div>
      </div>
    </div>
  `;
  toolsContainer.appendChild(div);
  });
  //   end spinner
  toggleSpinner(false);

}
// sort by date section
const fetchDate=()=>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=>res.json())
    .then(data=>displayDate(data.data.tools));
}
const displayDate=(tools)=>{
  console.log(tools);
  const arr1=tools.map(obj=>{
    return {...obj, published_in:new Date(obj.published_in)};
  });
  const sortedAsc=arr1.sort(
    (objA, objB)=>Number(objA.published_in) - Number(objB.published_in),
  );
  console.log(sortedAsc);
  return sortedAsc;
 

}

// single data details show with model
const loadToolsDetails=(id)=>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>showModalToolsData(data.data));
}

const showModalToolsData=(toolsDetail)=>{
    console.log(toolsDetail);
    
     const {description, pricing, features, integrations, input_output_examples,image_link, accuracy }=toolsDetail;
    
    const titleDescription=document.getElementById('title');
    titleDescription.innerText=description;
    

    if(Array.isArray(pricing)){
         document.getElementById('pricing').innerText='';
      document.getElementById('cost-1').innerHTML=`<span class="text-center text-warning">${pricing[0].price?pricing[0].price:'No data found'}</span><br><span class="text-center text-warning">${pricing[0].plan?pricing[0].plan:'No data found'}</span>`;
    document.getElementById('cost-2').innerHTML=`<span class="text-center text-success">${pricing[1].price?pricing[1].price:'No data found'}</span><br><span class="text-center text-success">${pricing[1].plan?pricing[1].plan:'No data found'}</span>`;
    document.getElementById('cost-3').innerHTML=`<span class="text-center text-primary">${pricing[2].price?pricing[2].price:'No data found'}</span><br><span class="text-center text-primary">${pricing[2].plan?pricing[2].plan:'No data found'}}</span>`;
    }else{
        document.getElementById('cost-1').innerText='';
        document.getElementById('cost-2').innerText='';
        document.getElementById('cost-3').innerText='';
        document.getElementById('pricing').innerText=`
         No data found.It may be free
        `;
        
    };
    

    document.getElementById('li').innerHTML=`
    <li>${features['1'].feature_name?features['1'].feature_name:'No data found'}</li>
    <li>${features['2'].feature_name?features['2'].feature_name:'No data found'}</li>
    <li>${features['3'].feature_name?features['3'].feature_name:'No data found'}</li>
    `;
    if(Array.isArray(integrations)){
       
    document.getElementById('integration-1').innerText=`${integrations[0]?integrations[0]:'No data found'}`;
    document.getElementById('integration-2').innerText=`${integrations[1]?integrations[1]:'No data found'}`;
    document.getElementById('integration-3').innerText=`${integrations[2]?integrations[2]:'No data found'}`;
    }
    else{
        document.getElementById('integration-1').innerText='no data found';
        document.getElementById('integration-2').innerText='no data found';
        document.getElementById('integration-3').innerText='no data found';
       
    };
  
     
  
    const displayAccuracy= document.getElementById('accuracy');

   
    if(typeof accuracy.score!= 'number'){
        displayAccuracy.classList.add('d-none');
    }else{
        displayAccuracy.classList.remove('d-none');
         displayAccuracy.innerHTML=`
    <span class="bg-danger p-3 w-25 rounded fs-6 text-light">${accuracy.score*100} % accuracy</span>
    `
    }
  
    document.getElementById('image').innerHTML=`
    <img src="${image_link[0]}" class="card-img-top rounded-lg" alt="...">
    `
    if(Array.isArray(input_output_examples)){
        document.getElementById('input').innerText=`${input_output_examples[0].input? input_output_examples[0].input:'No data found'}`;
    document.getElementById('output').innerText=`${input_output_examples[0].output? input_output_examples[0].output:'No data found'}`; 
    }else{
        document.getElementById('input').innerText=`
        Can you give any example?
        `;
        document.getElementById('output').innerText=`
        No! Not Yet! Take a break!!!
        `;
    };
   
     
}

// spinner section start
const toggleSpinner=isLoading=>{
    const loaderSection=document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }else{
        loaderSection.classList.add('d-none');
    }
}
// spinner section end

// show all tools data section start
document.getElementById('btn-show-all').addEventListener('click', function(){
    dataLoad();

})
// show all tools data section end



dataLoad(6);