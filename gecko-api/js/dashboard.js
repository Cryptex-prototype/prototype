




//Search and Debouncer
const searchQuery = (input) => {
    $('#searchResults').empty();
    try {
    $.getJSON(`https://api.coingecko.com/api/v3/search?query=${input}`)
    .done(function (data) {
    let info = data.coins;
    $('#searchResults').append(`<span style="background:rgba(255,255,255,0.5);z-index: 12;position: relative;right: -96%;top: 21px;color:red;cursor:pointer;" onclick="$('#searchResults').empty()">X</span>`);
    info.forEach((coin) => {
    let marketCap = coin.market_cap_rank;
    if (marketCap == null) {
    return "NA";
}
    let searchContent = "";
    searchContent +=
    `<li><span>#${marketCap} </span><a href="${coin.id}"><img src="${coin.thumb}" alt="${coin.id}">${coin.symbol} ${coin.id}</a></li>`;
    $('#searchResults').append(searchContent);
});
});
} catch (error) {
    console.error("Error fetching data:", error);
}
};

    function debounce(func, wait) {
    let timeout;
    return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
    func.apply(context, args);
}, wait);
};
}

    const debouncedFunction = debounce(searchQuery, 300);

    $('#search').on('input', function () {
    $('#searchResults').empty();
    debouncedFunction($(this).val());
});

    let addedCoins = [];

    // Event listener for adding coins
    $('#searchResults').on('click', 'a', function (event) {
    event.preventDefault();

    const coinId = $(this).text().trim();
    const coinHref = $(this).attr('href');

    // Check if the coin is already added
    if (addedCoins.some(coin => coin.id === coinHref)) {
    alert('Coin already added to the watchlist.');
    return;
}

    // Add the coin to the addedCoins array
    addedCoins.push({ id: coinHref, name: coinId });

    // Display the added coin in the "addedCoins" list
    $('#addedCoins').append(`<li data-id="${coinHref}">${coinId}</li>`);
});
