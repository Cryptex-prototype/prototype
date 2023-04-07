//historical data
let currency1API= "bitcoin";
let indexDate="01-01-2020";
let string = "https://api.coingecko.com/api/v3/coins/" + currency1API +"/history?date="+indexDate+"&localization=false";
$.getJSON(string)
    .then(data => console.log(data.market_data.current_price.usd))



//DOM population
const getCoins = async () => {
    try {
        $.getJSON("https://api.coingecko.com/api/v3/search/trending")
            .done(function(data) {

//loading.gif displays with html as the getCoins returns JSON

//coins iterates each object returned from getCoins function and populates DOM
                data.coins.forEach((coin) => {
                    console.log(coin)
                    let coinCard = ""
                    coinCard +=
                        `<div class="w-100">
                 <div class="card card-custom jump">
                   <img src='${coin.item.thumb}' class="card-img-top" alt="${coin.item.name} icon">
                    <h1 class="coin-name">${coin.item.name}</h1>
                     <h3 class="coin-price">${coin.item.price_btc}</h3>
                    <h5 class="user-rating">Score: ${coin.item.score}/10</h5>`
                    $("#trending").append(coinCard);
                })
            })
    } catch (e) {
        console.error(e);
    }
}
getCoins()