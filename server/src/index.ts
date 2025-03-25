import express from 'express';

const app = express();
const port = process.env.SERVER_PORT || 8000

app.get("/", (req, res) => {
    res.send("<h1>Hello from the server another test yippie hello world</h1>")
})

app.listen(port, ()=> {
    console.log("The Server is running on http://localhost8000")
});