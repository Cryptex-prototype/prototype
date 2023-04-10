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
                let coinObj = Object.keys(data)[0]
                let Chng = data[`${coinObj}`].usd_24h_change.toFixed(2)
                let color = Chng > 0 ? 'green' : 'red';
                let price = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    compactDisplay: "short",
                    maximumSignificantDigits: 3
                }).format(Object.entries(data)[0][1].usd);
                // console.log(Object.entries(data)[0][1].usd)
                let tickerElement = "";
                tickerElement +=
                    `<div class="ticker__item">${coinObj}: ${price} <span class="dayChange" style="color:${color};">${Chng}%</span></div></div>`
                $('.ticker').append(tickerElement)
            })
    }

    catch (e) {
        console.error(e);
    }
}


const getTop100Coins = async () => {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true';
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Error fetching data:', response.statusText);
            return;
        }
        const data = await response.json();
        displayCoins(data);
        displayCharts(data);
    } catch (e) {
        console.error(e);
    }
};
const displayCoins = (data) => {
    data.forEach((coin) => {
        // ... (existing code to display the table)
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
        let color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';

        let chartElement = "";
        chartElement +=
            `<td>
<td class="coin-marketcapRank"><span>${coin.market_cap_rank}</span></td>
<td><img class="coin-icon" src="${coin.image}" alt=""><span>${coin.name}</span></td>
<td class="coin-ticker">${coin.symbol.toUpperCase()}</td>
<td class="coin-price">${price}</td>
<td class="coin-volChange" style="color: ${color};">${(coin.price_change_percentage_24h).toFixed(2)}%</td>
<td class="coin-volume">${volume}</td>
<td class="coin-marketcap">${marketCap}</td>
<td class="coin-high">${high}</td>
<td class="coin-low">${low}</td>
<td class="coin-sparkline"></td>
`;

    });
};
const displayCharts = (data) => {
    data.forEach((coin) => {
        // ... (existing code to display the chart)
        const canvasId = `chart-${coin.id}`;
        const canvasElement = `<canvas id="${canvasId}"></canvas>`;
        // const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Price',
                        data: prices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        display: false,
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 4,
                        },
                    },
                    y: {
                        display: false,
                        position: "right",
                    },
                },
                elements: {
                    point: {
                        radius: 0, // Hide data points
                    },
                },
                maintainAspectRatio: true, // Allow the chart to resize with the container
            },
        });
        // const canvasId = `chart-${coin.id}`;
        // const canvasElement = `<canvas id="${canvasId}"></canvas>`;
        // Append the canvas element to the table row
        const ctx = document.getElementById(canvasId).getContext('2d');
        $(`#coin-${coin.id}`).append(`<td>${canvasElement}</td>`);
        // Use the sparkline data to render the chart
        const dates = coin.sparkline_in_7d.price.map((priceData) => new Date(priceData[0]).toLocaleDateString());
        const prices = coin.sparkline_in_7d.price.map((priceData) => priceData[1]);
        createChart(canvasId, dates, prices);
    });
};
// const getChart = async (url) => {
//     try {
//         $.getJSON(url)
//             .done(function (data) {
//                 data.forEach((coin) => {
//                     let marketCap = new Intl.NumberFormat("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                         notation: "compact",
//                         compactDisplay: "long",
//                         maximumSignificantDigits: 3
//                     }).format(coin.market_cap);
//                     let price = new Intl.NumberFormat("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                         notation: "compact",
//                         compactDisplay: "long",
//                         maximumSignificantDigits: 4
//                     }).format(coin.current_price);
//                     let volume = new Intl.NumberFormat("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                         notation: "compact",
//                         compactDisplay: "long",
//                         maximumSignificantDigits: 3
//                     }).format(coin.total_volume)
//                     let high = new Intl.NumberFormat("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                         notation: "compact",
//                         compactDisplay: "long",
//                         maximumSignificantDigits: 3
//                     }).format(coin.high_24h)
//                     let low = new Intl.NumberFormat("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                         notation: "compact",
//                         compactDisplay: "long",
//                         maximumSignificantDigits: 3
//                     }).format(coin.low_24h)
//                     let color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';
//
//                     let chartElement = "";
//                     chartElement +=
//                         `<tr>
// <td class="coin-marketcapRank"><span>${coin.market_cap_rank}</span></td>
// <td><img class="coin-icon" src="${coin.image}" alt=""><span>${coin.name}</span></td>
// <td class="coin-ticker">${coin.symbol.toUpperCase()}</td>
// <td class="coin-price">${price}</td>
// <td class="coin-volChange" style="color: ${color};">${(coin.price_change_percentage_24h).toFixed(2)}%</td>
// <td class="coin-volume">${volume}</td>
// <td class="coin-marketcap">${marketCap}</td>
// <td class="coin-high">${high}</td>
// <td class="coin-low">${low}</td>
// `;
//
//                     // Append a new cell with a canvas for the line chart
//                     const canvasId = `chart-${coin.id}`;
//                     const canvasElement = `<canvas id="${canvasId}"></canvas>`;
//                     const chartCell = `<td>${canvasElement}</td>`;
//                     $('#coinChart').append(chartElement + chartCell + `</tr>`);
//
//                     // Fetch historical data and render the chart
//                     getHistoricalData(coin.id, canvasId);
//                 });
//             });
//     } catch (e) {
//         console.error(e);
//     }
// };
// const displayCharts = (data) => {
//     data.forEach((coin) => {
//         const canvasId = `chart-${coin.id}`;
//         const canvasElement = `<canvas id="${canvasId}"></canvas>`;
//         // Append the canvas element to the table row
//         $(`#coin-${coin.id}`).append(`<td>${canvasElement}</td>`);
//         // Use the sparkline data to render the chart
//         const dates = coin.sparkline_in_7d.price.map((priceData) => new Date(priceData[0]).toLocaleDateString());
//         const prices = coin.sparkline_in_7d.price.map((priceData) => priceData[1]);
//         createChart(canvasId, dates, prices);
//     });
// };
// const getHistoricalData = async (coinId, canvasId) => {
//     try {
//         const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=hourly`;
//         console.log("chart data fetch")
//
//         const response = await fetch(url);
//         if (!response.ok) {
//             console.error('Error fetching data:', response.statusText);
//             return;
//         }
//         const data = await response.json();
//
//         const dates = data.prices.map((priceData) => new Date(priceData[0]).toLocaleDateString());
//         const prices = data.prices.map((priceData) => priceData[1]);
//
//         const ctx = document.getElementById(canvasId).getContext('2d');
//         new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: dates,
//                 datasets: [
//                     {
//                         label: 'Price',
//                         data: prices,
//                         borderColor: 'rgba(75, 192, 192, 1)',
//                         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                         borderWidth: 1,
//                     },
//                 ],
//             },
//             options: {
//                 plugins: {
//                     legend: {
//                         display: false,
//                     },
//                 },
//                 scales: {
//                     x: {
//                         display: false,
//                         ticks: {
//                             autoSkip: true,
//                             maxTicksLimit: 4,
//                         },
//                     },
//                     y: {
//                         display: false,
//                         position: "right",
//                     },
//                 },
//                 elements: {
//                     point: {
//                         radius: 0, // Hide data points
//                     },
//                 },
//                 maintainAspectRatio: true, // Allow the chart to resize with the container
//             },
//         });
    // } catch (e) {
    //     console.error(e);
