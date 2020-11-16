const express = require('express')
const app = express();
const cors = require("cors");
const child_process = require("child_process")
const port = 5501

app.use(cors());

app.get('/status', (req, res) => {
    child_process.exec("tasklist.exe", function(err, stdout, stderr){
        if(!err){
            console.log();
            if(stdout.indexOf("Zoom") !== -1){
                res.status(403).end();
            }else{
                res.status(200).end();
            }
        }else{
            console.log(err, stderr)
            res.status(200).end();
        }
    })
});

app.get("/", (req, res) => {
    res.send("Blocked while Zoom is running.");
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})