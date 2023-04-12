const getTrending = async () => {
    try {
        $.getJSON("https://api.coingecko.com/api/v3/search/trending?vs_currency=usd")
            .done(function(data) {
        data.coins.forEach((coin) => {
            let price = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact",
                compactDisplay: "short",
                maximumSignificantDigits: 3
            }).format(coin.item.price_btc * 28000);
            let coinCard = ""
            coinCard +=
                `<div class="w-100">
                 <div class="card card-custom jump">
                   <span style="display:flex;margin:2px;"><img style="margin-right:1em;" src='${coin.item.small}' alt="${coin.item.name} icon"><h1 class="coin-name">${coin.item.name}</h1><h4 class="coin-ticker"> ${coin.item.symbol}</h4></span>                 
                    <h3 class="coin-mc">Rank# ${coin.item.market_cap_rank}</h3>
                     <h3 class="coin-price">${price}</h3> <!--hardcode BTC current price--> 
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

     const getTicker = async (url) => {
    try {
        $.getJSON(url)
            .done(function (data) {
                console.log(data)
data.forEach((coin) => {
                let Chng = coin.price_change_percentage_24h.toFixed(2)
                let color = Chng > 0 ? 'green' : 'red';
    let tickerElement = "";
    tickerElement +=
        `<div class="ticker__item">${coin.name}: $${coin.current_price} <span class="dayChange" style="color:${color};">${Chng}%</span></div></div>`
    $('.ticker').append(tickerElement)
})
            })
    }

             catch (e) {
            console.error(e);
        }
    }


    const getChart = async (url) => {
        $('#coinChart').empty()
    try {
    $.getJSON(url)
        .done(function (data) {
            data.forEach((coin) => {
              let marketCap = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  notation: "compact",
                  compactDisplay: "long",
                  maximumSignificantDigits: 3
                }).format(coin.market_cap);
                let price = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    compactDisplay: "long",
                    maximumSignificantDigits: 4
                }).format(coin.current_price);
                let volume = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    compactDisplay: "long",
                    maximumSignificantDigits: 3
                }).format(coin.total_volume)
                let high = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    compactDisplay: "long",
                    maximumSignificantDigits: 3
                }).format(coin.high_24h)
                let low = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    compactDisplay: "long",
                    maximumSignificantDigits: 3
                }).format(coin.low_24h)

                let colorDay = coin.price_change_percentage_1h_in_currency > 0 ? 'green' : 'red';
                let color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';
                let colorWeek = coin.price_change_percentage_7d_in_currency > 0 ? 'green' : 'red';





                let sparkValue = coin.sparkline_in_7d.price
                let chartElement = "";
                chartElement +=
`<tr>
<td class="coin-marketcapRank"><span>${coin.market_cap_rank}</span></td>
<td><img class="coin-icon" src="${coin.image}" alt=""><span>${coin.name}</span></td>
<td class="coin-ticker">${coin.symbol.toUpperCase()}</td>
<td class="coin-price">${price}</td>
<td class="coin-volChange" style="color: ${colorDay}">${(coin.price_change_percentage_1h_in_currency).toFixed(2)}%</td>
<td class="coin-volChange" style="color: ${color};">${(coin.price_change_percentage_24h).toFixed(2)}%</td>
<td class="coin-volChange" style="color: ${colorWeek}">${(coin.price_change_percentage_7d_in_currency).toFixed(2)}%</td>
<td class="coin-volume">${volume}</td>
<td class="coin-marketcap">${marketCap}</td>
<td class="coin-high">${high}</td>
<td class="coin-low">${low}</td>
<td id="${coin.id}-sparkline">
<div class="loading"><span>L</span>
  <span>o</span>
  <span>a</span>
  <span>d</span>
  <span>i</span>
  <span>n</span>
  <span>g</span>
  <span>.</span>
  <span>.</span>
  <span>.</span>
  </div></td>`

                $('#coinChart').append(chartElement)
                $(`#${coin.id}-sparkline`).sparkline(sparkValue,{type: 'line',lineWidth: 2, lineColor:`${color}`,fillColor:false, width: 200, height:50,  normalRangeMax: coin.ath})


            }); //forEach
        }); //done
        } //try
        catch (e) {
    console.error(e)
    }
}

