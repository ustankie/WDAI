
const express = require('express')
const app = express()
const router=require('./app.js')
const port = 3000
app.use(express.json());

app.use('/', router);



app.get('/hello', (req, res) => {
    res.status(200).json('Hello World!')
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})


router.get('/hello',(req,res,next)=>{
    res.status(200).json('Hello World!')
})

router.get('/hello/:name',(req,res,next)=>{
    const value = req.params.name;
    console.log(value);
    res.status(500).json('Hello '+value+"!");
})


router.post('/',(req,res,next)=>{})

console.log("H")

var models = require("./db.js")
models.sequelize.sync().then(function() {
console.log('connected to database')
}).catch(function(err) {
console.log(err)
});







router.get('/person', (req, res, next) => {
    const surname = req.query.surname;
    console.log("aaaaa");
    if (surname==null){
        models.PersonSchema.findAll()
        .then((people) => {
          console.log(people);
          res.status(200).json(people);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    }
    else{
        console.log(surname);
        models.PersonSchema.findAll()
        .then((people) => {
            const people1=people.filter(person => ((String) (person.surname)).toLowerCase() === surname.toLowerCase());
            console.log("b",people1)
            if(people1.length){
                res.status(200).json(people1);
            }else
            
            res.status(500).json({ error: 'This person doesn\'t exist' });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    }
  

  });

router.get('/person/:id', (req, res, next) => {
    const personId = req.params.id;

    models.PersonSchema.findByPk(personId)
    .then((person) => {
        if (!person) {
        res.status(404).json({ error: 'Person not found' });
        } else {
        console.log(person);
        res.status(200).json(person);
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const surname= req.body.surname;
    const job = req.body.job;
    console.log(surname);

    models.PersonSchema.create({
        'name': name,
        'surname': surname,
        'job': job
    })
    .then((createdPerson) => {
        console.log('Person created:', createdPerson);
        res.status(201).json(createdPerson); // 201 Created status for successful creation
    })
    .catch((error) => {
        console.error('Error creating person:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
  })
