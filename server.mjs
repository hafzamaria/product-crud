import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import fs from 'fs';
import multer from 'multer';
import { stringToHash } from "bcrypt-inzi";
import admin from "firebase-admin"
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', "*"],
    // credentials: true
}));


const port = process.env.PORT || 5000;
const SECRET = process.env.SECRET || "topsecret";


////////////////////============product========================
const productSchema = new mongoose.Schema({

    name: { type: String },
    Price: { type: Number, required: true },
    description: { type: String, required: true },
    profilePicture: { type: String, required: true },
    code:{
        type:Number
    },

    createdOn: { type: Date, default: Date.now },
});
const productModel = mongoose.model('Products', productSchema);




////////////============cartSchema==============

const cartSchema = new mongoose.Schema({

    name: { type: String },
    // price: { type: Number, required: true },
    description: { type: String, required: true },
  
    code:{type:Number},

    createdOn: { type: Date, default: Date.now },
});
const cartModel = mongoose.model('Carts', cartSchema);
////////==============================================
const singleSchema = new mongoose.Schema({

    name: { type: String },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  
    code:{type:Number},

    createdOn: { type: Date, default: Date.now },
});
const singleModel = mongoose.model('page',singleSchema);
// https://firebase.google.com/docs/storage/admin/start

var serviceAccount ={
    "type": "service_account",
    "project_id": "myshop-358a0",
    "private_key_id": "b707c4a9ae0b50e532a22d2c8eb1dea8af1aa39c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCiNuBlF861UYvo\nOkjHK9HwVwrdPzTX28d/xq5L3orA82CbrIlrwgARL+GoFim0Wc+86LhnvMWJ2v5J\nylsGDDUCwD4swm/5yN+KJ0/7rWyKv02bOeLgU2BwWmFW/3KocOjtjB3FjRfuAZ6G\nUK+b+vqV5Y7KQ6g58PfDxmIQs3e5y/848KQLJR/BcaDE9MFxr3kjv7YmOtBofprz\nmV8zsuvOklXfxV/YVftlO9EJiBVtxWeBR1Cge523mfZfa0L8Lir4OKClp1ALWeSc\nrhdSuCDSSEq+Bw2dt24Gi2UWHOk29WwtL38VE34TUMai00N6cY4jDtaqFKANtW59\nKaCSI7W/AgMBAAECggEAS4fY0UmWFshLKE0nQRIu1UV6Sg2Zud7clCr7UlljazeH\npsTeUd4JsPcGEAGN1quw9mm4H5l+s1NUbyB5ZKX/cvH3oVjB0eFN8OKgM/SK40nz\nRVFdSg2YjIgQ5fTYuwSj+KPy4t7xIwH/AdSFCFCDKJO0eoqpRJ1miHKRi+w81bYg\nqOJ/3YKMfyseCfQejv3wUrUcx5eORdVISp2GZtcRxxYjV7NvSBbaCBnJGyyVf40G\n9dkan6YiZWhheyZ+QsX1EvPmcLdzYPSqr57JXpzUUvxrUcSq2B+n1i4RLQeP3cuu\nSBgfRPRGPhWuL96d/wGuJN50W5BrRthlco1ZXPXE+QKBgQDPltkljLCEpwX1Fw9j\nLmd6KLg06/Zxsl38xYIONfyZcHw/FRRx/gTef6HNstJZET2hrkvpxeCol58Z0ec+\ncw4a+Y5DEVh23P8yHAf2gB62UlfnMamDL161x18Fn8W10EftXQ6BJCvEGjlkx+Jz\nA2rtb0FotMG8e2jVt87GfD7M2QKBgQDICyGgSzxvogJ+ZelKQPHjB+Li2cwNsaFe\nqYfvz9twTZGWNCp7+UNu7TqZ5k9h1Sqi0B3ZFUO0mnfPl1xREWFmEHexDPmEW96Q\nytsMGAWzKxsIXnKEVorR+k6vk/+iqezLlqWje+wB6mTmch+sVxDaVvzqIW11dQPs\nTFe6Rn3YVwKBgH/l1t/1sIPqTBdXH9nhq0tubx/cCbi/Rn0ISzrqNDltPn+3QyOA\neAuF43DSrhrGLozA0HC1w9bbo+DKnIizZotkGixkMXb6bhi3gIh1I3b9gL8mr+Pt\neZLRxU+3wp5kNwydeuRCHtzxs07OgEyQXH7xPwF97Kdt+YdDehh8UEzxAoGBALeu\nAOI+MvANwlxtFxinKXNc+mdxtHuebp2M7NS19rfXgaZ5n8jVx6VDDlvhrWIXaV61\n2bJKZDCg5QIn6QxG+TfORxi64SE3edVZbmhcZl9tZRT6JAx/qlfDjhyJuGCTxmnp\nmY3Ta5EWuC8g+xQznbXdybzxlKAVIdUHBEZ2E3dhAoGAD+LIQhu9b8hY0whtZGUe\nPcYN6nIDzZKzSEP6nRQPVQrq71UaYz0JLSxqxsRNAP1i8CLgPPB493xM2j72aRML\nUaWV4lpvd6urjUOw88b9RjeiwHqp0mUgEZo21EEd9bo0MbYohqvEnkALafKooL9Z\nWs8u0DzL9Yac2R+5xlWkCrE=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-dp299@myshop-358a0.iam.gserviceaccount.com",
    "client_id": "105650186686930602964",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dp299%40myshop-358a0.iam.gserviceaccount.com"
  };
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://myshop-358a0.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://myshop-358a0.appspot.com");


