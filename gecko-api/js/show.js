const Query = 'dogecoin';

const getShow = async (input) => {
    $('#coinChart').empty()
    try {
        $.getJSON(`https://api.coingecko.com/api/v3/coins/${input}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`)
        // $.getJSON('../mockdb/doge.json')
            .done(function (coin) {


                const findTop5 = () => {
                    let top5Tickers = coin.tickers.sort((a, b) => b.volume - a.volume).slice(0, 5);
                    return top5Tickers;
                }

                const top5Tickers = findTop5();
                // console.log('The first ticker in the top 5 is:', top5Tickers[0]);
                const findMax = () => {
                    let maxTicker = coin.tickers.reduce((acc, ticker) => {
                        let volume = ticker.volume;
                        return (volume > acc.volume) ? ticker : acc;
                    }, {volume: 0});
                    // console.log('The largest volume is:', maxTicker.volume);
                    return maxTicker;
                }

                const maxTicker = findMax();
                // console.log('The parent object of the largest volume is:', maxTicker);


                    let marketCap = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.market_cap.usd);
                    let maxSupply_formatted = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.max_supply);
                    let totalSupply_formatted = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.total_supply)
                    let circulatingSupply_formatted = new Intl.NumberFormat("en-US", {
                    style: "decimal"
                }).format(coin.market_data.circulating_supply);
                    let fullyDilutedValuation = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.fully_diluted_valuation.usd);
                    let price = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.current_price.usd);
                    let followers = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.community_data.twitter_followers);
                    let volume = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.total_volume.usd)
                    let high = new Intl.NumberFormat("en-US", {
                        style: "decimal",
                        maximumSignificantDigits: 5
                    }).format((coin.market_data.high_24h.usd).toFixed(2))
                    let low = new Intl.NumberFormat("en-US", {
                        style: "decimal",
                        maximumSignificantDigits: 5
                    }).format((coin.market_data.low_24h.usd).toFixed(2))
                    let ath = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.ath.usd);
                    let atl = (coin.market_data.atl.usd).toLocaleString('en-US');


                    //null checks

                const progressBar = () => {
                    let difference = coin.market_data.high_24h.usd - coin.market_data.current_price.usd
                    let percent = difference / coin.market_data.high_24h.usd * 100
                    console.log(difference)
                    console.log(percent)
                    return percent * 100;
                }
                const week_priceChange = () => {
                    if(coin.market_data.price_change_percentage_7d_in_currency.usd > 0){
                        return `risen <span style="color:${colorWeek}">${(weekVol).toFixed(2)}%</span>`
                    }else if(coin.market_data.price_change_percentage_7d_in_currency.usd < 0){
                        return `dropped <span style="color:${colorWeek}">${(weekVol).toFixed(2)}%</span>`
                    }
                }
                const sentiment = () => {
                    let coinSentiment;
                    if(coin.sentiment_votes_up_percentage === null){
                        coinSentiment = `Not enough of the community has voted on <span class="text-white">${coin.name}</span> today. :(`
                    }else {
                        coinSentiment = coin.sentiment_votes_up_percentage
                    }
                    if(coin.sentiment_votes_up_percentage > 60){
                        return `<strong style="color:green">bullish</strong> with more than <strong style="color:green;">${coinSentiment}%</strong> feeling optimistic`
                    }else if(coin.sentiment_votes_up_percentage === 50) {
                        return `<strong style="color:gray">mixed</strong> with <strong>${coinSentiment}%</span> feeling optimistic`
                    }else if(coin.sentiment_votes_up_percentage < 49){
                        return `<strong style="color:red;">bearish</strong> with less than <strong style="color:red">${coinSentiment}%</span> optimistic`
                    }
                }
                const maxSupply = () => {
                    if (coin.market_data.max_supply === null) {
                        return "∞"
                    } else {
                        return maxSupply_formatted
                    }
                }
                const totalSupply = () => {
                    if (coin.market_data.total_supply === null) {
                        return "∞"
                    } else {
                        return totalSupply_formatted
                    }
                }
                const FDV = () => {
                        if(isNaN(coin.market_data.fully_diluted_valuation.usd)){
                            return "∞"
                        }else {
                            return "$" + fullyDilutedValuation;
                        }
                }
                const circulatingSupply = () => {
                    if(coin.market_data.circulating_supply === null){
                        return "No information available yet"
                    }else {
                        return circulatingSupply_formatted;
                    }
                }
                    //null checks ^

                    let marketCapRank = coin.market_data.market_cap_rank

                    let colorHour = coin.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 'green' : 'red';
                    let colorDay = coin.market_data.price_change_percentage_24h_in_currency.usd > 0 ? 'green' : 'red';
                    let colorWeek = coin.market_data.price_change_percentage_7d_in_currency.usd > 0 ? 'green' : 'red';

