 const functions = require("firebase-functions");
 const express=require("express");
 const cors=require("cors");
 const stripe=require("stripe");('sk_test_51LlWwVSFGGJdMYs72qxrxwilMO5UecR72GkECA7YWYPwLMFsTfdqVVBgoop4jqkIuV3l8nD8L1784jww36OrVWkt00k6Lvq4Oo')

  // -App config
 const app=express();


 app.use(cors({origin:true}));
 app.use(express.json());

 //-API routes
 app.get('/',(request,response)=>response.status(200).send('hello world'))

 exports.api=functions.https.onRequest(app)

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
