const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

let contacts = require('./data');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

//======================= GET ALL =====================================================
app.get('/api/contacts',(request,response) => {
    if(!contacts){
        response.status(404).json({message:'No contacts found'});
    }
    response.json(contacts);
});
//=====================================================================================
//========================= GET ONE ===================================================
app.get('/api/contacts/:id' , (request, response) => {
    const requestId = request.params.id;
    let contact = contacts.filter(contact => {
        return contact.id == requestId;
    });

    if(contact.length==0){
        response.status(404).json({message:'No contact found'});
    }
    response.json(contact[0]);
});
//=====================================================================================
//===================================== POST ==========================================
app.post('/api/contacts', (request, response) => {
    const contact ={   
        id: contacts.length+1,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        website: request.body.website
    }

    contacts.push(contact);

    response.json(contact);
});
//====================================================================================
//===================================== PUT ==========================================
app.put('/api/contacts/:id', (req,res)=>{

    const reqId = req.params.id;

    let contact = contacts.filter(contact => {return contact.id==reqId})[0];

    const index = contacts.indexOf(contact);
    const keys = Object.keys(req.body);

    keys.forEach(key=>{
        contact[key] = req.body[key];
    });

    contacts[index] = contact;
    res.json(contacts[index]);
});
//=====================================================================================
//==================================== DELETE =========================================
app.delete('/api/contacts/:id', (req,res)=>{
    const reqId = req.params.id;
    let contact = contacts.filter(contact => {return reqId==contact.id})[0];
    const index = contacts.indexOf(contact);

    contacts.splice(index,1);
    
    res.json({message:"Contact "+reqId+" Deleted"});
});
//=====================================================================================
//==================================== Server =========================================
const hostname = 'localhost';
const port = '3001';

app.listen(port,hostname, () => {
    console.log('Server is running at http://'+hostname+':'+port);
});
//=====================================================================================