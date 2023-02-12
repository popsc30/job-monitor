const axios = require("axios");
const fs = require('fs');
const express = require('express')
const cors = require('cors')
const moment = require('moment')

const app = express()
app.use(express.json(), cors())


// Define the job type ID to retrieve
const filePathWel = './assets/wel.json';
const filePathAkl = './assets/akl.json';


// Define the API endpoint
const apiWelUrl = "https://jobsearch-api-ts.cloud.seek.com.au/v4/counts?where=All+Wellington";
const apiAklUrl = "https://jobsearch-api-ts.cloud.seek.com.au/v4/counts?where=All+Auckland";

async function grabData() {
  // Retrieve the data from the API
  const resWel = await axios.get(apiWelUrl);
  const resAkl = await axios.get(apiAklUrl);

  const jobMapsWel = (resWel.data.counts)[1].items;
  const jobMapsAkl = (resAkl.data.counts)[1].items;

  var jdataWel = {}
  jdataWel.date = moment().format('YYYY-MM-DD')
  jdataWel.Testing = +jobMapsWel["6301"]
  jdataWel.Developers = +jobMapsWel["6287"]
  jdataWel.Engineer = +jobMapsWel["6290"]

  var jdataAkl = {}
  jdataAkl.date = moment().format('YYYY-MM-DD')
  jdataAkl.Testing = +jobMapsAkl["6301"]
  jdataAkl.Developers = +jobMapsAkl["6287"]
  jdataAkl.Engineer = +jobMapsAkl["6290"]


  fs.readFile(filePathWel, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let jsonData = JSON.parse(data);
    jsonData.push(jdataWel);

    fs.writeFile(filePathWel, JSON.stringify(jsonData), 'utf-8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Wel Data inserted successfully!');
    });
  });

  fs.readFile(filePathAkl, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let jsonData = JSON.parse(data);
    jsonData.push(jdataAkl);

    fs.writeFile(filePathAkl, JSON.stringify(jsonData), 'utf-8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Akl Data inserted successfully!');
    });
  });

}


setInterval(() => {
  grabData();
}, 1000*60*60*24); 

app.get('/wel', async (req, res) => {
  fs.readFile(filePathWel, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let jsonData = JSON.parse(data);
    res.send(jsonData)
  });
})

app.get('/akl', async (req, res) => {
  fs.readFile(filePathAkl, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let jsonData = JSON.parse(data);
    res.send(jsonData)
  });
})

app.listen(11000, () => {
  console.log('listening on port 11000')
})
