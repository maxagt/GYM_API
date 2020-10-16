const express = require('express');
const app = express();
const dbfunctions = require('./dbfunctions');
const auth = require('./auth');
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

//Middleware use
app.use(express.json());

// GET request routes
app.get('/members/', auth, (req, res) => { 
    const memberFullName = req.query.memberFullName || '';
    const limit = req.query.limit || '100000000';
    const clientUsername = res.locals.username;
    dbfunctions.getMembers(clientUsername, memberFullName, limit).then((rows) => res.json(rows))
                .catch((error) => res.status(400).json(error));
});

app.get('/payments/', auth, (req, res) => {  
  const start = req.query.start || '';
  const end = req.query.end || '';
  const method = req.query.method || '';
  const clientUsername = res.locals.username;
  dbfunctions.getPaymentsByTimeFrame(clientUsername, start, end, method).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

app.get('/members/:id', auth, (req, res) => {  
  const id = req.params.id || '';
  const clientUsername = res.locals.username;
  dbfunctions.getMemberById(clientUsername, id).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

app.get('/payments/:id', auth, (req, res) => {  
  const id = req.params.id || '';
  const clientUsername = res.locals.username;
  dbfunctions.getPaymentsByMemberId(clientUsername, id).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

app.get('/prices/', auth, (req, res) => {  
  const clientUsername = res.locals.username;
  dbfunctions.getPrices(clientUsername).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});


app.get('/sn/', auth, (req, res) => {  
  const id = req.params.id || '';
  const clientUsername = res.locals.username;
  dbfunctions.getSerialNumber(clientUsername).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

app.get('/visits/:id/:limit', auth, (req, res) => {  
  const id = req.params.id || '';
  const limit = req.params.limit || '100';
  const clientUsername = res.locals.username;
  dbfunctions.getVisitsByMemberId(clientUsername, id, limit).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

app.get('/visits/:date', auth, (req, res) => {  
  const date = req.params.date || '';
  const format = Joi.date().format('YYYY-MM-DD');
  const result = Joi.validate(date, format);
  if(result.error !== null){
    res.status(400).json(result.error);
  } 

  const clientUsername = res.locals.username;
  dbfunctions.getVisitsByDate(clientUsername, date).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

app.get('/expDate', auth, (req, res) => {  
  const clientUsername = res.locals.username;
  dbfunctions.getExpDate(clientUsername).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

app.get('/now', auth, (req, res) => {  
  dbfunctions.now().then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

app.get('/fingerprints', auth, (req, res) => {  
dbfunctions.getAllFingerPrints(res.locals.username).then((rows) => res.json(rows))
            .catch((error) => res.status(400).json(error));
});

// PUT request routes
app.put('/members/:id', auth, (req, res) => {  
  const id = req.params.id || '';
  const clientUsername = res.locals.username;
  dbfunctions.updateMemberById(clientUsername, id).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

app.put('/members/update/:id', auth, (req, res) => {  
  const id = req.params.id || '';
  const clientUsername = res.locals.username;
  const data = req.body;
  dbfunctions.updateMember(clientUsername, id, data).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

// POST request routes
app.post('/members/:id', auth, (req, res) => {  
  const id = req.params.id || '';
  const clientUsername = res.locals.username;
  dbfunctions.insertVisitById(clientUsername, id).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

app.post('/members/', auth, (req, res) => { 
  const clientUsername = res.locals.username;
  const data = req.body;
  dbfunctions.insertMember(clientUsername, data).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

app.post('/products/', auth, (req, res) => { 
  const clientUsername = res.locals.username;
  dbfunctions.insertProduct(clientUsername).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

app.delete('/products/:id', auth, (req, res) => { 
  const clientUsername = res.locals.username;
  const id = req.params.id;
  dbfunctions.deleteProduct(clientUsername, id).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

app.post('/payments/make/', auth, (req, res) => { 
  const clientUsername = res.locals.username;
  const data = req.body;
  dbfunctions.insertPayment(clientUsername, data).then((rows) => res.json(rows))
              .catch((error) => res.status(400).json(error));
});

app.post('/login/', auth, (req, res) => { 
  const data = req.body;
  dbfunctions.login(data).then(data => res.json(data))
              .catch((error) => res.status(400).json(error));
});

//Default route 404 not found
app.get('*', function(req, res){
    res.status(404).send('Not found!');
  });





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));