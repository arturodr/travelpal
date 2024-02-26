const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const divResults = document.getElementById("divResults");
const txtSearch = document.getElementById("txtSearch");
let recommendations = [];

function search() {
    divResults.innerHTML = "";
    const text = txtSearch.value.trim().toLowerCase();

    fetch("travel_recommendation_api.json")
        .then((response) => response.json())
        .then((data) => {
            console.log(text);

            switch (text) {
                case 'beach':
                    recommendations = data.beaches;
                    break;
                case 'temple':
                    recommendations = data.temples;
                case 'country':
                    recommendations = data.countries.flatMap((country) => country.cities);
                    break;
                default:
                    recommendations = [];
            }
            if(recommendations.length>0) {
                shuffleArray(recommendations);
                recommendations.slice(0, 2).forEach((item) => {
                    const result = document.createElement("div");
                    result.className = "card";
                    result.innerHTML = `
                        <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                        </div>
                    `;
                    divResults.appendChild(result);
                });
            } else {
                divResults.innerHTML = "No result to show, you can try: beach, temple, or country.";
            }

        })
        .catch((error) => {
            console.log(error);
            divResults.innerHTML = "Error fetching data.";
        });
}
btnSearch.addEventListener("click", search);

function clear() {
    divResults.innerHTML = "";
    txtSearch.value = "";
}
btnClear.addEventListener("click", clear);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}