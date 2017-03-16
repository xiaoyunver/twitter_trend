// Word Cloud
//=================================

function generateCloud(date, selectedID, wordFrequency) {

    // get target data
    console.log(wordFrequency)
    var targetData = [], tempData;
    var wordCloudFormatList = []
    wordFrequency.forEach(function (d) {
        if (d.id == selectedID) {
            console.log(d.query)
            d.news_date.forEach(function (newsDate) {
                if (newsDate.date == date) {
                    console.log(newsDate.date)
                    tempData = newsDate.news_word
                }
            })
        }
    })
    tempData.forEach(function (d) {
        if (d.key != "...") {
            targetData.push(d)
            wordCloudFormatList.push(
                [
                    d.key,
                    d.value
                ]
            )
        }
    })

    // get target container
    var container = d3.select("#" + selectedID).select(".wordCloud");
    var containerWidth = parseInt(container.style('width'))
    console.log(containerWidth)

    var canvas = container.select("canvas");

    // set canvas width and height
    var cloudH = container.style('height');
    var cloudW = containerWidth * 0.9


    var canvasLRMargin = (containerWidth-cloudW) / 2

    canvas
        .attr("height", cloudH)
        .attr("width", cloudW + 'px')
        .style("margin-left",canvasLRMargin+'px')
        .style("margin-right",canvasLRMargin+'px')




    // calculate font size
    console.log(wordCloudFormatList)

    var dataExtent = d3.extent(targetData, function (d) {
        return d.value
    })

    var minFontSizeSupport = WordCloud.minFontSize
    var maxFontSize = cloudW * 0.2

    var cloudScale = d3.scaleLinear().domain(dataExtent).range([minFontSizeSupport,maxFontSize])
    wordCloudFormatList.forEach(function (d) {
        d[1] = cloudScale(d[1])
    })

    // word cloud options
    var options = {
        list: wordCloudFormatList
    }
    // generate word cloud
    WordCloud(canvas.node(),options)

}


//=================================