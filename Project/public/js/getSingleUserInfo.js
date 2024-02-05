document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const userId = urlParams.get("user_id");

  const callbackForuserInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const userInfo = document.getElementById("userInfo");

    if (responseStatus == 404) {
      userInfo.innerHTML = `${responseData.message}`;
      return;
    }

    userInfo.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <p class="card-text">
                  user ID: ${responseData.id} <br>
                      username: ${responseData.username} <br>
                      email: ${responseData.email} <br>
                      Created On: ${responseData.created_on} <br>
                  </p>
              </div>
          </div>
      `;
  };

  fetchMethod(currentUrl + `/api/user/${userId}`, callbackForuserInfo);
});