//     }
// };


// const getChart = async (url) => {
//     try {
//         $.getJSON(url)
//             .done(function (data) {
//                 console.log(data)
//                 data.forEach((coin) => {
//                     let marketCap = new Intl.NumberFormat("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                         notation: "compact",
//                         compactDisplay: "long",
//                         maximumSignificantDigits: 3
//                     }).format(coin.market_cap);
//                     let price = new Intl.NumberFormat("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                         notation: "compact",
//                         compactDisplay: "long",
//                         maximumSignificantDigits: 4
//                     }).format(coin.current_price);
//                     let volume = new Intl.NumberFormat("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                         notation: "compact",
//                         compactDisplay: "long",
//                         maximumSignificantDigits: 3
//                     }).format(coin.total_volume)
//                     let high = new Intl.NumberFormat("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                         notation: "compact",
//                         compactDisplay: "long",
//                         maximumSignificantDigits: 3
//                     }).format(coin.high_24h)
//                     let low = new Intl.NumberFormat("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                         notation: "compact",
//                         compactDisplay: "long",
//                         maximumSignificantDigits: 3
//                     }).format(coin.low_24h)
//                     let color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';
//
//                     let chartElement = "";
//                     chartElement +=
//                         `<tr>
// <td class="coin-marketcapRank"><span>${coin.market_cap_rank}</span></td>
// <td><img class="coin-icon" src="${coin.image}" alt=""><span>${coin.name}</span></td>
// <td class="coin-ticker">${coin.symbol.toUpperCase()}</td>
// <td class="coin-price">${price}</td>
// <td class="coin-volChange" style="color: ${color};">${(coin.price_change_percentage_24h).toFixed(2)}%</td>
// <td class="coin-volume">${volume}</td>
// <td class="coin-marketcap">${marketCap}</td>
// <td class="coin-high">${high}</td>
// <td class="coin-low">${low}</td>
//  </tr>`
//                     // api: MC rank, Name, Price, 1h/24h/7d price change, 24h volume, mkt cap,
//                     //     market_cap_rank, id, current_price, price_change_percentage_24h, total_volume, market_cap
//                     $('#coinChart').append(chartElement)
//                 })
//             })
//     }
//     catch (e) {
//         console.error(e)
//     }
// }

const searchQuery = async (input) => {
    $('#searchResults').empty()
    try {
        // $.getJSON(`../data/search.json`)
        let input = $('#search').val()
        $.getJSON(`https://api.coingecko.com/api/v3/search?query=${input}`)
            .done(function(data) {
                let info = data.coins
                $('#searchResults').append(`<span style="background:rgba(255,255,255,0.5);z-index: 12;position: relative;right: -96%;top: 21px;color:red;cursor:pointer;" onclick="$('#searchResults').empty()">X</span>`)
                info.forEach((coin) => {
                    let marketCap = coin.market_cap_rank
                    if(marketCap == null){
                        return "NA"
                    }
                    let searchContent = "";
                    searchContent +=

                        `<li><span>#${marketCap} </span><a href="https://www.coingecko.com/en/coins/${coin.id}"><img src="${coin.thumb}" alt="${coin.id}">${coin.symbol} ${coin.id}</a></li>`
                    // console.log(searchContent)
                    $('#searchResults').append(searchContent)

                })
            })


    } catch (e) {
        console.error(e);
    }
}

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
getGlobal()
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
getGas()
//event listener empties searchResults list when input field changes
$('#search').change(function (){
    $('#searchResults').empty()
})
getTop100Coins()
// getChart("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
// getTicker("https://api.coingecko.com/api/v3/simple/price?ids=shiba-inu&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=full")
// getTicker("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=full")
// getTicker("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=full")

// getTrending()