const DataStore = require("nedb")
const bodyParser = require("body-parser")
const express = require("express")
const cors = require("cors")
const app = express()


app.use(cors())
app.use('/static', express.static("./public"))
app.use(bodyParser.json())



const EVENTS_PATH = "./events.db"
const db = new DataStore({ filename: "./nedb.db", autoload: true })


db.events = new DataStore({ filename: "./events.db", autoload: true })

// db.events.insert({
//     'name': "sample event",
//     'date': '2021-02-22'
// })


class Event {
    constructor({ name, url, start_dt, end_dt }) {
        this.name = name;
        this.url = url;
        this.start_dt = start_dt;
        this.end_dt = end_dt;
    }

    write_to_db(path, func) {
        const current_db = new DataStore({ filename: path, autoload: true })
        current_db.insert({
            title: this.name,
            url: this.url,
            start: this.start_dt,
            end: this.end_dt
        }, func)
    }

}


app.get('/events', (req, res) => {
    db.events.loadDatabase()
    db.events.find({}, (err, resp) => {
        if (err) {
            res.json({
                success: false,
                message: err,
                text: "something went wrong"
            }).status(500)
        }

        res.json({
            success: true,
            message: resp,
            text: "Here are the list of events"
        }).status(200)
    })

})

app.post('/events', (req, res) => {
    const event = new Event(req.body);
    event.write_to_db(EVENTS_PATH, (err, resp) => {
        if (err) {
            res.json({
                success: false,
                message: err,
                text: "something went wrong"
            }).status(500)
        }

        res.json({
            success: true,
            message: resp,
            text: "Event created successfully"
        }).status(200)
    })
    console.log(req.body, " is the request body");
})


app.listen(process.env.PORT || 5000, () => { console.log("Server started") })