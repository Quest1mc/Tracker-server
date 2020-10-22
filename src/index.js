require('./models/User')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');




const app = express();
app.use(bodyParser.json());

app.use(authRoutes);

const mongoUri = 'mongodb+srv://Q1solutionsadmin:<password>@cluster0.cpva2.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
    
});

mongoose.connection.on('connected',()=>{
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error',()=>{
    console.log('Error connecting to mongo instance', err);
});


app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is : ${req.user.email}`);
});

app.listen(3000, ()=>{
    console.log('Loud and clear on port 3000');

})