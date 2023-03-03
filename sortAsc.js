// sort by date section
const fetchDate=(dataLimit)=>{
    // start spinner
    toggleSpinner(true);
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=>res.json())
    .then(data=>displayDate(data.data.tools, dataLimit));
}
const displayDate=(tools, dataLimit)=>{
  const arr1=tools.map(obj=>{
    return {...obj, published_in:new Date(obj.published_in)};
  });
 let sortedAsc=arr1.sort(
    (objA, objB)=>Number(objA.published_in) - Number(objB.published_in),
  );
  console.log(sortedAsc);
    const toolsContainer=document.getElementById('container');
  toolsContainer.textContent='';



//   show all section start
   const showAll=document.getElementById('show-all');
    if(dataLimit && sortedAsc.length>5){
         sortedAsc=sortedAsc.slice(0, 6);
         showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
// show all section end
  sortedAsc.forEach(tool=>{
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
             <span class="ms-2">${published_in.toLocaleDateString()}</span>
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
  
 document.getElementById('btn-show-all').addEventListener('click', function(){
    fetchDate();

})

}

