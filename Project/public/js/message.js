const comments = [
    {
        name: "Danny",
        comment:
            "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        time: "Thu Jan 12 2022",
    },
    {
        name: "Jackson",
        comment: "Lorem Ipsum dolor sit amet, consectetur adipiscing elit",
        time: "Thu Jan 11 2022",
    },
];

const commentsBox = document.querySelector("#comments");
let nameInput = document.querySelector("#name");
let commentInput = document.querySelector("#comment");
const btnSubmit = document.querySelector("#btn-submit");
const btnClose = document.querySelector(".btn-close");

const rennderComments = function (comments) {
    commentsBox.innerHTML = ""
    comments.forEach((item) => {
        commentsBox.insertAdjacentHTML(
            'beforeend',
            `<hr />
          <h4>
              <span>${item.name}</span>
              <span class="date">${item.time}</span>
          </h4>
          <p>${item.comment}</p>
          `
        )

    }
    )
}



let isClosed = false;
btnClose.onclick = function () {
    if (!isClosed) {
        btnClose.textContent = "开启留言";
    } else {
        btnClose.textContent = "关闭留言";
    }
    nameInput.disabled = !nameInput.disabled;
    commentInput.disabled = !commentInput.disabled;
    btnSubmit.disabled=!btnSubmit.disabled;
    isClosed = !isClosed;
}