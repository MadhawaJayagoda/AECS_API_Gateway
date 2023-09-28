const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const logger = require("./logger");
const port = process.env.PORT || 8090;

app.use(bodyParser.json());

app.use((req, res, next) => {
  logger.info(`API Gateway: ${req.method} ${req.url}`);
  next();
});

// Get the metrics of a Developer for a particular month
app.get("/api/metrics/:username/:year/:month", async (req, res) => {
  const { username, year, month } = req.params;

  try {
    const response = await axios.get(
      `http://localhost:8000/metrics/${username}/${year}/${month}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Get the today's metrics of a Developer on a particular repository
app.get("/api/metrics/:username/:repository", async (req, res) => {
  const { username, repository } = req.params;

  try {
    const response = await axios.get(
      `http://localhost:8080/process/data/${username}/${repository}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

logger.on("error", (error) => {
  console.log(`Logger encountered an error: ${error.message}`);
});

app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
