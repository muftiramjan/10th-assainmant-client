const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//Must remove "/" from your production URL
app.use(cors({
    origin: [
      // "http://localhost:5173",
      "https://tenassaimant.web.app",
      "https://tenassaimant.firebaseapp.com",
    ],
    credentials: true,
  })
);


// app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DV_USER}:${process.env.DV_PASS}@cluster0.pyzkzxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)


    const sportcollection = client.db("sportDB").collection("sport");
    const sportcollection2 = client.db("sportDB").collection("sport2");
    const sportcollection3 = client.db("sportDB").collection("cuntrise");
    const sportcollection4 = client.db("sportDB").collection("cuntrises");
    const cartCollection = client.db("userDB").collection("cartCollection");
    const ditailsCollection = client.db("ditailsDB").collection("ditailsCollection");

    app.get('/cuntrises', async (req, res) => {
      const cursor = sportcollection4.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    app.get('/cuntrise', async (req, res) => {
      const cursor = sportcollection3.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    app.get('/touristspots/:countryName', async (req, res) => {
      const { countryName } = req.params;
      const spots = await sportcollection4.find({ country_Name: countryName }).toArray();
      res.send(spots);
  });
    app.get('/ditails', async (req, res) => {
      const cursor = ditailsCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.get('/singleUser/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await cartCollection.findOne(query);
      res.send(result)
    })
    app.get('/user', async (req, res) => {
      const cursor = cartCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    app.get('/sport', async (req, res) => {
      const cursor = sportcollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    
    app.get('/singleSport/:id', async (req, res) => {
      const id =req.params.id;
      const query ={_id: new ObjectId(id)};
      const sport =await sportcollection.findOne(query)
      res.send(sport)
    })
    app.get('/sport2', async (req, res) => {
      const cursor = sportcollection2.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get('/sport2/:id', async (req, res) => {
      const id =req.params.id;
      const query ={_id: new ObjectId(id)};
      const sport =await sportcollection2.findOne(query)
      res.send(sport)
    })

    app.get("/sportByEmail/:email", async (req, res) => {
      // console.log(req.params.email);
      const result = await sportcollection.find({
        UserEmail: req.params.email
      }).toArray();
      res.send(result);
    })

    app.post('/sport', async (req, res) => {
      const newSport = req.body;
      const result = await sportcollection.insertOne(newSport)
      res.send(result)
    })
    app.get('/Singelspot/:id', async (req, res) => {
      console.log(req.params.id);
      const result= await sportcollection.findOne({_id:new ObjectId (req.params.id)})
      console.log(result);
      res.send(result)
          })
app.put('/updateSpot/:id',async(req,res) =>{
  console.log(req.params.id);
  const query={_id: new ObjectId (req.params.id)}
  const data ={
    $set:{
      useimageURL:req.body.useimageURL,
      tourists_spot_name:req.body.tourists_spot_name,
      country_Name:req.body.country_Name,
      location:req.body.location,
      shortdescription:req.body.shortdescription,
      average_cost:req.body.average_cost,
      seasonality:req.body.seasonality,
      travel_time:req.body.travel_time,
      totaVisitorsPerYear:req.body.totaVisitorsPerYear,
    }
  }
  const result = await sportcollection.updateOne(query,data)
 
  res.send(result)
})
app.delete('/delete/:id',async(req,res)  => {
  const result =await sportcollection.deleteOne({_id: new ObjectId (req.params.id)})
  res.send(result)
})

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Tourism Management comming son')
})

app.listen(port, () => {
  console.log(`Tourism Management  srver is ranig ${port}`)
})