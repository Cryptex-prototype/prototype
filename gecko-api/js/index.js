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
                    let Chng = (coin.price_change_percentage_24h).toFixed(2)
                    let color = Chng > 0 ? 'green' : 'red';
                    let price = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        notation: "compact",
                        compactDisplay: "short",
                        maximumSignificantDigits: 3
                    }).format(coin.current_price);
                    // console.log(Object.entries(coin)[0][1].usd)
                    let tickerElement = "";
                    tickerElement +=
                        `<div class="ticker__item">${coin.name}: ${price} <span class="dayChange" style="color:${color};">${Chng}%</span></div></div>`
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
        console.error("Error fetching data: searchQuery");
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

const debouncedFunction = debounce(searchQuery, 4000);

$('#search').on('input', function () {
    $('#searchResults').empty();
    debouncedFunction($(this).val());
});

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
//event listener empties searchResults list when input field changes
$('#search').change(function (){
$('#searchResults').empty()
})
getChart('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en');
getGlobal()
getGas()
getTrending()
    getTicker('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cdogecoin%2Cshiba-inu&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en')
// getChart('../mockdb/sparkline.json')
// getChart('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=ethereum-ecosystem&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en')
// getChart('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=ethereum-ecosystem&order=market_cap_desc&per_page=1000&page=5&sparkline=false&locale=en')
