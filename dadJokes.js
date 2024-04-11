// Define variables for elements
const nextJokeBtn = document.getElementById("joke-btn");
const jokeElement = document.getElementById("joke");
const favoritesList = document.getElementById("favorites-list");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const clearFavoritesBtn = document.getElementById("clear-favorites-btn");
const jokeApi = "https://icanhazdadjoke.com/";

// Array to store favorite jokes
let favoriteJokes = [];

// Function to add joke to favorites
function addToFavorites(jokeText) {
    // Check if joke is already in favorites
    if (!favoriteJokes.includes(jokeText)) {
        favoriteJokes.push(jokeText);
        // Update local storage with new favorite joke
        localStorage.setItem("favoriteJokes", JSON.stringify(favoriteJokes));
        // Update favorites list
        displayFavorites();
    }
}

// Function to display favorite jokes
function displayFavorites() {
    // Clear existing favorites list
    favoritesList.innerHTML = "";
    // Create new list items for each favorite joke
    favoriteJokes.forEach(joke => {
        const listItem = document.createElement("div");
        listItem.classList.add("favorite-item");
        listItem.textContent = joke;
        favoritesList.appendChild(listItem);
    });
}

// Load favorite jokes from local storage on page load
window.onload = function() {
    if (localStorage.getItem("favoriteJokes")) {
        favoriteJokes = JSON.parse(localStorage.getItem("favoriteJokes"));
        displayFavorites();
    }
};

// Function to fetch joke from API
async function fetchJokeFromAPI() {
    try {
        const response = await fetch(jokeApi, {
            headers: {
                Accept: "application/json",
            },
        });
        const data = await response.json();
        const joke = data.joke;
        return joke; // Ensure the function returns a string value
    } catch (error) {
        console.error("Error fetching joke:", error);
        return "Failed to fetch joke. Please try again later."; // Return a default error message as a string
    }
}

// Event listener for Next Joke button
nextJokeBtn.addEventListener("click", async () => {
    const joke = await fetchJokeFromAPI();
    jokeElement.textContent = joke;
});

// Event listener for adding joke to favorites on click
jokeElement.addEventListener("click", () => {
    const jokeText = jokeElement.textContent;
    addToFavorites(jokeText);
});

// Event listener for clearing all favorite jokes
clearFavoritesBtn.addEventListener("click", () => {
    // Clear the favorite jokes array
    favoriteJokes = [];
    // Update local storage to reflect the change
    localStorage.removeItem("favoriteJokes");
    // Update the UI to reflect the changes (clear favorites list)
    displayFavorites();
});

// Dark mode event listener
darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
});
