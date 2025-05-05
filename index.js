// // var state={
// //     tasklist:[
// //         {
// //             imageURL:"",
// //             taskTitle:"",
// //             taskType:"",
// //             taskDesc:"",
// //         },
// //         {
// //             imageURL:"",
// //             taskTitle:"",
// //             taskType:"",
// //             taskDesc:"",
// //         },
// //         {
// //             imageURL:"",
// //             taskTitle:"",
// //             taskType:"",
// //             taskDesc:"",
// //         },
// //         {
// //             imageURL:"",
// //             taskTitle:"",
// //             taskType:"",
// //             taskDesc:"",
// //         },
// //         {
// //             imageURL:"",
// //             taskTitle:"",
// //             taskType:"",
// //             taskDesc:"",
// //         }
// // ]
// // };
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
    <div class='card-header dflex justify-content-end task__cards__header>
      <button type="button " class='btn btn-outline-primary mr-1.5' name=${id}>
        <i class='fas fa-pencil-alt name=${id}'></i>   
      </button>
      <button type="button " class='btn btn-outline-danger mr-1.5' name=${id}>
       <i class='fas fa-trash-alt name=${id}'></i>   
     </button>
    </div>
    <div class='card-body'>
     ${
       url &&
      `<img width=100% src=${url} alt='card image' class='card-img-top md-3 rounded-lg'/>`
     }
      <h4 class='card-title task__card__title'>${title}</h4>

      <p class='description trim-3-lines text-muted'>${description}</p>
      <div class='tags text-white d-flex flex-wrap'>
        <span class='badge text-bg-primary m-1'>${type}</span>
      </div>  
    </div>

    <div class='card-footer'>
      <button type='button' class='btn btn-outline-primary float-right data-bs-toggle="modal" data-bs-target="#showTask'>open task</button>
    </div>


  
   </div>

</div>
`;

// modal body on open task
const htmlModalContent = ({id,title,description,url})=> {
  const date=new Date(parseInt(id));
  return`
   <div id=${id}>
   ${
    url &&
   `<img width=100% src=${url} alt='card image' class='img-fluid place__holder__image mb-3'/>`
    }
    <strong class='text-muted text-sm'>Created on: ${date.toDateString()}</strong>
    <h2 class='my-3'>${title}</h2>
    <p class='text-muted'>${description}</p>
   
   
   </div>
  `;
};

const updateLocalStorage=()=>{
  localStorage.setItem(
    "Tasky",
    JSON.stringify({
      tasks: state.tasklist,
    })
  );
};

// load initial data
 const loadInitialData=()=>{
   const localStorageCopy=JSON.parse(localStorage.tasks);
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
    tags: document.getElementById("tags").value,
    taskDescription: document.getElementById("taskDesc").value,
   };
   taskContents.insertAdjacentHTML("beforeend",htmlTaskContent({...input,id,}));
   
   state.tasklist.push({...input,id,});
   updateLocalStorage();

 };
