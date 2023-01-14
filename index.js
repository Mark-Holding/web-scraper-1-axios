const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const PORT = 8000


const app = express()
const url = 'https://www.dailymail.co.uk/home/index.html'


axios(url)
 .then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const articles = []

    $('.linkro-darkred', html).each(function () {
        const title = $(this).text()
        const url = $(this).find('a').attr('href')
        const img = $(this).find('img').attr('src')
        articles.push({
            title,
            url,
            img
        })
    })
    console.log(articles)
 
 }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
