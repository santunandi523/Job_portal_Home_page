document.addEventListener("DOMContentLoaded", function(){

    const createBtn = document.getElementById("createJobBtn");
    const jobContainer = document.getElementById("jobContainer");
    const searchBar = document.getElementById("searchBar");

    // 🔵 CREATE CARD
    createBtn.addEventListener("click", function(){

        let title = prompt("Enter Job Title:");
        if(!title) return;
        let req1=prompt("Requirement 1:");
        let req2=prompt("Requirement 2:");
        let req3=prompt("Requirement 3:");

        let imagePath = prompt("Enter Company Logo Path:");

        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="text">
                <h2>Job Details</h2>
                <p>${title}</p>

                <h3>Requirements</h3>
                <ul>
                    <li>${req1}</li>
                    <li>${req2}</li>
                    <li>${req3}</li>
                </ul>

                <div class="bottom">
                    <button class="updateBtn">Update</button>
                    <button class="deleteBtn">Delete</button>
                </div>
            </div>

            <div class="companyimage">
                <img src="${imagePath}">
            </div>
        `;

        jobContainer.appendChild(card);
    });


    //UPDATE + DELETE (Event Delegation)
    jobContainer.addEventListener("click", function(e){

        if(e.target.classList.contains("updateBtn")){

        let card = e.target.closest(".card");

        //Update Title
        let titleElement = card.querySelector(".text p");
        let newTitle = prompt("Update Title:", titleElement.innerText);

        if(newTitle && newTitle.trim() !== ""){
            titleElement.innerText = newTitle;
        }

        //Update Requirements
        let listItems = card.querySelectorAll("ul li");

        listItems.forEach((li, index) => {
            let updatedRequirement = prompt(
                `Update Requirement ${index + 1}:`,
                li.innerText
            );

            if(updatedRequirement && updatedRequirement.trim() !== ""){
                li.innerText = updatedRequirement;
            }
        });

        //Update Image
        let img = card.querySelector("img");
        let newImg = prompt("Update Image Path:", img.getAttribute("src"));

        if(newImg && newImg.trim() !== ""){
            img.setAttribute("src", newImg);
        }
    }
    });



    // 🔍 SEARCH FUNCTIONALITY
    searchBar.addEventListener("keyup", function(){

    let value = searchBar.value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(function(card){

        let title = card.querySelector(".text p").innerText.toLowerCase();

        // Get all requirement texts
        let listItems = card.querySelectorAll("ul li");
        let requirementsText = "";

        listItems.forEach(function(li){
            requirementsText += li.innerText.toLowerCase() + " ";
        });

        if(title.includes(value) || requirementsText.includes(value)){
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }

    });

});

});