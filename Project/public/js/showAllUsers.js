document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const userList = document.getElementById("userList");
      responseData.forEach((user) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">${user.username}</h5>
                  <p class="card-text">
                      Email: ${user.email}
                  </p>
                  <a href="singleuserInfo.html?user_id=${user.id}" class="btn btn-primary">View Details</a>
              </div>
          </div>
          `;
        userList.appendChild(displayItem);
      });
    };
  
    fetchMethod(currentUrl + "/api/user", callback);
  });