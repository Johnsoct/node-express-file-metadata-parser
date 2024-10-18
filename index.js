var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer')

var app = express();
const upload = multer({ dest: 'uploads/' })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
        res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
        try {
                console.log(req.file)
                res.json({ 
                        file: req.file,
                        name: req.file.originalname,
                        type: req.file.mimetype,
                        size: req.file.size,
                })
        }
        catch (error) {
                next(error)
        }
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
        console.log('Your app is listening on port ' + port)
});
