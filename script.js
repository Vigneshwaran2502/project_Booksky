
//callin the popup layout and content
var popoplayout = document.querySelector(".popup-layout");
var popopcontainer = document.querySelector(".popup-content");

//adding the button to add book name,title
var addbtn = document.getElementById("adding-btn");
addbtn.addEventListener("click", function(event) {
    event.preventDefault();
    popoplayout.style.display = "block";
    popopcontainer.style.display = "block";
});

//adding close button to close the screen
var closebtn = document.getElementById("close-btn");
closebtn.addEventListener("click", function(event) {
    event.preventDefault();
    popoplayout.style.display = "none";
    popopcontainer.style.display = "none";
});

//reading the main container and book container
var maincontainer = document.querySelector(".main-container");

//get the input from the user 
var bookname = document.getElementById("Book-name-input");
var Authorname = document.getElementById("Author-name-input");
var description = document.getElementById("Description-box");
var linktag = document.getElementById("linktag");

//adding the content to the main container
var addbutton = document.getElementById("add-btn");
addbutton.addEventListener("click", function(event) {
    event.preventDefault();
    if (!bookname.value.trim()) {
        alert("Book Name is required!");
        bookname.focus();
        return;
    }
    var div = document.createElement("div");
    div.setAttribute("class", "book-container");
    div.innerHTML = `<h1>${bookname.value}</h1>
    <h4>${Authorname.value}</h4>
    <br>
    <p>${description.value}</p>
    <a href="${linktag.value}" target="_blank">Read More</a>
    <br>
    <button class="delete-btn">Delete</button>`;
    popoplayout.style.display = "none";
    popopcontainer.style.display = "none";

    //appending the data in the maincontainer
    maincontainer.append(div);

    // Clear the input fields after adding the book
    bookname.value = "";
    Authorname.value = "";
    description.value = "";
    linktag.value = "";
});

// Event delegation for delete buttons
maincontainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        event.target.parentElement.remove();
    }
});