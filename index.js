const express = require('express');
const {connectToMongoDB} = require('./connection');
const urlRoute = require('./router/url');
const URL = require('./models/url');
const { Timestamp } = require('bson');

const app = express();  
const port = 1001;
 
connectToMongoDB('mongodb://localhost:27017/short-url').then(() =>{
    console.log('mongodb is connected'); 
})

app.use(express.json());
app.use('/', urlRoute);
  
// app.get('/:shortId' ,async (req, res)=>{
//    const shortId = req.params.shortId;
//    const entry = await URL.findOneAndUpdate({
//         shortId,
//    } , {$push :{
//     visitHistory: {
//     timestamp: Date.now()
// },
//    }}
// )
// res.redirect(entry.redirectURL);
// })
// db.urls.find({ shortId: "yOIqHqTmG" }).pretty()
	// BUN6MlCEK
app.get('/:shortId', async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: new Date(),
          },
        },
      },
      { new: true } // return the updated document
    );

    if (!entry) {
      return res.status(404).send('Short URL not found');
    }

    console.log('Updated visit history:', entry.visitHistory); // for debugging
    res.redirect(entry.redirectURL);
  } catch (err) {
    console.error('Error while updating visit history:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port , () =>{
    console.log(`server is running on port ${port}`);
})