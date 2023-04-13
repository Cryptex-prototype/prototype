const Query = 'bitcoin';

const getShow = async (input) => {
    $('#coinChart').empty()
    try {
        // $.getJSON(`https://api.coingecko.com/api/v3/coins/${input}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`)
        $.getJSON('../mockdb/btcShow.json')
            .done(function (coin) {
                    let marketCap = new Intl.NumberFormat("en-US", {
                        style: "decimal"
                    }).format(coin.market_data.market_cap.usd);
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
<button type="button" class="btn btn-outline-success">Rank #${marketCapRank}</button>
Rank #${marketCapRank}

<div class="col-md-12 my-3 display-5"><img class="coin-icon" src="${coin.image.small}" alt=""><strong class="text-white fw-bold"> ${coin.name}</strong>
<span class="coin-links">${coin.symbol.toUpperCase()}</span>
</div>
<div class="row"><span class="coin-price text-white display-3 fw-bold">$${price} <span class="coin-volChange fs-4" style="position:relative;top:-20px;color: ${colorHour}">${(hourVol).toFixed(2)}%</span>
</div>
<div class="pt-2 d-inlineflex col-md-12">
<span class="bg-light col-md-6 py-1 fs-6 fw-bold px-1">On ${followers} watchlists</span>
</div>
<div class="pt-2 d-inlineflex col-md-12">
<progress class="progress-bar" style="width:46%;box-shadow: 1px 1px 4px rgba( 0, 0, 0, 0.2 );" max="${coin.market_data.high_24h.usd}" value="${coin.market_data.current_price.usd}">$${price}</progress>
<div class="row col-md-6">
<span class="col-md-4 d-flex justify-content-start text-white">$${low}</span>
<span class="col-md-4 d-flex text-light justify-content-center align-center">24h Range</span>
<span class="col-md-4 d-flex text-light justify-content-end">$${high}</span>
</span>
</div>
</div>
<div class="row">
<div class="py-2 bg-dark text-white">
<h3 class="pb-1 text-success">What is ${coin.name}?</h3>
<p>${coin.description.en}</p>
</div>
</div>  
<div class="row">

<ul class="col-md-6 list-group list-group-flush bg-dark text-white">
  <li class="list-group-item">Market Cap: <span class="coin-marketcap text-secondary">$${marketCap}</span></li>
  <li class="list-group-item">24h Volume: <span class="coin-volume text-secondary">$${volume}</span> <span style="color: ${colorDay}">${dayVol}</span></li>
  <li class="list-group-item">7d Volume: <span class="coin-volChange text-secondary" style="color: ${colorWeek}">${(weekVol)}%</span></li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul>

<ul class="col-md-6 d-flex list-group list-group-flush text-white">
  <li class="list-group-item">Circulating Supply: <span class="coin-volume text-secondary">${coin.market_data.circulating_supply}</span><a type="button" class="btn-sm rounded-circle border border-dark" data-delay="0" data-toggle="tooltip" data-placement="top" title="Tokens that are in current circulation, available for trade and not locked by stakers or insiders">?</a></li>
  <li class="list-group-item">Total Supply: <span class="coin-marketcap text-secondary">${coin.market_data.total_supply}</span><a type="button" class="btn-sm rounded-circle border border-light" data-delay="0" data-toggle="tooltip" data-placement="top" title="Total tokens that already exist minus any that have been 'burned' (removed from circulation). Equivalent to outstanding shares in the stock market.">?</a></li>
  <li class="list-group-item">Max Supply : <span class="coin-volume text-secondary">${coin.market_data.max_supply}</span> <a type="button" class="btn-sm rounded-circle border border-dark" data-delay="0" data-toggle="tooltip" data-placement="top" title="Maximum tokens that could exist, some currencies are programmed to theoretically be printed indefintely, their max supply is denoted with the '∞' symbol.">?</a></li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul>
</div>
<span class="coin-volChange" style="color: ${colorDay};">${(dayVol).toFixed(2)}%</span>
<span class="coin-volChange" style="color: ${colorWeek}">${(weekVol).toFixed(2)}%</span>
<span class="coin-volume">${volume}</span>

<span class="coin-high">${high}</span>
<span class="coin-low">${low}</span>

`


                        $('#coin-description').append(chartElement)

        }); //done
        } //try
        catch (e) {
    console.error(e)
    }
}
getShow()
// getChart('../mockdb/btcShow.json')
// getShow('sushi')


// <div id="${coin.id}-sparkline" class="loading">${sparkValue}
//     <span>L</span>
// <span>o</span>
// <span>a</span>
// <span>d</span>
// <span>i</span>
// <span>n</span>
// <span>g</span>
// <span>.</span>
// <span>.</span>
// <span>.</span>
// </div></div>
// </div>

// $(`#${coin.id}-sparkline`).sparkline(sparkValue,{type: 'line',lineWidth: 2, lineColor:`${colorDay}`,fillColor:false, width: 300, height:100,  normalRangeMax: coin.ath})