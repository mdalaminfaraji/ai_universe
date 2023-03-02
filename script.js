const dataLoad=(dataLimit)=>{
    // start spinner
    toggleSpinner(true);
     fetch('https://openapi.programming-hero.com/api/ai/tools')
     .then(res=>res.json())
     .then(data=>displayTools(data.data.tools, dataLimit));
}
const displayTools=(tools, dataLimit)=>{
  const toolsContainer=document.getElementById('container');
//   show all section start

if(dataLimit===6){
   tools.slice(0, 6).forEach(tool=>{
    console.log(tool);
    const {features, image,name, published_in}=tool;
    const [x, y, z]=features;
    const div=document.createElement('div');
  div.classList.add('col');
  div.innerHTML=`
   <div class="card h-100">
      <img src="${image}" class="card-img-top rounded-lg" alt="...">
      <div class="card-body">
      <h2>Features</h2>
      <p>1. ${x}</p>
      <p>2. ${y}</p>
      <p>3. ${z}</p>
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
           <button class="btn btn-danger rounded-pill">
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
}else{ 

  tools.forEach(tool=>{
    console.log(tool);
    const {features, image,name, published_in}=tool;
    const [x, y, z]=features;
    const div=document.createElement('div');
  div.classList.add('col');
  div.innerHTML=`
   <div class="card h-100">
      <img src="${image}" class="card-img-top rounded-lg" alt="...">
      <div class="card-body">
      <h2>Features</h2>
      <p>1. ${x}</p>
      <p>2. ${y}</p>
      <p>3. ${z}</p>
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
           <button class="btn btn-danger rounded-pill">
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