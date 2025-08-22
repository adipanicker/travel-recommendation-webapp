// search.js

let travelData = {};

// Load JSON file on page load
fetch("./travel_recommendation_api.json")
  .then((response) => response.json())
  .then((data) => {
    travelData = data;
  })
  .catch((error) => console.error("Error loading JSON:", error));

// Function to create card HTML
function createCard(item) {
  return `
    <div class="card">
      <img src="${item.imageUrl}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    </div>
  `;
}

// Main search function
function searchDestination() {
  const query = document
    .getElementById("searchDestination")
    .value.toLowerCase();
  const searchResult = document.getElementById("searchResult");
  searchResult.innerHTML = ""; // clear old results

  let results = [];

  if (query.includes("beach")) {
    results = travelData.beaches || [];
  } else if (query.includes("temple")) {
    results = travelData.temples || [];
  } else {
    // Match countries/cities
    travelData.countries.forEach((country) => {
      if (country.name.toLowerCase().includes(query)) {
        results.push(...country.cities);
      } else {
        country.cities.forEach((city) => {
          if (city.name.toLowerCase().includes(query)) {
            results.push(city);
          }
        });
      }
    });
  }

  if (results.length === 0) {
    searchResult.innerHTML = "<p>No results found</p>";
  } else {
    results.forEach((item) => {
      searchResult.innerHTML += createCard(item);
    });
  }
}

// Clear function
function clearSearch() {
  document.getElementById("searchDestination").value = "";
  document.getElementById("searchResult").innerHTML = "";
}

// Event listener for Clear button
document.getElementById("clearBtn").addEventListener("click", clearSearch);

// Add click listener
document
  .getElementById("searchBtn")
  .addEventListener("click", searchDestination);