const searchQuery = async (input) => {
    $('#searchResults').empty()
    try {
        // $.getJSON(`../data/search.json`)
        let input = $('#search').val()
        if(input != null || input != "") {
            $.getJSON(`https://api.coingecko.com/api/v3/search?query=${input}`)
                .done(function (data) {

                    let info = data.coins
                    $('#searchResults').append(`<span style="background:rgba(255,255,255,0.5);z-index: 12;position: relative;right: -96%;top: 21px;color:red;cursor:pointer;" onclick="$('#searchResults').empty()">X</span>`)
                    info.forEach((coin) => {
                        let marketCap = coin.market_cap_rank
                        if (marketCap == null) {
                            return "NA"
                        }
                        let searchContent = "";
                        searchContent +=

                            `<li><span>#${marketCap} </span><a href="https://www.coingecko.com/en/coins/${coin.id}"><img src="${coin.thumb}" alt="${coin.id}">${coin.symbol} ${coin.id}</a></li>`
                        // console.log(searchContent)
                        $('#searchResults').append(searchContent)

                    })
                })

        }
    } catch (e) {
        console.error(e);
    }
}
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}
// Usage example:
const debouncedFunction = debounce(() => {
let search = $('#search').val();
    searchQuery(search)
    console.log("Debounced function called");
}, 300);


$('#search').change(function (){
    $('#searchResults').empty()

})
const getGlobal = async () => {
    try {
        $.getJSON("https://api.coingecko.com/api/v3/global")
            .done(function(data) {
                console.log(data)
                    let coin = data.data
                let price = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    compactDisplay: "long",
                    maximumSignificantDigits: 3
                }).format(coin.total_volume.usd);
                coin.total_volume.usd
                  let Global = "";
                  Global +=
                      `<span>Coins: <span class="globalValue">${coin.active_cryptocurrencies}</span> Exchanges: <span class="globalValue">${coin.markets}</span> 24hr Volume: <span class="globalValue">${price} </span> BTC Dominance: <span class="globalValue">${coin.market_cap_percentage.btc.toFixed(2)}%</span> </span>`
                    $('#global').append(Global)

            })
            } catch (e) {
            console.error(e);
        }
    }
    // getGlobal()
const getGas = async () => {
    try {
        // $.getJSON('../mockdb/gas.json')
    $.getJSON('https://api.etherscan.io/api?module=gastracker&action=gasoracle')
        .done(function (data){
            console.log(data.result.FastGasPrice)
            let gas = "";
            gas +=
                `<span>Gas: <span class="globalValue">${data.result.FastGasPrice}gwei </span></span>`
        $('#global').append(gas)
        })
    } catch (e) {
        console.error(e);
    }
}
// getGas()
//event listener empties searchResults list when input field changes

    // getTicker("https://api.coingecko.com/api/v3/simple/price?ids=shiba-inu&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=full")
    // getTicker("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=full")
    // getTicker("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=full")
// getChart('../mockdb/sparkline.json')
// getChart('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en')
// getChart('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=ethereum-ecosystem&order=market_cap_desc&per_page=1000&page=5&sparkline=false&locale=en')
// getTrending()

getTicker('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=1&sparkline=false&price_change_percentage=24h&locale=en')

// const getMarkets = async () => {
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };
//
//     let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=ethereum-ecosystem&per_page=5&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en", requestOptions);
//     let data = await response.json();
//     let formattedData = data.map(function(coin){
//         return {
//            id: coin.id,
//            symbol: coin.symbol
//         }
//     });
//     return formattedData;
// }