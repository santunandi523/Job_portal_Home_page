document.addEventListener("DOMContentLoaded", function(){

    const createBtn = document.getElementById("createJobBtn");
    const jobContainer = document.getElementById("jobContainer");

    createBtn.addEventListener("click", function(){

        let title = prompt("Enter Job Title:");
        if(!title) return;

        let req1 = prompt("Enter Requirement 1:");
        let req2 = prompt("Enter Requirement 2:");
        let req3 = prompt("Enter Requirement 3:");

        let imagePath = prompt("Enter Company Logo Image Path:");

        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="text">
                <h2>Job Details</h2>
                <p>${title}</p>

                <h3>Requirements</h3>
                <ul>
                    <li>${req1 || ""}</li>
                    <li>${req2 || ""}</li>
                    <li>${req3 || ""}</li>
                </ul>

                <div class="bottom">
                    <button class="applyBtn">Apply</button>
                    <button class="updateBtn">Update</button>
                    <button class="deleteBtn">Delete</button>
                </div>
            </div>

            <div class="companyimage">
                <img src="${imagePath}" alt="Company Logo">
            </div>
        `;

        jobContainer.appendChild(card);
    });


    // UPDATE & DELETE (Event Delegation)
    jobContainer.addEventListener("click", function(e){

        // DELETE
        if(e.target.classList.contains("deleteBtn")){
            let card = e.target.closest(".card");
            card.remove();
        }

    // UPDATE
    if(e.target.classList.contains("updateBtn")){

        let card = e.target.closest(".card");

        // Update Job Title
        let titleElement = card.querySelector(".text p");
        let newTitle = prompt("Update Job Title:", titleElement.innerText);
        if(newTitle && newTitle.trim() !== ""){
            titleElement.innerText = newTitle;
        }

        // Update Requirements
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

        // Update Company Image
        let imageElement = card.querySelector(".companyimage img");
        let newImagePath = prompt(
            "Enter New Company Logo Image Path:",
            imageElement.getAttribute("src")
        );

        if(newImagePath && newImagePath.trim() !== ""){
            imageElement.setAttribute("src", newImagePath);
        }
    }

    });

});