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

//TODO: dont forget to use joi validation
//methods
const getCompaniesList = (req, res) => {
    return res.status(200).json(JSON.parse(JSON.stringify(companies)))
}

const getCompaniesByID = (req, res) => {
    return res.status(200).json(JSON.parse(JSON.stringify(companies)))
}

const createCompanies = (req, res) => {
    return res.status(200).json(JSON.parse(JSON.stringify(companies)))
}

const editCompaniesByID = (req, res) => {
    return res.status(200).json(JSON.parse(JSON.stringify(companies)))
}

const deleteCompaniesByID = (req, res) => {
    return res.status(200).json(JSON.parse(JSON.stringify(companies)))
}

//routes
app.route("/api/v1/companies/list").get(getCompaniesList)
app.route("/api/v1/companies/:id").get(getCompaniesByID)
app.route("/api/v1/companies/create").post(createCompanies)
app.route("/api/v1/companies/edit/:id").put(editCompaniesByID)
app.route("/api/v1/companies/delete/:id").delete(deleteCompaniesByID)

app.listen(app.get("port"), () => {
    console.log(`Listening to port ${app.get("port")}..`)
})