let hourVol = coin.market_data.price_change_percentage_1h_in_currency.usd
let dayVol = coin.market_data.price_change_percentage_24h_in_currency.usd
let weekVol = coin.market_data.price_change_percentage_7d_in_currency.usd
                console.log(price)
                console.log(volume)
                console.log(high)
                console.log(low)
                console.log(marketCapRank)
                console.log(marketCap)

                    let sparkValue = coin.market_data.sparkline_7d.price

                    let chartElement = "";
                    chartElement +=
               `<div class="container bg-dark">    
<div class="row">
<div class="col-md-8">
               <div class="coin-links "><a href="../index.html">Cryptocurrencies   >  </a> <span class="fw-bold">${coin.name}</span></div>
               <br>
<button type="button" class="btn btn-outline-success" data-delay="0" data-toggle="tooltip" data-placement="top" title="${coin.name} is ranked #${marketCapRank} in market cap.">Rank #${marketCapRank}</button>

<div class="col-md-12 my-3 display-5"><img class="coin-icon" src="${coin.image.small}" alt=""><strong class="text-white fw-bold"> ${coin.name}</strong>
<span class="coin-links">${coin.symbol.toUpperCase()}</span>
</div>
<div class="row"><span class="coin-price text-white display-3 fw-bold">$${price} <span class="coin-volChange fs-4" style="position:relative;top:-20px;color: ${colorHour}">${(hourVol).toFixed(2)}%</span>
</div>

<div class="pt-2 d-inlineflex col-md-12">
<span class="btn-group" role="group" aria-label="Third group">
    <button type="button" class="btn btn-secondary border border-dark" data-delay="0" data-toggle="tooltip" data-placement="top" title="Sign up to set price alerts on ${coin.name}!" ><i class="bi bi-bell-fill"></i></button>
    <button type="button" class="btn btn-secondary border border-dark" data-delay="0" data-toggle="tooltip" data-placement="top" title="Add ${coin.name} to your Watchlist!"><i class="bi bi-star"></i></button>
    </span>
  <span class="bg-light col-md-6 py-1 fs-6 fw-bold px-1">☆ On ${followers} watchlists</span>
</span>
</div>
<div class="progress m-t-20">
<progress class="progress-bar bg-success"  style="position:relative;width:${progressBar()}%;height:16px;box-shadow: 1px 1px 4px rgba( 0, 0, 0, 0.2 );" max="${coin.market_data.high_24h.usd}" value="${coin.market_data.current_price.usd}"><span style="color:white; text-shadow:1px 1px 0 black;position:absolute;z-index: 5;">${price}</span></progress>
</div>
<div class="row m-t-20">
<span class="col-md-4 d-flex justify-content-start text-white">$${low}</span>
<span class="col-md-4 d-flex text-light justify-content-center align-center">24h Range</span>
<span class="col-md-4 d-flex text-light justify-content-end">$${high}</span>
</span>
</div>
</div>
</div>
<div class="col-md-4 d-flex">
<h1 class="text-white justify-content-center align-self-center"> henlo</h1>
</div>


<div class="row">

<ul class="col-md-6 list-group list-group-flush bg-dark text-white">
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Valuation derived from multiplying the current price by the circulating supply of tokens available for trade.">?</a> Market Cap: <span style="text-shadow: 1px 1px black;" class="coin-marketcap text-white" style="text-shadow: 1px 1px black;">$${marketCap}</span></li>
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Fully Diluted Valuation. Theoretical value of a currency multiplied by the current price and total supply, includes tokens that are locked in token governance wallets or otherwise withheld from circulation.">?</a> FDV: <span class="coin-marketcap text-white" style="text-shadow: 1px 1px black;">${FDV()}</span></li>
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Trade valuation last 24 hours across all trading platforms.">?</a> 24h Volume: <span class="coin-volume text-white" style="text-shadow: 1px 1px black;">$${volume}</span> <span style="color: ${colorDay};text-shadow:1px 1px 0 black;">${(dayVol).toFixed(2)}%</span></li>
</ul>

<ul class="col-md-6 d-flex list-group list-group-flush text-white">
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Current amount of tokens tradable on the market, excludes 'burned', staked or otherwise 'locked' tokens taken out of circulation.">?</a> Circulating Supply: <span style="text-shadow: 1px 1px black;" class="coin-volume text-white" style="text-shadow: 1px 1px black;">${circulatingSupply()}</span></li>
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Total tokens that already exist minus any that have been 'burned' (removed from circulation). Equivalent to outstanding shares in the stock market.">?</a> Total Supply: <span style="text-shadow: 1px 1px black;" class="coin-marketcap text-white" style="text-shadow: 1px 1px black;">${totalSupply()}</span></li>
  <li class="list-group-item fw-bold bg-secondary"><a type="button" class="btn-sm rounded-circle text-white bg-dark text-decoration-none" data-delay="0" data-toggle="tooltip" data-placement="top" title="Maximum tokens that could exist, some currencies are programmed to theoretically be printed indefintely, their max supply is denoted with the '∞' symbol.">?</a> Max Supply : <span style="text-shadow: 1px 1px black;" class="coin-volume text-white" style="text-shadow: 1px 1px black;">${maxSupply()}</span></li>
</ul>
</div>
<div class="row">
<div class="py-2 bg-dark text-white">
<h3 class="pb-1 text-success">What is ${coin.name}?</h3>
<p>${coin.description.en}</p>
</div>
</div>  
<div class="row">
<ul class="col-md-6 list-group list-group-flush">
<li class="list-group-item fw-bold bg-dark text-secondary"><h3 class="text-primary">${coin.name} Historical</h3></li>
<li class="list-group-item fw-bold bg-dark text-white"> Current price: <span style="color:${colorDay}">$${price}</span> </li>
<li class="list-group-item fw-bold bg-dark text-white"> Today's high: <span class="text-success">$${high}</span> Today's low: <span class="text-warning">$${low}</span></li>
<li class="list-group-item fw-bold bg-dark text-white"> All time high: <span class="text-success">$${ath}</span><span class="text-secondary"> ${new Date(coin.market_data.ath_date.usd).toLocaleDateString('en')}</span> All time low: <span class="text-warning">$${atl}</span><span class="text-secondary">  ${new Date(coin.market_data.atl_date.usd).toLocaleDateString('en')}</span></span></li>

</ul>
</div>

<div class="row">
<div class="container">
<hr class="text-white">
<div class="col-md-12">
<h2 class="pb-1 text-white">What is the market cap of ${coin.name}?</h2>
<h6 class="py-1 text-secondary"><span class="text-white">${coin.name}</span> is ranked <span class="text-white">#${marketCapRank}</span> with a market cap of <span class="text-white">$${marketCap}</span>. Market capitalization is a valuation of total supply multiplied by the current price. </h6>
</div>

<div class="col-md-12">
<h2 class="pb-1 text-white">What is the market sentiment of ${coin.name} today?</h2>
<h6 class="py-1 text-secondary">The price of <span class="text-white">${coin.name}</span> has ${week_priceChange()} in the past 7 days. The community is ${sentiment()} about <span class="text-white">${coin.name}</span> in polls today.</h6>
</div>

<div class="col-md-12">
<h2 class="pb-1 text-white">Where can you buy ${coin.name}?</h2>
<h6 class="py-1 text-secondary"><span class="text-white">${coin.name}</span> can be traded on <span class="text-white">${maxTicker.market.name}</span> where its 24h trade volume was <span class="text-success">$${(maxTicker.volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</span> , the <span class="text-white">highest</span> trade volume of all other exchanges.</h6>
<table class="table table-dark">
<thead>
<h4 class="text-secondary">${coin.name} can also be traded on the following exchanges.</h4>
<tr>
<th scope="col" class="text-white">name</th>
<th scope="col" class="text-white">24h volume</th>
</tr>
</thead>
<tbody>
<tr><td class="text-white">${top5Tickers[0].market.name}</td><td class="text-white">$${(top5Tickers[0].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
<tr><td class="text-white">${top5Tickers[1].market.name}</td><td class="text-white">$${(top5Tickers[1].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
<tr><td class="text-white">${top5Tickers[2].market.name}</td><td class="text-white">$${(top5Tickers[2].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
<tr><td class="text-white">${top5Tickers[3].market.name}</td><td class="text-white">$${(top5Tickers[3].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
<tr><td class="text-white">${top5Tickers[4].market.name}</td><td class="text-white">$${(top5Tickers[4].volume).toLocaleString('en-US',{maximumFractionDigits: 2})}</td></tr>
</tbody>
</table>
</div>
<div class="row">
<div class="py-2 col-md-12">

<!--market table goes here-->

</div>
</div>
</div>
</div> <!--bg-container dark-->

`
                        $('#coin-description').append(chartElement)
        }); //done
        } //try
        catch (e) {
    console.error(e)
    }
}//getShow function












let chart;
const getOHLC = async (coin, days) => {
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

        if (chart) {
            chart.destroy();
        }

        chart = new ApexCharts($("#liveChart")[0], options2);
        chart.render();
    } catch (e) {
        console.error(e);
    }
};




$("#btn1").click(() => {
    getOHLC(Query, '1');
});

$("#btn14").click(() => {
    getOHLC(Query, '14');
});
$("#btn30").click(() => {
    getOHLC(Query, '30');
});

$("#btn90").click(() => {
    getOHLC(Query, '90');
});



// getChart('../mockdb/btcShow.json')
getShow(Query)


