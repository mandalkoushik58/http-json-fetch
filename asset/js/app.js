let cl=console.log;

let baseUrl=`http://localhost:3000/posts`;

const postContainer=document.getElementById("postContainer");
const postForm=document.getElementById("postForm");
const titleControl=document.getElementById("title");
const contentControl=document.getElementById("content");
const submitBtn=document.getElementById("submitBtn");
const updateBtn=document.getElementById("updateBtn");



const templating =(arr)=>{
    let result="";
    arr.forEach(obj => {
        result+=`<div class="card mb-4" id="${obj.id}">
        <div class="card-header">
            <h3>${obj.title}</h3>
        </div>
        <div class="card-body">
            <p>
             ${obj.body}
            </p>
        </div>
        <div class="card-footer text-right">
            <button class="btn btn-primary" onclick='onEdit(this)'>edit</button>
            <button class="btn btn-danger" onclick='onDelete(this)'>delete</button>
        </div>
        </div>`
    })
    postContainer.innerHTML=result;
}

/*fetch(baseUrl,{
method:"GET",
body:"null",
headers:{
    "content-type":"appliction/json",
    "authorization":"get token from LS"

}

})
.then(res=> res.json())
.then(data =>{
    templating(data)
})
.catch(cl)*/


const makeApiCall= async(methodName,apiUrl,msgBody)=> {
       const res= await  fetch(apiUrl,{
            method:methodName,
            body:JSON.stringify(msgBody),
            headers:{
                "content-type":"application/json",
                "authorization":"get token from LS"
            }
            
         })
         return await res.json();
}
makeApiCall("GET",baseUrl)
.then(data=> {
   // cl(data)
    templating(data)
})
.catch(cl)

const onPostSubmt=(eve)=>{
  eve.preventDefault();
  let obj={
    title:titleControl.value,
     body:contentControl.value,
     userId:Math.ceil(Math.random()*10)
  }
  makeApiCall("POST",baseUrl,obj)
  .then(res=>{
    cl(res)
    
  })
  .catch((err)=>{
    cl(err)
  })
}

const onEdit=(ele)=>{
  cl(ele);
  let cardId=ele.closest(".card").id;
  localStorage.setItem("updateId",cardId);
  let editUrl=`${baseUrl}/${cardId}`;

  makeApiCall("GET",editUrl)
  .then((res)=>{
     titleControl.value=res.title;
     contentControl.value=res.body;
     submitBtn.classList.add("d-none");
     updateBtn.classList.remove("d-none")
  })
  .catch(cl)
}


const onUpdatebtn=()=>{
   // cl("update!!!")
    let updateId=localStorage.getItem("updateId");
    let updatedUrl=`${updatedUrl}/${updateId}`;
    let updateObj={
        title:titleControl.value,
        body:contentControl.value,
    }
    makeApiCall("PATCH",updatedUrl,updateObj)
    .then(cl)
    .catch(cl)
}

const onDelete=(ele)=>{
    let deleteId=ele.closest(".card").id;
    let deleteUrl=`${baseUrl}/${deleteId}`

    makeApiCall("DELETE",deleteUrl)
    .then(cl)
    .catch(cl)

}



postForm.addEventListener("submit",onPostSubmt);
updateBtn.addEventListener("click",onUpdatebtn);