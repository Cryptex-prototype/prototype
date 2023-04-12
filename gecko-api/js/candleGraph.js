
$.ajax('https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=1').done(function (candles) {

    let options2 = {
        series: [{
            data: Array.from({length: candles.length}, () => ({
                x: null,
                y: [[], [], [], []]
            }))
        }]
        ,
        chart: {
            type: 'candlestick',
            height: 350
        },
        title: {
            text: 'CandleStick Chart',
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
    }

    for (let i = 0; i < candles.length; i++) {

        options2.series[0].data[i].x = new Date(candles[i][0] * 1000);
        options2.series[0].data[i].y[0].push(candles[i][1]);
        options2.series[0].data[i].y[1].push(candles[i][2]);
        options2.series[0].data[i].y[2].push(candles[i][3]);
        options2.series[0].data[i].y[3].push(candles[i][4]);
    }
    console.log(options2.series[0].data[1])


    let chart = new ApexCharts(document.querySelector("#chart"), options2);
    chart.render();
})






//todo refernce
// console.log(options2.series[0].data[0].x) // this is the date
// console.log(options2.series[0].data[0].y) //this is 0-3 based on the number
// console.log(options2.series[0].data[1].x) // this is the date
// console.log(options2.series[0].data[1].y) //this is 0-3 based on the number
// console.log(options2.series[0].data[1].y[1])





