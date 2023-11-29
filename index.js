const express = require('express');
const sequelize = require('./database');
const Customer = require('./customer');


sequelize.sync().then(() => console.log('db is ready'));

const app = express();
const port = 3000;

app.use(express.json());

app.post('/customers', async (req, res) => {
   try {
     await Customer.create(req.body);
     res.send('Customer has been added');
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Failed to add customer' });
   }
 });


 app.get('/customers', async (req, res) => {
   try {
     const { firstName, lastName, age } = req.query;
     console.log(req.query);

     const multipleCriteria = {};
     if (firstName) {
       multipleCriteria.customerfirstname = firstName;
     }
     if (lastName) {
      multipleCriteria.customerlastname = lastName;
    }
     if (age) {
       multipleCriteria.customerage = age;
     }

     const customers = await Customer.findAll({ where: multipleCriteria });

     res.json(customers);
   } catch (err) {

     console.error(err);
     res.status(500).json({ error: 'Internal server error' });
   }
 });

 app.get('/customers/:id', async (req, res) => {
   try {
     const getId = req.params.id;
     const customer = await Customer.findOne({ where: { id: getId } });

     if (!customer) {
       return res.status(404).json({ error: 'Customer not found' });
     }

     res.json(customer);
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Failed to fetch customer' });
   }
 });


 app.put('/customers/:id', async (req, res) => {
   try {
     const getId = req.params.id;
     const customer = await Customer.findOne({ where: { id: getId } });

     if (!customer) {
       return res.status(404).json({ error: 'Customer not found' });
     }

     customer.customerfirstname = req.body.customerfirstname;
     customer.customerlastname = req.body.customerlastname;
     customer.customeremail = req.body.customeremail;
     customer.customerage = req.body.customerage;

     await customer.save();

     res.json(customer);
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Failed to update customer' });
   }
 });


app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
