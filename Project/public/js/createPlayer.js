document.addEventListener("DOMContentLoaded", function () {
  const createPlayerForm = document.getElementById("createPlayerForm");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  // Function to get user ID from localStorage (you may need to adjust this based on your authentication mechanism)
  function getUserId() {
    const token = localStorage.getItem("token");

    // Assuming your JWT payload has a field 'userId'
    const decodedToken = jwt_decode(token);
    return decodedToken.userId;
  }

  createPlayerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const playerName = document.getElementById("playerName").value;
    const userId = getUserId();

    // Perform player creation logic
    const data = {
      name: playerName,
      level: 1,
    };

    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus === 200) {
        // player creation successful
        warningCard.classList.add("d-none");
        // You can redirect to a different page or update the UI as needed
        window.location.href = "/profile.html";
      } else {
        // Display warning if player creation fails
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.message;
      }
    };

    // Perform player creation request
    fetchMethod(currentUrl + `/api/user/${userId}/player`, callback, "POST", data);

    // Reset the form fields
    createPlayerForm.reset();
  });
});