document.addEventListener("DOMContentLoaded",function(){

const browseBtn=document.getElementById("browseBtn");
const postBtn=document.getElementById("postBtn");
const homeBtn=document.getElementById("homeBtn");

const startScreen=document.getElementById("startScreen");
const jobForm=document.getElementById("jobForm");
const main=document.getElementById("mainSection");

const submitJob=document.getElementById("submitJob");
const jobContainer=document.getElementById("jobContainer");
const searchBar=document.getElementById("searchBar");

// HOME BUTTON
homeBtn.onclick=function(){

startScreen.style.display="flex";
jobForm.style.display="none";
main.style.display="none";

};

// BROWSE JOBS
browseBtn.onclick=function(){

startScreen.style.display="none";
main.style.display="flex";

};

// POST JOB
postBtn.onclick=function(){

startScreen.style.display="none";
jobForm.style.display="flex";

};

// SUBMIT JOB
submitJob.onclick=function(){

let title=document.getElementById("jobTitle").value;
let desc=document.getElementById("jobDesc").value;
let eligibility=document.getElementById("jobEligibility").value;
let image=document.getElementById("jobImage").value;

if(title==="") return;

let card=document.createElement("div");
card.classList.add("card");

card.innerHTML=`

<div class="text">

<h2>Job Details</h2>

<p>${title}</p>

<h3>Description</h3>
<p class="desc">${desc}</p>

<h3>Eligibility</h3>
<p class="eligibility">${eligibility}</p>

<div class="bottom">
<button class="updateBtn">Update</button>
<button class="deleteBtn">Delete</button>
</div>

</div>

<div class="companyimage">
<img src="${image}">
</div>

`;

jobContainer.appendChild(card);

jobForm.style.display="none";
main.style.display="flex";

};

// UPDATE + DELETE
jobContainer.addEventListener("click",function(e){

let card=e.target.closest(".card");

if(e.target.classList.contains("deleteBtn")){
card.remove();
}

if(e.target.classList.contains("updateBtn")){

let title=card.querySelector(".text p");
let newTitle=prompt("Update Title",title.innerText);
if(newTitle) title.innerText=newTitle;

let desc=card.querySelector(".desc");
let newDesc=prompt("Update Description",desc.innerText);
if(newDesc) desc.innerText=newDesc;

let el=card.querySelector(".eligibility");
let newEl=prompt("Update Eligibility",el.innerText);
if(newEl) el.innerText=newEl;

}

});

// SEARCH
searchBar.addEventListener("keyup",function(){

let value=searchBar.value.toLowerCase();
let cards=document.querySelectorAll(".card");

cards.forEach(card=>{

let title=card.querySelector(".text p").innerText.toLowerCase();
let desc=card.querySelector(".desc").innerText.toLowerCase();
let el=card.querySelector(".eligibility").innerText.toLowerCase();

if(title.includes(value) || desc.includes(value) || el.includes(value)){
card.style.display="flex";
}else{
card.style.display="none";
}

});

});

});
