

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
                    return `${coinData.name}` + days + ` day`
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



//event listeners for buttons, hardcoded atm
$("#btn1").click(() => {
    getOHLC('bitcoin', '1');
});

$("#btn14").click(() => {
    getOHLC('bitcoin', '14');
});
$("#btn30").click(() => {
    getOHLC('bitcoin', '30');
});

$("#btn90").click(() => {
    getOHLC('bitcoin', '90');
});






