const express = require("express");
const path = require("path")
const cookieParser = require('cookie-parser')
const { connectToMongoDB } = require("./connection")
const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth')
const URL = require("./models/url");
const userRoute = require('./routes/user')
const staticRoute = require("./routes/staticRouter")
const urlRoute = require("./routes/url")

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/url", restrictToLoggedInUserOnly, urlRoute)
app.use("/user", userRoute)
app.use("/", checkAuth, staticRoute)



app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls
    })
})

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    )
    res.redirect(entry.redirectURL)
})






app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})