//==============================================
//==============================================

const storageConfig = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {

        console.log("mul-file: ", file);
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
})
var upload = multer({ storage: storageConfig })


app.post("/product",  upload.any(), (req, res) => {

    let body = req.body;

    console.log("body: ", body);
    // console.log("body: ", body.name);
    // console.log("body: ", body.email);
    // console.log("body: ", body.password);

    console.log("file: ", req.files[0]);

    // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload-examples
    bucket.upload(
        req.files[0].path,
        {
            destination: `profilePhotos/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
        },
        function (err, file, apiResponse) {
            if (!err) {
                // console.log("api resp: ", apiResponse);

                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 

                        // delete file from folder before sending response back to client (optional but recommended)
                        // optional because it is gonna delete automatically sooner or later
                        // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder
                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                        } catch (err) {
                            console.error(err)
                        }  
                    }
                    console.log("product received: ", req.body);
               

    let newProduct = new productModel({
        name:req. body.name,
        description: req.body.description,
        Price: req.body.price,
        code:req. body.code,
        profilePicture: urlData[0]
    })
    try {
        let response =  newProduct.save()
        console.log("product added: ", response);

        res.send({
            message: "product added",
            data: response
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to add product"
        });
    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });

});


app.get("/products", async (req, res) => {
    try {
        let products = await productModel.find({}).exec();
        console.log("all product : ", products);

        res.send({
            message: "all products",
            data: products
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to get product"
        });
    }
})

app.get("/product/:id", async (req, res) => {
    try {
        let product = await productModel
            .findOne({ _id: req.params.id })
            .exec();
        console.log("product : ", product);

        res.send({
            message: "product",
            data: product
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to get product"
        });
    }
})

app.put("/product/:id", async (req, res) => {

    console.log("data to be edited: ", req.body);

    let update = {}
    if (req.body.name) update.name = req.body.name
    if (req.body.description) update.description = req.body.description
    if (req.body.price) update.price = req.body.price
    if (req.body.code) update.code = req.body.code

    try {
        let updated = await productModel
            .findOneAndUpdate({ _id: req.params.id }, update, { new: true })
            .exec();

        console.log("updated product: ", updated);

        res.send({
            message: "product updated successfully",
            data: updated
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to update product"
        });
    }
})
app.delete("/product/:id", async (req, res) => {

    console.log("product received: ", req.body);

    try {
        let deleted = await productModel.deleteOne({ _id: req.params.id })
        console.log("product deleted: ", deleted);

        res.send({
            message: "product deleted",
            data: deleted
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to delete product"
        });
    }
})


///////////////////shop////////////////////
app.post("/cart", async (req, res) => {

    console.log("cart received: ", req.body);
   

    let newCart = new cartModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        code: req.body.code,
    })
    try {
        let Cart = await newCart.save()
        console.log("product added in cart: ", Cart);

        res.send({
            message: "product added in cart",
            data: Cart
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "failed to add product in cart"
        });
    }
})
app.get("/page/:id", async (req, res) => {
    try {
        let page = await cartModel.findOne({_id: req.params.id }).exec();
        console.log(" product page : ", page);

        res.send({
            message: " product page",
            data: page
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "failed to get  in cart"
        });
    }
})
 

app.post("/page/:id", async (req, res) => {
    try {
        let page = await cartModel.findOne({_id: req.params.id }).exec();
        console.log("product page : ", page);

        res.send({
            message: " product page",
            data: page
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "failed to get  in page"
        });
    }
})

app.get("/carts", async (req, res) => {
    try {
        let carts = await cartModel.find({}).exec();
        console.log("all product : ", carts);

        res.send({
            message: "all products",
            data: carts
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "failed to get  in cart"
        });
    }
})
app.delete("/cart/:id", async (req, res) => {

    console.log("product deleted: ", req.body);

    try {
        let deleted = await productModel.deleteOne({ _id: req.params.id })
        console.log("product deleted: ", deleted);

        res.send({
            message: "product deleted from cart",
            data: deleted
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "failed to delete product"
        });
    }
})
//////////////////////////////////////////////////////



app.use((req, res) => {
    res.status(404).send("404 not found");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
////////////////mongodb connected disconnected events///////////////////////////////////////////////
let dbURI = 'mongodb+srv://abcd:abcd@cluster0.0nsp7aq.mongodb.net/socialmrdiaBase?retryWrites=true&w=majority';
   mongoose.connect(dbURI);

mongoose.connection.on('connected', function () { //connected
    console.log("mongoose connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});


process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});

//////////////////////////////////////