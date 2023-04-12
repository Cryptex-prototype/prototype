const Query = 'bitcoin';

const getChart = async (url) => {
    $('#coinChart').empty()
    try {
        $.getJSON(url)
            .done(function (coin) {
                    let marketCap = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        notation: "compact",
                        compactDisplay: "long",
                        maximumSignificantDigits: 3
                    }).format(coin.market_data.market_cap.usd);
                    let price = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        notation: "compact",
                        compactDisplay: "long",
                        maximumSignificantDigits: 4
                    }).format(coin.market_data.current_price.usd);
                    let volume = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        notation: "compact",
                        compactDisplay: "long",
                        maximumSignificantDigits: 3
                    }).format(coin.market_data.total_volume.usd)
                    let high = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        notation: "compact",
                        compactDisplay: "long",
                        maximumSignificantDigits: 3
                    }).format(coin.market_data.high_24h.usd)
                    let low = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        notation: "compact",
                        compactDisplay: "long",
                        maximumSignificantDigits: 3
                    }).format(coin.market_data.low_24h.usd)
                    let marketCapRank = coin.market_data.market_cap_rank

                    let colorDay = coin.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 'green' : 'red';
                    let color = coin.market_data.price_change_percentage_24h_in_currency.usd > 0 ? 'green' : 'red';
                    let colorWeek = coin.market_data.price_change_percentage_7d_in_currency.usd > 0 ? 'green' : 'red';

console.log(coin.market_data.price_change_percentage_24h_in_currency.usd)
                console.log(price)
                console.log(volume)
                console.log(high)
                console.log(low)
                console.log(marketCapRank)
                console.log(marketCap)



                    let sparkValue = coin.market_data.sparkline_7d.price
                    let chartElement = "";
                    // chartElement +=



        }); //done
        } //try
        catch (e) {
    console.error(e)
    }
}

getChart('../mockdb/btcShow.json')