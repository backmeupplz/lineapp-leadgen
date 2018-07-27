const express = require('express');
const engines = require('consolidate');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const i18n = require('i18n-express');
const fs = require('fs');
const request = require('request');
const qs = require('querystring');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.set('views', path.join(__dirname, 'views'));
app.engine('pug', engines.pug);
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(i18n({
  paramLangName: 'lang',
  siteLangs: ['en', 'ru'],
  translationsPath: path.join(__dirname, 'i18n'),
}));

app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

app.use('/email', (req, res, next) => {
  const email = req.body.email;
  const value = req.body.value;
  const lang = req.body.lang;

  if (!email) {
    return res.sendStatus(403);
  }
  
  fs.appendFile(path.join(__dirname, 'emails.txt'), `${email} ${value} ${lang}\n`, (err) => {
    if (err) {
      console.log(`${email} (${value}, ${lang}) not saved`);
      request(`https://api.telegram.org/bot237463370:AAGI_aywb5T-oCyFaRHsgae5XhuEwWd257o/sendMessage?chat_id=76104711&text=${qs.escape(email)} (${value}, ${lang}) failed to become interested in LineApp`);
    };
    console.log(`${email} (${value}, ${lang}) saved`);
    request(`https://api.telegram.org/bot237463370:AAGI_aywb5T-oCyFaRHsgae5XhuEwWd257o/sendMessage?chat_id=76104711&text=${qs.escape(email)} (${value}, ${lang}) successfully became interested in LineApp`);
  });

  res.sendStatus(200);
});

app.use((req, res, next) => {
  res.render('index.pug');
});

module.exports = app;
