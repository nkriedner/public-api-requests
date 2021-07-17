console.log("script.js is connected");

// Create search-container content:
const searchContainer = document.querySelector(".search-container");
const searchContainerContent = `<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                                </form>`;
searchContainer.insertAdjacentHTML("beforeend", searchContainerContent);
