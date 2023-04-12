const Query = 'bitcoin';

const getShow = async (input) => {
    $('#coinChart').empty()
    try {
        $.getJSON(`https://api.coingecko.com/api/v3/coins/${input}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`)
            .done(function (coin) {
                    let marketCap = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        notation: "compact",
                        compactDisplay: "long",
                        maximumSignificantDigits: 3
                    }).format(coin.market_data.market_cap.usd);
                    let price = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.current_price.usd);
                    let followers = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.community_data.twitter_followers);
                    console.log(coin.market_data.current_price.usd)
                    let volume = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        notation: "compact",
                        compactDisplay: "long",
                        maximumSignificantDigits: 3
                    }).format(coin.market_data.total_volume.usd)
                    let high = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.high_24h.usd)
                    let low = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.low_24h.usd)
                    let marketCapRank = coin.market_data.market_cap_rank

                    let colorHour = coin.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 'green' : 'red';
                    let colorDay = coin.market_data.price_change_percentage_24h_in_currency.usd > 0 ? 'green' : 'red';
                    let colorWeek = coin.market_data.price_change_percentage_7d_in_currency.usd > 0 ? 'green' : 'red';
let hourVol = coin.market_data.price_change_percentage_1h_in_currency.usd
let dayVol = coin.market_data.price_change_percentage_24h_in_currency.usd
let weekVol = coin.market_data.price_change_percentage_7d_in_currency.usd
console.log(coin.market_data.price_change_percentage_24h_in_currency.usd)
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
               <div class="coin-links "><a href="../index.html">Cryptocurrencies   >  </a> <span class="fw-bold">${coin.name}</span></div>
               <br>
<div class="coin-marketcapRank col-md-2 py-1 fs-6 fw-bold">Rank #${marketCapRank}</div>

<div class="col-md-12 my-3 display-5"><img class="coin-icon" src="${coin.image.thumb}" alt=""><strong class="text-white fw-bold"> ${coin.name}</strong>
<span class="coin-links">${coin.symbol.toUpperCase()}</span>
</div>
<div class="row"><span class="coin-price text-white display-3 fw-bold">$${price} <span class="coin-volChange" style="color: ${colorHour}">${(hourVol).toFixed(2)}%</span>
</div>
<div class="pt-2 col-md-12">
<progress class="w-50" max="${coin.market_data.high_24h.usd}" value="${coin.market_data.current_price.usd}">$${price}</progress>
<div>
<span class="no-wrap text-white">$${low}</span>
<span class="text-light align-center">
24H Range
</span>
<span class="no-wrap text-light justify-content-center">$${high}</span>
</span>
</div>
</div>

<span class="bg-light col-md-6 py-1 fs-6 fw-bold px-1">On ${followers} Watchlists</span>
<span class="coin-volChange" style="color: ${colorDay};">${(dayVol).toFixed(2)}%</span>
<span class="coin-volChange" style="color: ${colorWeek}">${(weekVol).toFixed(2)}%</span>
<span class="coin-volume">${volume}</span>
<span class="coin-marketcap">${marketCap}</span>
<span class="coin-high">${high}</span>
<span class="coin-low">${low}</span>
<div id="${coin.id}-sparkline" class="loading">${sparkValue}
<span>L</span>
  <span>o</span>
  <span>a</span>
  <span>d</span>
  <span>i</span>
  <span>n</span>
  <span>g</span>
  <span>.</span>
  <span>.</span>
  <span>.</span>
  </div></div>
</div>
`


                        $('#coin-description').append(chartElement)
                $(`#${coin.id}-sparkline`).sparkline(sparkValue,{type: 'line',lineWidth: 2, lineColor:`${colorDay}`,fillColor:false, width: 500, height:200,  normalRangeMax: coin.ath})

        }); //done
        } //try
        catch (e) {
    console.error(e)
    }
}

// getChart('../mockdb/btcShow.json')
getShow('sushi')