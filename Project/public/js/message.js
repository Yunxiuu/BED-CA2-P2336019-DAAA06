document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("messageForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const message = document.getElementById("message").value;

        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            if (responseStatus == 200) {
                // Check if signup was successful
                if (responseData.token) {
                    // Store the token in local storage
                    localStorage.setItem("token", responseData.token);
                    // Redirect or perform further actions for logged-in user
                    window.location.href = "message.html";
                }
            } else {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message;
            }
        };

        // Perform signup request
        fetchMethod(currentUrl + "/api/message", callback, "POST", data);

        // Reset the form fields
        messageForm.reset();
    })
})