import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;
const API_URL = "https://secrets-api.appbrewery.com";

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const {
      data: { secret, username },
    } = await axios.get(`${API_URL}/random`);
    res.render("index.ejs", {
      secret: JSON.stringify(secret),
      user: JSON.stringify(username),
    });
  } catch (error) {
    const { data } = error.response;
    res.render("index.ejs", { secret: JSON.stringify(data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
