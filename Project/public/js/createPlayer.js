function getUserId() {
  // Get the JWT token from local storage
  const token = localStorage.getItem("token");

  // Check if the token exists
  if (token) {
    try {
      // Decode the JWT token (assuming it's in the format "Bearer <token>")
      const [, encodedPayload] = token.split(" ");
      const payload = JSON.parse(atob(encodedPayload));

      // Extract user ID from the payload
      const userId = payload.userId;

      return userId;
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  }

  // Return null if token doesn't exist or decoding fails
  return null;
}

document.addEventListener("DOMContentLoaded", function () {
  const createPlayerForm = document.getElementById("createPlayerForm");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

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
    fetchMethod(currentUrl + "/api/user/${userId}/player", callback, "POST", data);

    // Reset the form fields
    createPlayerForm.reset();
  });
});