const express = require("express")
const app = express()

//middleware
app.use(express.json())

//port
app.set("port", process.env.PORT)

let companies = [
    {
        id: "1e5fa50d-67a9-4a85-a1c1-4ae3dd63de16",
        name: "Toyota",
        industry: "automotive"
    },
    {
        id: "388eefa4-8cba-4f87-9fba-4ac8f51d67e5",
        name: "Ford",
        industry: "automotive"
    },
]

//methods
const getCompaniesList = (req, res) => {
    res.status(200).json(JSON.parse(JSON.stringify(companies)))
}

//routes
app.route("/api/v1/companies/list").get(getCompaniesList)

app.listen(app.get("port"), () => {
    console.log(`Listening to port ${app.get("port")}..`)
})
