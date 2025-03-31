// // SERRVER FOR HANDLING EMAIL FOR PORTFOLIO WEBSITE

// require("dotenv").config();

// const express = require("express");
// const router = express.Router();
// const cors = require("cors");
// const nodemailer = require("nodemailer");

// // server used to send send emails
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/", router);
// app.listen(5000, () => console.log("Server Running"));

// const Email = process.env.EMAIL_USER ;
// const Pass = process.env.EMAIL_PASS;

// const contactEmail = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: Email,
//     pass: Pass
//   },
// });

// contactEmail.verify((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready to Send");
//   }
// });

// router.post("/contact", (req, res) => {
//   const name = req.body.firstName + req.body.lastName;
//   const email = req.body.email;
//   const message = req.body.message;
//   const phone = req.body.phone;
//   const mail = {
//     from: name,
//     to: Email,
//     subject: "Contact Form Submission - Portfolio",
//     html: `<p>Name: ${name}</p>
//            <p>Email: ${email}</p>
//            <p>Phone: ${phone}</p>
//            <p>Message: ${message}</p>`,
//   };
//   contactEmail.sendMail(mail, (error) => {
//     if (error) {
//       res.json(error);
//     } else {
//       res.json({ code: 200, status: "Message Sent" });
//     }
//   });
// });

























// SERVER FOR HANDLING STORING LIKED RECIPE FOR ROBORECIPE APP


const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const filePath = "./likedRecipes.json";

// ✅ Function to read existing liked recipes
const readRecipes = () => {
    if (!fs.existsSync(filePath)) return [];
    try {
        const data = fs.readFileSync(filePath, "utf8"); // Read as a string
        return JSON.parse(data); // Convert to JSON
    } catch (error) {
        console.error("Error reading or parsing the file:", error);
        return []; // Return an empty array if there's an error
    }
};

// ✅ Endpoint to get all liked recipes
app.get("/liked-recipes", (req, res) => {
    const recipes = readRecipes();
    res.json(recipes);
});

// ✅ Endpoint to save a liked recipe
app.post("/like-recipe", (req, res) => {
    const { recipe } = req.body;
    if (!recipe) {
        return res.status(400).json({ message: "Recipe data is missing" });
    }

    let recipes = readRecipes();

    // Avoid duplicates based on title
    if ((!recipes.some((r) => r.title === recipe.title ) || recipe)) {
        console.log("Saving new liked recipe:", recipe);
        recipes.push(recipe);
        try {
            fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2), "utf8");
            res.json({ message: "Recipe saved successfully", recipes });
        } catch (error) {
            console.error("Error saving liked recipes:", error);
            res.status(500).json({ message: "Failed to save the recipe" });
        }
    } else {
        res.json({ message: "Recipe already exists in liked recipes", recipes });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
