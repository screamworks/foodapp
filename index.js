// Bring in our required modules
const express = require('express');
// const bodyParser = require('body-parser');
const { json } = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

// const config = require('../config');
const { secret } = require('./server/config').session;
const { dbUser, database } = require('./server/config').db;
const { domain, clientID, clientSecret } = require('./server/config').auth0;

// define port
const port = 3001;

// our database connection information
const connectionString = `postgres://${dbUser}@localhost/${database}`;

// App Declaration
const app = express();
const {stripeSecretKey} = require('./server/config').keys;
const stripe = require('stripe')(stripeSecretKey);

// required middlewares
app.use(json());
app.use(cors());
app.use(express.static(`public`));

// connecting to our DB with massive
// massive(connectionString).then(db => app.set('db', db));

massive(connectionString).then(db => app.set('db', db)).catch(function(e){

});

// setting up express sessions
// secret: config.session.secret;
app.use(session({
    secret,
    resave: true,
    saveUninitialized: true
}));

// setting up passport
app.use(passport.initialize());
app.use(passport.session());

// using passport to access auth0
// { domain: config.auth0.domain ... etc}
passport.use(new Auth0Strategy({
    domain: domain,
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL:  '/auth/callback'
   }, (accessToken, refreshToken, extraParams, profile, done) => {
     //Find user in database
    //  console.log(profile, 'strategy');
     const db = app.get('db');
     // .then means this is a promise

     db.getUserByAuthId([profile._json.sub]).then((user, err) => {
        //  console.log('INITIAL: ', user);
       if (!user[0]) { //if there isn't a user, we'll create one!
        //  console.log('CREATING USER:');
         db.createUserByAuth([profile.displayName, profile._json.sub]).then((user, err) => {
          //  console.log('USER CREATED', user[0]);
           return done(err, user[0]); // GOES TO SERIALIZE USER
         })
       } else { //when we find the user, return it
        //  console.log('FOUND USER', user[0]);
         return done(err, user[0]);
       }
     });
   }
 ));

 // put user on session
 passport.serializeUser((user, done) => {
     done(null, user);
 });

 // pull user from session for manipulation
 passport.deserializeUser((user, done) => {
    //  console.log(user);
     done(null, user);
 });


 // General Endpoints
app.get('/api/test', (req, res, next) => {
       const db = req.app.get('db');
    db.users.find({}).then(response => {
        res.json(response);
    })
    .catch(err => console.log(err));
});


app.put('/api/users', (req,res,next) => {
  const db = req.app.get('db');
  // console.log(req.session.passport.user.authid);
  // console.log(req.body)
  db.updateUser([req.session.passport.user.authid, req.body.first, req.body.last, req.body.email]).then((user)=>{
    // console.log(req.session);
    res.json(user);
  }).catch(error => console.log('ERROR:', error))
})

// auth endpoints

// initial endpoint to fire off login
app.get('/auth', passport.authenticate('auth0', {scope: 'openid profile'}));

// redirect to home and use the resolve to catch the user
app.get('/auth/callback',
    passport.authenticate('auth0', { successRedirect: '/#/menu', failureRedirect: '/login' }), (req, res) => {
        res.status(200).json(req.user);
});

// if not logged in, send error message and catch in resolve
// else send user
app.get('/auth/me', (req, res) => {
    if (!req.user) return res.status(401).json({err: 'User Not Authenticated'});
    res.status(200).json(req.user);
});


// remove user from session
app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// const mainCtrl = require('./component/login/mainCtrl.js');
app.post('/addMeal', (req, res) => {
    req.app
      .get('db')
      .upload_pic(req.body)
      .then(results => {
        res.json(results)
      })
  });


app.get('/api/menu', (req,res) => {
  const db = req.app.get('db');

  db.getMeals(req.body)
  .then(response => {

  // console.log(response)
  return res.json(response)
})
})



app.put('/api/updatemeal', (req, res) => {
  // console.log("index.js update meal body: ",req.body)
  const db = req.app.get('db');

  db.updateMeal(req.body)
  .then(response => {

  // console.log("hello pt4")
  res.send(response);
    })
})



app.get('/current/meal/', (req, res) => {
  const db = req.app.get('db');
  db.getCurrentMeal(req.query.id)
  .then(response => {
  // console.log(response)
  return res.json(response)
})
})


app.delete('/api/deletePrepMeal/:id', (req, res) => {
  const db = req.app.get('db');
// console.log('hello from indexJS')
  db.deletePrepMeal({id: req.params.id})
  .then(response => {
    // console.log('im back from hawaii')
      return res.json(response)
})
})


app.post('/api/addToCart', (req, res) => {
   const {fname, fschedule, fmealcost, fid } = req.body;
  //  console.log(req.session.passport.user.authid);
   req.app.get('db').addToCart([fname, fschedule, fmealcost, fid, req.session.passport.user.authid]).then(resp=>console.log(resp))
  //  console.log('and now the cart is in the index :D')
});


// app.get('/api/cart', (req,res) => {
//   const db = req.app.get('db');
//   db.getCart(req.body)
//   .then(response => {
//     console.log(response, "carting in the back yayay")
//     return res.json(response)
//   })
// })


app.delete('/api/deleteFromCart/:foodid', (req, res) => {
  const db = req.app.get('db');
  db.deleteFromCart({foodid: req.params.foodid})
  .then(response => {
    return res.json(response)
  })
})





app.get('/current/cart', (req, res) => {
  const db = req.app.get('db');
  // console.log(req.session.passport.user.authid, "THIS IS THE SESSION")
  const session = req.session.passport.user.authid;
  db.getCurrentCart(session)
  .then(response => {
    // console.log(response)
    return res.json(response)
  })
})







// TEST CODE STRIPE
app.post('/api/payment', (req, res) => {
  // console.log(req.body);
  const amount = Math.round(req.body.total,4);
  // console(req.body)
  const { id, email } = req.body.token;
  const cardId = req.body.token.card.id;

stripe.customers.create({
    email,
    source: id
  })
  .then(customer => stripe.charges.create({
    amount,
    description: 'Meal-Prep Solutions',
    currency: 'usd',
    customer: customer.id,
    card: cardId
  }))
  .then(charge => res.json({message: 'Successful Message'}));
});






app.get('/api/mealsOrdered', (req, res) => {
  const db = req.app.get('db');
  const session = req.session.passport.user.authid;
  db.getOrderedMeals(session)
  .then(response => {
    // console.log(response)
    return res.json(response)
  })
})




app.post('/api/cartToOrder', (req, res) => {
  const promises =  req.body.map(cur=>{
    const {mealname, quantity, foodid , authid, mealcost} = cur;
    return req.app.get('db').cartToOrder([mealname, quantity, foodid , authid, mealcost])
  })
  Promise.all(promises).then(response => res.json(response))
});


// app.delete('/api/emptyTotalCart/:id', (req, res) => {
//   const db = req.app.get('db');
//   console.log('deleting cart and moving to order now')
//   console.log(req.params)
//   db.emptyTotalCart(req.body)
//   .then(response => {
//     console.log('hey it is deleted and the cart is now empty' )
//     return res.json(response)
//   })
// })

app.delete('/api/emptyTotalCart',(req, res) => {
  console.log(req.session)
  const session = req.session.passport.user.authid;
  req.app
  .get('db')
  .emptyTotalCart(session).then(cart => res.json(cart));
})




// listen on port
app.listen(port, ()=> {
    console.log(`LISTENING ON PORT: ${port}`);
});
