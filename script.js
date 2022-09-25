const items = [{
        title: "Торт «Вельвет»",
        description: "Крем-основа: белковый крем",
        tags: ["cake"],
        price: 1500,
        img: "./img/1.jpeg",
        rating: 3.5,
    },
    {
        title: "Торт «Ангел»",
        description: "Крем-основа: крем-чиз",
        tags: ["cake"],
        price: 1600,
        img: "./img/2.jpeg",
        rating: 4.9,
    },
    {
        title: "Торт «Фламинго» ",
        description: "Крем-основа: крем-чиз",
        tags: ["cake"],
        price: 1300,
        img: "./img/3.jpeg",
        rating: 5.0,
    },
    {
        title: "Чизкейк «Малина»",
        description: "Крем-основа: творожный крем",
        tags: ["cake"],
        price: 1400,
        img: "./img/4.jpg",
        rating: 4.9,
    },
    {
        title: "Капкейки «Мальвина»",
        description: "Крем-основа: крем-чиз",
        tags: ["capcake"],
        price: 600,
        img: "./img/5.jpeg",
        rating: 2.8,
    },
    {
        title: "Капкейки «Орео»",
        description: "Крем-основа: крем-чиз",
        tags: ["capcake"],
        price: 700,
        img: "./img/6.jpg",
        rating: 4.9,
    },
    {
        title: "Капкейки «Классик»",
        description: "Крем-основа: творожный крем",
        tags: ["capcake"],
        price: 800,
        img: "./img/7.jpg",
        rating: 3.4,
    },
    {
        title: "Капкейки «Бархат»",
        description: "Крем-основа: белковый крем",
        tags: ["capcake"],
        price: 750,
        img: "./img/8.jpg",
        rating: 4.8,
    },
    {
        title: "Макарун",
        description: "Ванильная начинка",
        tags: ["macaron"],
        price: 500,
        img: "./img/9.jpg",
        rating: 4.7,
    },
    {
        title: "Макарун",
        description: "Фисташковая начинка",
        tags: ["macaron"],
        price: 400,
        img: "./img/10.jpg",
        rating: 4.2,
    },
    {
        title: "Макарун",
        description: "Марципановая начинка",
        tags: ["macaron"],
        price: 500,
        img: "./img/11.jpeg",
        rating: 3.7,
    },
    {
        title: "Макарун",
        description: "Ягодная начинка",
        tags: ["macaron"],
        price: 400,
        img: "./img/12.jpg",
        rating: 3.6,
    },
];

let currentState = [...items];


const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");


function renderItems(arr) {

    nothingFound.textContent = "";

    itemsContainer.innerHTML = "";

    arr.forEach((item) => {

        itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}


function sortByAlphabet(a, b) {

    if (a.title > b.title) {
        return 1;
    }

    if (a.title < b.title) {
        return -1;
    }

    return 0;
}


renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));


function prepareShopItem(shopItem) {

    const { title, description, tags, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}P`;


    const ratingContainer = item.querySelector(".rating");

    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }

    const tagsHolder = item.querySelector(".tags");


    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });


    return item;
}


const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");


function applySearch() {

    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );

    currentState.sort((a, b) => sortByAlphabet(a, b));

    renderItems(currentState);

    sortControl.selectedIndex = 0;
}


searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);


const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {

    const selectedOption = event.target.value;

    switch (selectedOption) {
        case "expensive":
            {

                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {

                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {

                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {

                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }

    renderItems(currentState);
});