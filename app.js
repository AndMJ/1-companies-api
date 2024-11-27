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

//find company
const findCompany = async (key, value) => {
    return companies.find((company) => company[key] === value)
}

//TODO: dont forget to use joi validation
//methods
const getCompaniesList = async (req, res) => {
    return res.status(200).json(JSON.parse(JSON.stringify(companies)))
}

const getCompaniesByID = async (req, res) => {
    try {
        const found = await findCompany("id", req.params.id)
        if (!found){
            return res.status(404).json({"code": 404, "message": "Company not found."})
        }
        return res.status(200).json(JSON.parse(JSON.stringify(found)))
    } catch (e) {
        return res.status(404).json({"code": 404, "message": e})
    }

}

const createCompanies = async (req, res) => {
    try {
        const newCompany = {
            id: crypto.randomUUID(),
            name: req.body.name,
            industry: req.body.industry
        }

        const found = await findCompany("name", req.body.name)
        if (found){
            return res.status(404).json({"code": 404, "message": "Company already exists."})
        }

        companies.push(newCompany)

        return res.status(200).json(JSON.parse(JSON.stringify(newCompany)))
    } catch (e) {
        return res.status(404).json({"code": 404, "message": e})
    }
}

const editCompaniesByID = async (req, res) => {
    try {
        const editCompany = {
            id: req.params.id,
            name: req.body.name,
            industry: req.body.industry
        }

        const found = await findCompany("id", editCompany.id)
        if (!found){
            return res.status(404).json({"code": 404, "message": "Company not found."})
        }

        found.name = editCompany.name
        found.industry = editCompany.industry

        return res.status(200).json(JSON.parse(JSON.stringify(found)))
    } catch (e) {
        return res.status(404).json({"code": 404, "message": e})
    }
}

const deleteCompaniesByID = async (req, res) => {
    try {
        const found = await findCompany("id", req.params.id)
        if (!found){
            return res.status(404).json({"code": 404, "message": "Company doesnt exist."})
        }

        companies = companies.filter(company => company.id !== req.params.id)

        return res.status(200).json({"code": 200, "message": "Company deleted."})
    } catch (e) {
        return res.status(404).json({"code": 404, "message": e})
    }

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
