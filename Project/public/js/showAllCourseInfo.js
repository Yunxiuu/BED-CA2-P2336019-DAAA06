document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const courseList = document.getElementById("courseList");
    responseData.forEach((course) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">${course.course_name}</h5>
                  <p class="card-text">
                      Professor: ${course.professor}
                      Description: ${course.description}
                  </p>
                  <a href="singleCourseInfo.html?course_id=${course.id}" class="btn btn-primary">View Details</a>
              </div>
          </div>
          `;
      courseList.appendChild(displayItem);
    });
  };

  fetchMethod(currentUrl + "/api/course", callback);
});