document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const messageList = document.getElementById("messageList");
      responseData.forEach((message) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p class="card-text">
                        Text: ${message.message_text}
                    </p>
                    <a href="singlemessageInfo.html?message_id=${message.id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
            `;
        messageList.appendChild(displayItem);
      });
    };
  
    fetchMethod(currentUrl + "/api/message", callback);
  });