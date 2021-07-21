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
const randomUserUrl = "https://randomuser.me/api/?results=12";
let randomUserData;

async function getRandomUserData() {
    try {
        const response = await fetch(randomUserUrl);
        randomUserData = await response.json();
        generateCardHTML(randomUserData.results);
        // Add event listener to user cards:
        const cards = document.querySelectorAll(".card");
        console.log(cards);
        for (let i = 0; i < cards.length; i++) {
            console.log(cards[i]);
            cards[i].addEventListener("click", (e) => {
                console.log(e.target);
                console.log(i);
                console.log(randomUserData.results[i]);
                generateModalHTML(randomUserData.results[i]);
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

function generateModalHTML(personData) {
    console.log(personData.picture.large);
    const modalContent = `
                        <div class="modal-container">
                            <div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src=${personData.picture.large} alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${personData.name.first} ${personData.name.last}</h3>
                                    <p class="modal-text">${personData.email}</p>
                                    <p class="modal-text cap">${personData.location.city}</p>
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
                        </div>
                        `;
    body.insertAdjacentHTML("beforeend", modalContent);
}
