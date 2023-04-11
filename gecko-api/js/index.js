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


// var options = {
//     series: [{
//         name: 'XYZ MOTORS',
//         data: dates
//     }],
//     chart: {
//         type: 'area',
//         stacked: false,
//         height: 350,
//         zoom: {
//             type: 'x',
//             enabled: true,
//             autoScaleYaxis: true
//         },
//         toolbar: {
//             autoSelected: 'zoom'
//         }
//     },
//     dataLabels: {
//         enabled: false
//     },
//     markers: {
//         size: 0,
//     },
//     title: {
//         text: 'Stock Price Movement',
//         align: 'left'
//     },
//     fill: {
//         type: 'gradient',
//         gradient: {
//             shadeIntensity: 1,
//             inverseColors: false,
//             opacityFrom: 0.5,
//             opacityTo: 0,
//             stops: [0, 90, 100]
//         },
//     },
//     yaxis: {
//         labels: {
//             formatter: coinSparkline,
//             },
//         },
//         title: {
//             text: 'Price'
//         },
//     },
//     xaxis: {
//         type: 'datetime',
//     },
//     tooltip: {
//         shared: false,
//         y: {
//             formatter: coinSparkline,
//             }
//         }
//     }
// };


    const getChart = async (url) => {
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
                let color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';






                // let chart = chartRender(`${coin.name}-sparkline`, coin.sparkline_in_7d.price).render()
                let chartElement = "";
                chartElement +=
`<tr>
<td class="coin-marketcapRank"><span>${coin.market_cap_rank}</span></td>
<td><img class="coin-icon" src="${coin.image}" alt=""><span>${coin.name}</span></td>
<td class="coin-ticker">${coin.symbol.toUpperCase()}</td>
<td class="coin-price">${price}</td>
<td class="coin-volChange" style="color: ${color};">${(coin.price_change_percentage_24h).toFixed(2)}%</td>
<td class="coin-volume">${volume}</td>
<td class="coin-marketcap">${marketCap}</td>
<td class="coin-high">${high}</td>
<td class="coin-low">${low}</td>
<td><canvas id="${coin.name}-sparkline"></canvas></td>`
                $('#coinChart').append(chartElement)

                let sparkOptions = {
                    series: [{
                        name: 'XYZ MOTORS',
                        data: coin.sparkline_in_7d.price
                    }],
                    chart: {
                        type: 'area',
                        stacked: false,
                        height: 350,
                        zoom: {
                            type: 'x',
                            enabled: true,
                            autoScaleYaxis: true
                        },
                        toolbar: {
                            autoSelected: 'zoom'
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    markers: {
                        size: 0,
                    },
                    title: {
                        text: 'Stock Price Movement',
                        align: 'left'
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            inverseColors: false,
                            opacityFrom: 0.5,
                            opacityTo: 0,
                            stops: [0, 90, 100]
                        },
                    },
                    yaxis: {
                        labels: {
                            formatter: function (val) {
                                return (val / 1000000).toFixed(0);
                            },
                        },
                        title: {
                            text: 'Price'
                        },
                    },
                    xaxis: {
                        type: 'datetime',
                    },
                    tooltip: {
                        shared: false,
                        y: {
                            formatter: function (val) {
                                return (val / 1000000).toFixed(0)
                            }
                        }
                    }
                };

                let chart = new ApexCharts(document.getElementById(`${coin.name}-sparkline`), sparkOptions).render()

                $(`#${coin.name}-sparkline`).append(chart)
            })
        })
        }
        catch (e) {
    console.error(e)
    }
}

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
$('#search').change(function (){
$('#searchResults').empty()
})
// getChart("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
    // getTicker("https://api.coingecko.com/api/v3/simple/price?ids=shiba-inu&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=full")
    // getTicker("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=full")
    // getTicker("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=full")
getChart('../mockdb/sparkline.json')
// getTrending()