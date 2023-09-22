import { UserData } from "./interfaces/user";

const User = require('./models/userModels'); // Sesuaikan dengan jalur file model Anda
const express = require('express')
const app = express()
const session = require('express-session')
const path = require('path');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = 3000

mongoose
  .connect("mongodb://127.0.0.1/auth")
  .then(() => {
    console.log("connected to database");
  })
  .catch((error: any) => {
    console.log(error);
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}))

const MiddlewareUSer = (req: any, res: any, next: any) => {
  if (req.session.user_id) {
    res.redirect('/admin')
    return
  } else {
    next()
  }
}

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
// }))



app.locals.partialsDir = path.join(__dirname, 'views/partials');


app.get('/', (req: any, res: any) => {
  res.render('dashboard')
})

app.get('/admin', (req: any, res: any) => {
  if (!req.session.user_id) {
    res.redirect('/login')
    return
  }
  res.render('admin/index')
})


// Register
app.get('/register', MiddlewareUSer, (req: any, res: any) => {
  res.render('users/register')
})

app.get('/logout', (req: any, res: any) => {
  req.session.user_id = null
  // req.session.destroy()
  res.redirect('/login')
})

app.post('/register', async (req: any, res: any) => {
  try {
    const { username, email, password }: UserData = req.body
    const user = new User({ username, email, password })
 
    const result = await user.save()
    if (result) {
      req.session.user_id = user._id;
      req.session.save();
      res.redirect('/admin')
    } else {
      res.redirect('/register')
    }

  } catch (err: any) {
    console.log(err)
  }
})

// End Register

// Login
app.get('/login', MiddlewareUSer, (req: any, res: any) => {
  res.render('users/login')
})

app.post('/login', async (req: any, res: any) => {
  try {
    const { email, password }: UserData = req.body

    const data = await User.findByCredentials(email, password)
    if (data) {
      req.session.user_id = data._id;
      req.session.save(); 
      res.redirect('/admin')
    } else {
      res.redirect('/login')
    }

  } catch (err: any) {
    console.log(err)
  }
})




// End Login




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})