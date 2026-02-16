document.addEventListener("DOMContentLoaded",()=>{
document.querySelector(".main-form").addEventListener('submit',async(e)=>{
    e.preventDefault();
    let button=document.querySelector("#submit");
    let name=document.querySelector('input[name="name"]').value;
    if(name==""){
        alert("Name can't be empty");
    }
    let phone=document.querySelector('input[name="phonenumber"]').value;
    if(phone.length!=10){
        alert("Phone no. can't be empty");
    }
    let email=document.querySelector('input[name="email"]').value;
    if(email==""){
        alert("email can't be empty");
    }
    let experience=document.querySelector('select[name="experience"]').value;
    
    let experienceYear=document.querySelector('input[name="exp-year"]').value;
    
    let countrycode=document.querySelector('select[name="country-code"]').value;

    let details={
        name:name,
        phone:countrycode+phone,
        email:email,
        experience:experience,
        experienceYear:experienceYear

    }
    
    button.innerHTML = "Submitting...";

    await new Promise(resolve => 
        setTimeout(resolve, 2000)
    );

    button.innerHTML = "Submit";
    console.log(details);
    
    e.target.reset(); 
});


})
