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

//search

    const headerSearch = document.getElementById("searchbar");
    const roleSelect = document.getElementById("role");
    const skillInput = document.getElementById("skill");
    const companyInput = document.getElementById("company");
    const searchBtn = document.getElementById("search");

    const cards = document.querySelectorAll(".card");
    searchBtn.addEventListener("click", filterJobs);

    function filterJobs() {

        let headerText = headerSearch.value.toLowerCase();
        let roleText = roleSelect.options[roleSelect.selectedIndex]?.text.toLowerCase() || "";
        let skillText = skillInput.value.toLowerCase();
        let companyText = companyInput.value.toLowerCase();

        cards.forEach(card => {

            let cardText = card.innerText.toLowerCase();

            let matchHeader = cardText.includes(headerText);
            let matchRole = roleText === "--select--" || cardText.includes(roleText);
            let matchSkill = cardText.includes(skillText);
            let matchCompany = cardText.includes(companyText);

            if (matchHeader && matchRole && matchSkill && matchCompany) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }

        });

    }

    // Header search (live typing)
    headerSearch.addEventListener("keyup", filterJobs);

    // Form search button
    searchBtn.addEventListener("click", filterJobs);



});
