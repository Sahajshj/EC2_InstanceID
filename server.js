const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
const port = 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Function to fetch instance ID from AWS metadata
const getInstanceId = () => {
  return new Promise((resolve, reject) => {
    http.get("http://169.254.169.254/latest/meta-data/instance-id", (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(data);
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
};

// API route to get instance ID
app.get("/instance-id", async (req, res) => {
  try {
    const instanceId = await getInstanceId();
    res.json({ instanceId });
  } catch (error) {
    res.status(500).json({ error: "Error fetching Instance ID" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
