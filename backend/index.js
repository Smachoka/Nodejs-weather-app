const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    try {
        const apiKey = "2acbb064d1d79391fd40ecd4ee692ae0";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        
        const response = await axios.get(url);
        const weatherResult = response.data;

        console.log({ result: weatherResult });
        res.send({ result: weatherResult });
    } catch (err) {
        res.status(404).json({ error: "Location not found" + err });
    }
});

app.listen(3300, () => {
    console.log("Server is running on port 3300");
});
