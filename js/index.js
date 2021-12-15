function eventListeners() {
    const form = document.getElementById("comment-form");
    const feedback = document.querySelector(".feedback");
    const commentInput = document.getElementById("comment-input");
    const commentList = document.getElementById("comment-list");
    //let data = [];
    let id;
    let type = ''

    //new ui instance
    const ui = new UI();
    //retrieve comments from local storage
    let data = ui.retrieveLocalStorage();
    if (data.length > 0) {
        id = (data[(data.length - 1)].id) + 1;
    } else {
        id = 1;
    }
    data.forEach(function (comment) {
        ui.addComment(commentList, comment);
    })
    //add comment
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const commentValue = commentInput.value;

        if (commentValue === '') {
            feedback.classList.add('showItem', 'alert-danger');
            feedback.textContent = 'cannot add empty values';

            setTimeout(function () {
                feedback.classList.remove('alert-danger', 'showItem');
            }, 3000)
        } else {
            const comment = new Comment(id, commentValue, 'lakshmi', './img/profile.png');
            if (type == 'reply') {
                console.log(id)
                // comment.reply=
            } else {
                data.push(comment);

            }
            ui.addToLocalStorage(data);
            id++;
            ui.addComment(commentList, comment)
            ui.clearFields(commentInput);
        }
    });
    //work with a comment
    commentList.addEventListener('click', function (event) {
        event.preventDefault();
        if (event.target.classList.contains('delete')) {
            let id = event.target.dataset.id;

            commentList.removeChild(event.target.parentElement.parentElement.parentElement);
            // rest of data
            let tempData = data.filter(function (item) {
                return item.id !== parseInt(id);
            });
            data = tempData;
            ui.addToLocalStorage(data);

        } else if (event.target.classList.contains('edit')) {
            //delete comment from DOM
            let id = event.target.dataset.id;
            commentList.removeChild(event.target.parentElement.parentElement.parentElement);

            const tempcomment = data.filter(function (item) {
                return item.id === parseInt(id);
            });
            // rest of data
            let tempData = data.filter(function (item) {
                return item.id !== parseInt(id);
            });
            data = tempData;
            commentInput.value = tempcomment[0].message;
        } else if (event.target.classList.contains('reply')) {
            //delete comment from DOM
            let id = event.target.dataset.id;
            commentList.removeChild(event.target.parentElement.parentElement.parentElement);

            const tempcomment = data.filter(function (item) {
                return item.id === parseInt(id);
            });
            // rest of data
            let tempData = data.filter(function (item) {
                return item.id !== parseInt(id);
            });
            data = tempData;
            type = 'reply'

            // commentInput.value = tempcomment[0].message;
        }
    });
}

function UI() {
    UI.prototype.addComment = function (element, comment) {
        const div = document.createElement('div');
        // div.classList.add('col-md-4');
        div.innerHTML = `<div class="card card-body flashcard my-3">
        <div class="flex">
            <img src="${comment.picture}" class="profile-img"/>
            <div class="column-flex">
            <h4 class="text-capitalize">${comment.user}</h4>
            <p class="answer mb-3 showItem">${comment.message}</p>

            </div>
        </div>
        <div class="flashcard-btn d-flex">
   
         <a href="#" id="edit" class=" btn my-1 edit text-uppercase" data-id="${comment.id}">edit</a>
         <a href="#" id="delete" class=" btn my-1 delete text-uppercase" data-id="${comment.id}">delete</a>
         <a href="#" id="reply" class=" btn my-1 reply text-uppercase" data-id="${comment.id}">Reply</a>
        </div>
       </div>`;
        element.appendChild(div);
    }
    //add to Local Storage
    UI.prototype.addToLocalStorage = function (data) {
        localStorage.clear();
        // img="../img/"
        const dataJSON = JSON.stringify(data);
        localStorage.setItem('comments', dataJSON)
    }
    //retrieve from localStorage
    UI.prototype.retrieveLocalStorage = function () {
        let savedcomments = localStorage.getItem('comments');
        if (savedcomments) {
            const savedcommentsParsed = JSON.parse(savedcomments);
            return savedcommentsParsed;
        } else {
            return savedcomments = [];
        }

    }

    //clear fields
    UI.prototype.clearFields = function (comment) {
        comment.value = '';
        // answer.value = '';
    }
}
//Constructor function responsible for each comment
function Comment(id, message, user, picture) {
    this.id = id;
    this.message = message;
    this.user = user;
    this.picture = picture;
}
// dom event listener to run when content is loaded
document.addEventListener('DOMContentLoaded', function () {
    eventListeners();
})
comment={
id:1,
message:'hi',
user:'lakshmi',
picture:'sample.png',
reply:[]
}