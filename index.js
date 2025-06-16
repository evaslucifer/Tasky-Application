
// backup storage
const state={
    tasklist:[],
};
// dom operations
const taskContents=document.querySelector(".task__contents");
const taskModal=document.querySelector(".task__modal__body");
// console.log(taskContents);
// console.log(taskModal);
const htmlTaskContent = ({id,title,description,type,url})=> `
<div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
  <div class='card shadow-sm task__cards'>
    <div class='card-header  d-grid gap-2 d-md-flex justify-content-md-end task__cards__header'>
      <button type="button" class='btn btn-outline-primary mr-1.5' name=${id} onclick="editTask.apply(this,arguments)">
        <i class='fas fa-pencil-alt name=${id}'></i>   
      </button>
      <button type="button " class='btn btn-outline-danger mr-1.5' name=${id} onclick="deleteTask.apply(this,arguments)">
       <i class='fas fa-trash-alt name=${id}' onclick="deleteTask.apply(this,arguments)"></i>   
     </button>
    </div>
    <div class='card-body'>
     ${ 
       url 
      ?`<img width=100% src=${url} alt='card image' class='card-img-top md-3 rounded-lg'/>`
      : `<img width=100% src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt='card image' class='card-img-top md-3 rounded-lg'/>`

     }
     <h4 class='card-title task__card__title'>${title}</h4>

      <p class='description trim-3-lines text-muted'>${description}</p>
      <div class='tags text-white d-flex flex-wrap'>
        <span class='badge text-bg-primary m-1'>${type}</span>
      </div>  
    </div>

    <div class='card-footer'>
      <button type='button' class='btn btn-outline-primary float-right' data-bs-toggle="modal" data-bs-target="#showTask" onclick='openTask.apply(this,arguments)' id=${id}>open task</button>
    </div>


  
   </div>

</div>
`

// modal body on open task
const htmlModalContent = ({id,title,description,url})=> {
  const date=new Date(parseInt(id));
  return `
   <div id=${id}>
   ${
  //   url &&
  //  `<img width=100% src=${url} alt='card image' class='img-fluid place__holder__image mb-3'/>`
  url 
    ? `<img width=100% src=${url} alt='card image' class='card-img-top md-3 rounded-lg'/>`
    : `<img width=100% src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt='card image' class='card-img-top md-3 rounded-lg'/>`
    }
    <strong class='text-muted text-sm'>Created on: ${date.toDateString()}</strong>
    <h2 class='my-3'>${title}</h2>
    <p class='text-muted'>${description}</p>
   
   
   </div>
  `;
};

// where we convert json to string
const updateLocalStorage=()=>{
  localStorage.setItem(
    "task",
    JSON.stringify({
      tasks: state.tasklist,
    })
  );
};

// load initial data
 const loadInitialData=()=>{
   const localStorageCopy=JSON.parse(localStorage.task);
   
   if(localStorageCopy) state.tasklist=localStorageCopy.tasks;
   state.tasklist.map((cardDate)=>{
    taskContents.insertAdjacentHTML("beforeend",htmlTaskContent(cardDate));
   });
 };
//  when we update or when we edit... we need to save 
 const handleSubmit=(event)=>{
   const id=`${Date.now()}`;
   const input={
    url: document.getElementById("imgURL").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("tags").value,
    description: document.getElementById("taskDescription").value,
   };
   if(input.title==="" || input.type==="" || input.description===""){
    return alert("please fill all necessary fields");
   }
   
   
   taskContents.insertAdjacentHTML("beforeend",htmlTaskContent({...input,id}));
   
   state.tasklist.push({...input,id});
   updateLocalStorage();

 };
//  open task
const openTask=(e)=>{
  if(!e) e=window.event;
  const getTask=state.tasklist.find(({id})=>id===e.target.id);
  taskModal.innerHTML=htmlModalContent(getTask);

}
// delete task
const deleteTask=(e)=>{
  if(!e) e=window.event;
  const targetId=e.target.getAttribute("name");
  // console.log(targetId);
  const type=e.target.tagName;
  // console.log(type);
  const removeTask=state.tasklist.filter(({id})=>id!==targetId);
  // console.log(removeTask);
      updateLocalStorage();

  if(type==="Button"){
    
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode);
  }
  else if(type==="I"){
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode.parentNode);
  }


  


  

};

// edit task 
const editTask=(e)=>{
  if(!e)e=window.event;
  const targetId=e.target.id;
  const type=e.target.tagName;
  
  let parentNode; 
  let taskTitle;
  let taskDescription;
  let taskType;
 
  if (type==="BUTTON"){
    parentNode=e.target.parentNode.parentNode;
  }
  else{
    parentNode=e.target.parentNode.parentNode.parentNode;
  }
  taskTitle=parentNode.childNodes[3].childNodes[3];
  taskDescription=parentNode.childNodes[3].childNodes[5];
  taskType=parentNode.childNodes[3].childNodes[7].childNodes[1];
  submitButton=parentNode.childNodes[5].childNodes[1];
  // console.log( taskTitle,taskDescription,taskType,submitButton);

  taskTitle.setAttribute("contenteditable","true");
  taskDescription.setAttribute("contenteditable","true");
  taskType.setAttribute("contenteditable","true");
  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.innerHTML="Save changes";




};

// save edit
const saveEdit=(e)=>{
  if(!e)e=window.event;
  const targetId=e.target.id;
  const parentNode=e.target.parentNode.parentNode;


 const taskTitle=parentNode.childNodes[3].childNodes[3];
  const taskDescription=parentNode.childNodes[3].childNodes[5];
 const taskType=parentNode.childNodes[3].childNodes[7].childNodes[1];
 const submitButton=parentNode.childNodes[5].childNodes[1];
  
 
 const updateData={
    taskTitle:taskTitle.innerHTML,
    taskDescription:taskDescription.innerHTML,
    taskType:taskType.innerHTML,
    

  };



   let stateCopy=state.tasklist;
   stateCopy=stateCopy.map((task)=>task.id===targetId 
   ?{
    id:task.id,
    title:updateData.taskTitle,
    description:updateData.taskDescription,
    type:updateData.taskType,
    url:task.url
   }
   :task  );


   state.tasklist=stateCopy;
   updateLocalStorage();

   taskTitle.setAttribute("contenteditable","false");
  taskDescription.setAttribute("contenteditable","false");
  taskType.setAttribute("contenteditable","false");
  
  
  submitButton.setAttribute("onclick","openTask.apply(this,arguments)");
  submitButton.setAttribute("data-bs-toggle","modal");
  submitButton.setAttribute("data-bs-target","#showTask");
  submitButton.innerHTML="open task";
};



// search

const searchTask=(e)=>{
   if(!e)e=window.event;
  while(taskContents.firstChild){
    taskContents.removeChild(taskContents.firstChild);
  }
  const resultData=state.tasklist.filter(({title})=>
    title.toLowerCase().includes(e.target.value.toLowerCase())
  );

  console.log(resultData);

  resultData.map((cardData)=>{
    taskContents.insertAdjacentHTML("beforeend",htmlTaskContent(cardData));

  });
  
};


