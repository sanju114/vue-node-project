const express = require("express");
const { pool } = require("./pg");
var cors = require("cors");
const app = express();
const port = 1400;
app.use(cors());
app.use(express.json());

app.post("/SignUp", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!email) {
      return res.status(400).json({ message: "Valid email is required" });
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    if (confirmPassword !== password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const insertQuery =
      "INSERT INTO app_user (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, email, password];

    pool
      .query(insertQuery, values)
      .then((r) => {
        return res
          .status(200)
          .json({ message: "User inserted successfully", user: r.rows[0] });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: error });
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
