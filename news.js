// 1. Select HTML Elements

const newsContainer = document.getElementById("newsContainer");

const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");

const categoryButtons = document.querySelectorAll(".categories button");


// 2. API Key

const API_KEY = "YOUR_API_KEY";

// 3. Fetch News Function

async function fetchNews(query) {

    newsContainer.innerHTML = "<h2>Loading News...</h2>";

    try {

        // API URL

        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;

        // Fetch API

        const response = await fetch(url);

        // Convert JSON

        const data = await response.json();

        // Check Error

        if (!response.ok) {
            throw new Error(data.message || "Unable to fetch news");
        }

        // Display News

        displayNews(data.articles);

    }

    catch (error) {

        newsContainer.innerHTML = `
        <div class= "error-message">
        <h2>Oops! something went wrong </h2>
        <p>${error.message}</p>
        <button onclick="fetchNews()">Try Again </button>
        </div>`;
        console.log(error);

    }

}


// 4. Display News Function

function displayNews(articles) {

    newsContainer.innerHTML = "";

    if (!articles || articles.length === 0) {

        newsContainer.innerHTML = "<h2>No News Found</h2>";

        return;

    }

    articles.forEach((article) => {

        const newsCard = document.createElement("div");

        newsCard.classList.add("news-card");

        newsCard.innerHTML = `

            <img 
                src="${article.urlToImage || 'https://placehold.co/300x180'}"
                alt="News Image"
            >

            <h2>${article.title || "No Title"}</h2>

            <p>${article.description || "No Description Available"}</p>

            <a href="${article.url}" target="_blank">
                <button>Read More</button>
            </a>

        `;

        newsContainer.appendChild(newsCard);

    });

}


// 5. Search News Function

searchBtn.addEventListener("click", () => {

    const query = searchInput.value.trim();

    if (query !== "") {

        fetchNews(query);

    }

});


// 6. Enter Key Search

searchInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {

        searchBtn.click();

    }

});


// 7. Category Filter

categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const category = button.textContent.trim();

        fetchNews(category);

    });

});


// 8. Default News

fetchNews("technology");