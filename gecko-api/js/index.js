let coin = {
                "bitcoin": {
                    "name":"Bitcoin",
                    "usd": 28999,
                    "market_cap_rank":1,
                    "symbol": "BTC",
                    "market_cap": "$541M",
                    "high_24h": 29939,
                    "low_24h": 28111
                },
                "ethereum": {
                    "name":"Ethereum",
                    "usd":2190,
                    "market_cap_rank":2,
                    "symbol": "ETH",
                    "market_cap": "$48M",
                    "high_24h": 2199,
                    "low_24h": 1903
                }
            };

$('.bitcoinName').append(coin.bitcoin.name)
$('.bitcoinMCrank').append(coin.bitcoin.market_cap_rank)
$('.bitcoinSymbol').append(coin.bitcoin.symbol)
$('.bitcoinMC').append(coin.bitcoin.market_cap)
$('.bitcoinUSD').append(coin.bitcoin.usd)
$('.bitcoin24Hi').append(coin.bitcoin.high_24h)
$('.bitcoin24Lo').append(coin.bitcoin.low_24h)

$('.ethereumName').append(coin.ethereum.name)
$('.ethereumMCrank').append(coin.ethereum.market_cap_rank)
$('.ethereumSymbol').append(coin.ethereum.symbol)
$('.ethereumMC').append(coin.ethereum.market_cap)
$('.ethereumUSD').append(coin.ethereum.usd)
$('.ethereum24Hi').append(coin.ethereum.high_24h)
$('.ethereum24Lo').append(coin.ethereum.low_24h)



//historical data
//     let currency1API= "bitcoin";
//     let indexDate="01-01-2020";
//     let string = "https://api.coingecko.com/api/v3/coins/" + currency1API +"/history?date="+indexDate+"&localization=false";
//      $.getJSON(string)
//         .then(data => console.log(data.market_data.current_price.usd))

const getCoins = async () => {
    try {
        $.getJSON("https://api.coingecko.com/api/v3/search/trending?vs_currency=usd")
            .done(function(data) {
console.log(data)
//coins iterates each object returned from getCoins function and populates DOM
        data.coins.forEach((coin) => {
            let coinCard = ""
            coinCard +=
                `<div class="w-100">
                 <div class="card card-custom jump">
                   <span style="display:flex;margin:2px;"><img style="margin-right:1em;" src='${coin.item.small}' alt="${coin.item.name} icon"><h1 class="coin-name">${coin.item.name}</h1><h4 class="coin-ticker"> ${coin.item.symbol}</h4></span>                 
                    <h3 class="coin-mc">Rank# ${coin.item.market_cap_rank}</h3>
                     <h3 class="coin-price">$B ${coin.item.price_btc}</h3>
                    <h5 class="user-rating">User Score: ${coin.item.score}/10</h5>
                    </div>
                    </div>
                    `
            $("#trending").append(coinCard);
        })
    })
    } catch (e) {
        console.error(e);
    }
     }

     const getTicker = async (url) =>{
    try {
        $.getJSON(url)
            .done(function (data) {
                console.log(data)
                let coinObj = Object.keys(data)[0]
                let Chng = data[`${coinObj}`].usd_24h_change.toFixed(2)
                let color = Chng > 0 ? 'green' : 'red';
                    let tickerElement = "";
                    tickerElement +=
                        `<div class="ticker__item">${coinObj}: <span class="dayChange" style="color:${color};">${Chng}</span></div></div>`
                    $('.ticker').append(tickerElement)
            })
    }

             catch (e) {
            console.error(e);
        }
    }
    getTicker("https://api.coingecko.com/api/v3/simple/price?ids=shiba-inu&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=full")
    getTicker("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=full")
getTicker("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=full")
function colorChng(input){
    if(input < 0){
        $('.dayChange').css("color:red!important");
    }else {
        $('.dayChange').css("color:green!important");
    }
}
getCoins()




// if(Chng < 0){
// style.classList.color = "red";
// }else {
//     style.classList.color = "green";
// }
