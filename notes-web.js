display();
let addBtn = document.getElementById("add");
addBtn.addEventListener("click", function (e) {
    console.log("sanjana");
    let addTxt = document.getElementById("addtext");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    display();
});

function display() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        if (element.length != 0) {
            html += `
            <div class="card notes-card">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" class="delete-btn" onclick="deletenode(this.id)">Delete</button>
                </div>
            </div>
            `
        }
        else{
            notesObj.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notesObj));
        }

    });

    let noteselement = document.getElementById("notes");
    if (notesObj.length != 0) {
        noteselement.innerHTML = html;
    }
    else {
        noteselement.innerHTML = `Please write something to above to add notes here!!!`
    }
}

function deletenode(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    display();
}

let search = document.getElementById("search-text");
search.addEventListener("input", function () {
    const special = /[\\[{().+*?|^$]/g;
    let inputvalue = search.value.toLowerCase();
    let notes = document.getElementsByClassName("notes-card");
    Array.from(notes).forEach(function (element) {
        let text = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let p = element.getElementsByTagName("p")[0];
        if (text.includes(inputvalue)) {
            element.style.display = "inline-block";
            if(special.test(inputvalue)) inputvalue = inputvalue.replace(special, "\\$&");
            let regExp = new RegExp(inputvalue, "gi");
            p.innerHTML = (p.textContent).replace(regExp, "<mark>$&</mark>");
        }
        else {
            element.style.display = "none";
        }
    });
});