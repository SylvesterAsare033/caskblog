

const apiKey = "pub_5845288622d66f260848c1d1d3cadeea66ef5";
const categories = {
    entertainment: "World",
    ghana: "Ghana",
    sports: "Sports",
    world: "Entertainment",
    technology: "Technology"
};

async function fetchCategoryNews(category, elementId) {
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${category}&language=en`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const newsContainer = document.getElementById(elementId).querySelector(".news-items");

        newsContainer.innerHTML = ""; // Clear previous news items
        data.results.slice(0, 3).forEach(article => {
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");
            newsItem.innerHTML = `
                <img src="${article.image_url || 'https://via.placeholder.com/50'}" alt="News Thumbnail">
                <div class="news-content">
                    <p class="source">${article.source_id}</p>
                    <p>${article.title}</p>
                    <p class="time">${new Date(article.pubDate).toLocaleDateString()}</p>
                </div>
            `;
            newsContainer.appendChild(newsItem);
        });
    } catch (error) {
        console.error(`Error fetching news for ${category}:`, error);
    }
}

async function fetchTopStories() {
    const url = `https://newsdata.io/api/1/news?apikey=pub_5845288622d66f260848c1d1d3cadeea66ef5&country=gh&language=en&category=education,politics `;
    const response = await fetch(url);
    const data = await response.json();
    const mainStoryContainer = document.getElementById("main-story");
    const subStoriesContainer = document.getElementById("sub-stories");

    mainStoryContainer.innerHTML = ""; // Clear previous stories
    subStoriesContainer.innerHTML = ""; // Clear previous stories

    if (data.results) {
        const [mainStory, ...subStories] = data.results;

        mainStoryContainer.innerHTML = `
            <img src="${mainStory.image_url || 'https://via.placeholder.com/150'}" alt="Main Story Image">
            <div class="main-story-content">
                <p class="source">${mainStory.source_id}</p>
                <h3>${mainStory.title}</h3>
                <p class="time">${new Date(mainStory.pubDate).toLocaleString()}</p>
            </div>
        `;

        subStories.slice(0, 3).forEach(story => {
            const subStory = document.createElement("div");
            subStory.classList.add("sub-story");
            subStory.innerHTML = `
                <img src="${story.image_url || 'https://via.placeholder.com/50'}" alt="Story Thumbnail" class="outlet-logo">
                <div>
                    <p class="source">${story.source_id}</p>
                    <p>${story.title}</p>
                    <p class="time">${new Date(story.pubDate).toLocaleString()}</p>
                </div>
            `;
            subStoriesContainer.appendChild(subStory);
        });
    }
}

// Fetch news for each category
fetchCategoryNews(categories.entertainment, "ghana-category"); // Entertainment in Ghana's div
fetchCategoryNews(categories.ghana, "entertainment-category"); // Ghana in Entertainment's div
fetchCategoryNews(categories.world, "world-category");
fetchCategoryNews(categories.sports, "sports-category");
fetchCategoryNews(categories.technology, "technology-category");
fetchTopStories();


function displayDate() {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = date.toLocaleDateString('en-US', options);
}

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Accra&units=metric&appid=31e6be1b41ead9a7cfb3933ff376cd50`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const temperature = data.main.temp;
        const iconCode = data.weather[0].icon;
        const weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById('current-weather').textContent = `${temperature}°C`;
        document.getElementById('weather-icon').src = weatherIcon;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

window.onload = function() {
    displayDate();
    getWeather();
}
