// Calling the popup layout and content (corrected variable names to match HTML)
var popupLayout = document.querySelector(".popup-layout");
var popupContainer = document.querySelector(".popup-content");

// Adding the button to add book name, title
var addBtn = document.getElementById("adding-btn");
addBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    popupLayout.style.display = "block"; // Show the dark overlay
    popupContainer.style.display = "block"; // Show the popup form
});

// Adding close button to close the screen
var closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    popupLayout.style.display = "none"; // Hide the dark overlay
    popupContainer.style.display = "none"; // Hide the popup form
    // Optional: Clear form fields when closing without adding
    document.getElementById("Book-name-input").value = "";
    document.getElementById("Author-name-input").value = "";
    document.getElementById("Description-box").value = "";
    document.getElementById("linktag").value = "";
});

// Reading the main container where book cards will be displayed
var mainContainer = document.querySelector(".main-container");

/**
 * Function to attach a delete event listener to a given book element.
 * This function is reusable for both static and dynamically created books.
 * @param {HTMLElement} bookElement The div element representing a single book.
 */
function attachDeleteListener(bookElement) {
    const deleteButton = bookElement.querySelector('.delete-btn');
    if (deleteButton) { // Ensure the delete button exists within the book element
        deleteButton.addEventListener('click', function() {
            bookElement.remove(); // Remove the entire book div from the DOM
        });
    }
}

// Attach delete listeners to all *existing* book containers when the page loads.
// This ensures that the pre-defined books (Harry Potter, Lord of the Rings, Verity) are deletable.
document.querySelectorAll(".book-container").forEach(book => {
    attachDeleteListener(book);
});

// Get input elements from the add book form
var bookNameInput = document.getElementById("Book-name-input");
var authorNameInput = document.getElementById("Author-name-input");
var descriptionInput = document.getElementById("Description-box");
var linkTagInput = document.getElementById("linktag");

// Event listener for the "Add" button inside the popup form
var addButton = document.getElementById("add-btn");
addButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Input validation: Ensure Book Name is not empty
    if (!bookNameInput.value.trim()) {
        alert("Book Name is required!"); // Use a custom modal instead of alert for better UX in a real app
        bookNameInput.focus(); // Focus on the input field
        return; // Stop the function if validation fails
    }

    // Create a new div element for the book
    var newBookDiv = document.createElement("div");
    newBookDiv.setAttribute("class", "book-container"); // Assign the class for styling

    // Sanitize and validate the book link
    let readMoreLink = linkTagInput.value.trim();
    // Prepend 'http://' if the link is not empty and doesn't start with http(s)://
    if (readMoreLink && !readMoreLink.startsWith("http://") && !readMoreLink.startsWith("https://")) {
        readMoreLink = "http://" + readMoreLink;
    }
    // Create the anchor tag HTML only if a link is provided
    const linkHtml = readMoreLink ? `<a href="${readMoreLink}" target="_blank">Read More</a>` : '';

    // Populate the new book div with content from the form inputs
    newBookDiv.innerHTML = `
        <h1>${bookNameInput.value}</h1>
        <h4>${authorNameInput.value}</h4>
        <br>
        <p>${descriptionInput.value}</p>
        ${linkHtml} <!-- Dynamically include the link if available -->
        <br>
        <button class="delete-btn">Delete</button>
    `;

    // Hide the popup after adding the book
    popupLayout.style.display = "none";
    popupContainer.style.display = "none";

    // Append the newly created book div to the main container
    mainContainer.append(newBookDiv);

    // Clear the input fields after adding the book for the next entry
    bookNameInput.value = "";
    authorNameInput.value = "";
    descriptionInput.value = "";
    linkTagInput.value = "";

    // Attach the delete functionality to the delete button of the newly created book
    attachDeleteListener(newBookDiv);
});
