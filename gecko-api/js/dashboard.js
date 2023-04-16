let chart,
    Query;
const getOHLC = async (coin, days) => {
        $('#chartButtons').empty()
    try {

        const candle = await $.getJSON(`https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=usd&days=${days}`);
        const coinData = await $.getJSON(`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`)
        const dataPoints = candle.map((candles) => {
            return {
                x: new Date(candles[0]),
                y: [candles[1], candles[2], candles[3], candles[4]]
            };
        });

        let chartType = () => {
            if (days == 1){
                return `${coinData.name} 24 hour`
            }else if(days > 1){
                return `${coinData.name} ` + days + ` day`
            }
        }
        const options2 = {
            series: [{
                data: dataPoints
            }],
            chart: {
                type: 'candlestick',
                height: 350
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#255aee',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                }
            },
            title: {
                text: chartType(),
                align: 'left'
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                tooltip: {
                    enabled: true
                }
            }
        };
        let chartButtons = `<button id="btn1">1d</button>
    <button id="btn14" onclick=" getOHLC(Query, '14');">14d</button>
    <button id="btn30" onclick=" getOHLC(Query, '30');">30d</button>
    <button id="btn90" onclick=" getOHLC(Query, '90');">90d</button>
    <a class="btn-sm bg-dark" id="deleteChart" href="#search" onclick="chart.destroy();$('#chartButtons').empty();"><i class="bi bi-dash-lg"></i></a>`
//this button href's to #search- this might need to change
        if (chart) {
            chart.destroy();
        }

        chart = new ApexCharts($("#liveChart")[0], options2);
            $('#chartButtons').append(chartButtons)
        chart.render();
    } catch (e) {
        console.error(e);
    }
};



const listToChart = () => {

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
                        compactDisplay: "short",
                        maximumSignificantDigits: 3
                    }).format(coin.market_cap);

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

const numberNotationCheck = (input) => {

    if (input > 100) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact",
            compactDisplay: "short",
            minimumSignificantDigits: 2,
            maximumSignificantDigits: 2
        }).format((input).toFixed(2));
    } else if (input > 1 && input < 100) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact",
            compactDisplay: "short",
            minimumSignificantDigits: 3,
            maximumSignificantDigits: 4
        }).format((input).toFixed(2));
    } else if (input < 1 && input >= .1) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact",
            compactDisplay: "short",
            minimumSignificantDigits: 3,
            maximumSignificantDigits: 4
        }).format((input).toFixed(2));
    } else if (input < .1 && input > .0001) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact",
            compactDisplay: "short",
            minimumSignificantDigits: 4,
            maximumSignificantDigits: 4
        }).format(input);
    } else {
        return new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: "USD",
            notation: "scientific",
            minimumSignificantDigits:1
        }).format(input);
    }
}



                    let sparkValue = coin.sparkline_in_7d.price
                    let chartElement = "";
                    chartElement +=
                        `<tr>
<td class="coin-marketcapRank"><span>${coin.market_cap_rank}</span></td>
<td><img class="coin-icon" src="${coin.image}" alt=""><strong> ${coin.name} </strong></td>
<td class="coin-ticker">${coin.symbol.toUpperCase()}</td>
<td class="coin-price">${numberNotationCheck(coin.current_price)}</td>
<td class="coin-volChange" style="color: ${colorDay}">${(coin.price_change_percentage_1h_in_currency).toFixed(2)}%</td>
<td class="coin-volChange" style="color: ${color};">${(coin.price_change_percentage_24h).toFixed(2)}%</td>
<td class="coin-volChange" style="color: ${colorWeek}">${(coin.price_change_percentage_7d_in_currency).toFixed(2)}%</td>
<td class="coin-volume">${volume}</td>
<td class="coin-marketcap">${marketCap}</td>
<td class="coin-high">${numberNotationCheck(coin.high_24h)}</td>
<td class="coin-low">${numberNotationCheck(coin.low_24h)}</td>

<td class="coin-candles"><a href="#chartBottom" onclick="Query = '${coin.id}';getOHLC(Query,'1'); ">Candles</a></td>
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
  </div></td></tr>`

                    $('#coinChart').append(chartElement)
                    $(`#${coin.id}-sparkline`).sparkline(sparkValue,{type: 'line',lineWidth: 2, lineColor:`${colorWeek}`,fillColor:false, width: 200, height:50,  normalRangeMax: coin.ath})


                }); //forEach
            }); //done
    } //try
    catch (e) {
        console.error(e)
    }
}






// getChart('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=matic-network%2C%20fantom%2C%20binancecoin%2C%20avalanche-2%2C%20tezos&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en')

//Search and Debouncer
const searchQuery = (input) => {
    $('#searchResults').empty()
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

    const debouncedFunction = debounce(searchQuery, 5000);

    $('#search').on('input', function () {
    $('#searchResults').empty();
    debouncedFunction($(this).val());
});
//End of searchQuery and debouncer
