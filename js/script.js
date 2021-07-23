// **********
// VARIABLES:
// **********
const body = document.querySelector("body");
const searchContainer = document.querySelector(".search-container");
const gallery = document.getElementById("gallery");
const randomUserUrl = "https://randomuser.me/api/?nat=us,dk,fr,gb&results=12";
let randomUserData;
let randomUserDataList;
const searchContainerContent = `<form action="#" method="get">
                                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                                    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                                </form>`;

// Create search container:
searchContainer.insertAdjacentHTML("beforeend", searchContainerContent);

// ***********************
// DATA FETCHING FROM API:
// ***********************
async function getRandomUserData() {
    try {
        const response = await fetch(randomUserUrl);
        randomUserData = await response.json();
        randomUserDataList = randomUserData.results;
        generateCardHTML(randomUserDataList);
    } catch (error) {
        console.log("Error when fetching random user data:", error);
    }
}
getRandomUserData();

// ********************
// CREATING USER CARDS:
// ********************
function generateCardHTML(data) {
    data.map((person) => {
        const cardContent = `
                            <div class="card">
                                <div class="card-img-container">
                                    <img class="card-img" src=${person.picture.medium} alt="profile picture">
                                </div>
                                <div class="card-info-container">
                                    <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                                    <p class="card-text">${person.email}</p>
                                    <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
                                </div>
                            </div>
                            `;
        gallery.insertAdjacentHTML("beforeend", cardContent);
    });
    // Add event listener to user cards:
    const cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", () => {
            generateModalHTML(i);
        });
    }
}

// *****************
// CREATING MODAL:
// *****************
function generateModalHTML(index) {
    // Set the person data for the modal to the index of the clicked card:
    const personData = randomUserDataList[index];
    // Format the birthday according to the requirements:
    const birthDayFullDate = new Date(personData.dob.date);
    const birthDay = `${
        birthDayFullDate.getMonth() + 1
    }/${birthDayFullDate.getDate()}/${birthDayFullDate.getFullYear()}`;
    // Create the HTML for the modal:
    const modalContent = `
                        <div class="modal-container">
                            <div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src=${
                                        personData.picture.large
                                    } alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${
                                        personData.name.first
                                    } ${personData.name.last}</h3>
                                    <p class="modal-text">${
                                        personData.email
                                    }</p>
                                    <p class="modal-text cap">${
                                        personData.location.city
                                    }</p>
                                    <hr>
                                    <p class="modal-text">${formatPhoneNumber(
                                        personData.cell
                                    )}</p>
                                    <p class="modal-text">${
                                        personData.location.street.number
                                    } ${personData.location.street.name}, ${
        personData.location.city
    }, ${personData.location.state} ${personData.location.postcode}</p>
                                    <p class="modal-text">Birthday: ${birthDay}</p>
                                </div>
                            </div>
                            <div class="modal-btn-container">
                                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                <button type="button" id="modal-next" class="modal-next btn">Next</button>
                            </div>
                        </div>
                        `;
    body.insertAdjacentHTML("beforeend", modalContent);
    // Event listener for modal close button:
    const modalCloseBtn = document.getElementById("modal-close-btn");
    modalCloseBtn.addEventListener("click", () => {
        document.querySelector(".modal-container").remove();
    });
    // Event listener for modal next button:
    const modalNextBtn = document.getElementById("modal-next");
    modalNextBtn.addEventListener("click", () => {
        // Check if there is a next data:
        if (index < randomUserDataList.length - 1) {
            document.querySelector(".modal-container").remove();
            generateModalHTML(index + 1);
        }
    });
    // Event listener for modal prev button:
    const modalPrevBtn = document.getElementById("modal-prev");
    modalPrevBtn.addEventListener("click", () => {
        // Check if there is a prev data:
        if (index > 0) {
            document.querySelector(".modal-container").remove();
            generateModalHTML(index - 1);
        }
    });
}
// EXTRA Event listener on body to close modal when clicked on black overlay:
body.addEventListener("click", (e) => {
    if (e.target.className === "modal-container") {
        document.querySelector(".modal-container").remove();
    }
});

// *****************
// SEARCH COMPONENT:
// *****************
const searchInput = document.getElementById("search-input");
const searchSubmitBtn = document.getElementById("search-submit");

searchInput.addEventListener("search", () => filterUserData());
searchInput.addEventListener("keyup", () => filterUserData());
searchSubmitBtn.addEventListener("click", () => filterUserData());

function filterUserData() {
    // Reset randomUserDataList to search-filtered data:
    randomUserDataList = randomUserData.results.filter((data) =>
        data.name.first
            .toLowerCase()
            .startsWith(searchInput.value.toLowerCase())
    );
    // Check if search input was empty -> reset to original data list:
    if (searchInput.value === "") {
        randomUserDataList = randomUserData.results;
    }
    // Remove existing user data on page:
    document.getElementById("gallery").innerHTML = "";
    // Recreate the cards with filtered or original user data:
    generateCardHTML(randomUserDataList);
}

// Helper function to format the phone number (found at Stackoverflow: https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript/41318684)
function formatPhoneNumber(phoneNumberString) {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{1,})$/); // changed this one to match phone numbers with less than 10 digits
    if (match) {
        return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return phoneNumberString; // changed this to return the given phone value if for some reason it cannot be transformed
}
