console.log("script.js is connected");

// Create search-container content:
const searchContainer = document.querySelector(".search-container");
const searchContainerContent = `<form action="#" method="get">
                                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                                    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                                </form>`;
searchContainer.insertAdjacentHTML("beforeend", searchContainerContent);

// Create gallery content:
const gallery = document.getElementById("gallery");
const galleryContent = `<div class="card">
                            <div class="card-img-container">
                                <img class="card-img" src="https://via.placeholder.com/90" alt="profile picture">
                            </div>
                            <div class="card-info-container">
                                <h3 id="name" class="card-name cap">first last</h3>
                                <p class="card-text">email</p>
                                <p class="card-text cap">city, state</p>
                            </div>
                        </div>`;
// gallery.insertAdjacentHTML("beforeend", galleryContent);

// Create modal content:
const body = document.querySelector("body");
const modal = `<div class="modal-container">
                    <div class="modal">
                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src="https://via.placeholder.com/125" alt="profile picture">
                            <h3 id="name" class="modal-name cap">name</h3>
                            <p class="modal-text">email</p>
                            <p class="modal-text cap">city</p>
                            <hr>
                            <p class="modal-text">(555) 555-5555</p>
                            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                            <p class="modal-text">Birthday: 10/21/2015</p>
                        </div>
                    </div>
                    <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                    </div>
                </div>`;
// body.insertAdjacentHTML("beforeend", modal);

// Fetch API experiments:
const randomUserUrl = "https://randomuser.me/api/?nat=us,dk,fr,gb&results=12";
let randomUserData;

async function getRandomUserData() {
    try {
        const response = await fetch(randomUserUrl);
        randomUserData = await response.json();
        generateCardHTML(randomUserData.results);
        // Add event listener to user cards:
        const cards = document.querySelectorAll(".card");
        // console.log(cards);
        for (let i = 0; i < cards.length; i++) {
            // console.log(cards[i]);
            cards[i].addEventListener("click", (e) => {
                console.log(e.target);
                console.log(i);
                console.log(randomUserData.results[i]);
                generateModalHTML(i);
            });
        }
    } catch (error) {
        console.log("Error when fetching random user data:", error);
    }
}

getRandomUserData().then(() => {
    console.log(randomUserData.results);
});

function generateCardHTML(data) {
    data.map((person) => {
        // console.log(person);
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
}

function generateModalHTML(index) {
    const personData = randomUserData.results[index];
    const birthDayFullDate = new Date(personData.dob.date);
    const birthDay = `${
        birthDayFullDate.getMonth() + 1
    }/${birthDayFullDate.getDate()}/${birthDayFullDate.getFullYear()}`;
    console.log(birthDay);
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
        console.log("clicked NEXT");
        // Check if there is a next data:
        if (index < 11) {
            document.querySelector(".modal-container").remove();
            generateModalHTML(index + 1);
        }
    });
    // Event listener for modal prev button:
    const modalPrevBtn = document.getElementById("modal-prev");
    modalPrevBtn.addEventListener("click", () => {
        console.log("clicked PREV");
        // Check if there is a prev data:
        if (index > 0) {
            document.querySelector(".modal-container").remove();
            generateModalHTML(index - 1);
        }
    });
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

// Search Component:
const searchInput = document.getElementById("search-input");
console.log(searchInput);
searchInput.addEventListener("keyup", () => {
    console.log(searchInput.value);
    console.log(randomUserData.results);
    const filteredUserData = randomUserData.results.filter((data) =>
        data.name.first.toLowerCase().startsWith(searchInput.value)
    );
    console.log(filteredUserData);
    // First remove user data on page:
    document.getElementById("gallery").innerHTML = "";
    generateCardHTML(filteredUserData);
});
