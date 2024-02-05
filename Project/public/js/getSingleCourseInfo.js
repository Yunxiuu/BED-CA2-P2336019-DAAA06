document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const courseId = urlParams.get("course_id");

  const callbackForcourseInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const courseInfo = document.getElementById("courseInfo");

    if (responseStatus == 404) {
      courseInfo.innerHTML = `${responseData.message}`;
      return;
    }

    courseInfo.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <p class="card-text">
                  Course ID: ${responseData.course_id} <br>
                      Course Name: ${responseData.name} <br>
                      Professor: ${responseData.professor} <br>
                      Description: ${responseData.description} <br>
                  </p>
              </div>
          </div>
      `;
  };

  fetchMethod(currentUrl + `/api/course/${courseId}`, callbackForcourseInfo);
});