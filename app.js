const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
const productPage = require('./productPage.js')

const app = express();

// template engine middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`));
const PORT = process.env.PORT || 5000;

app.get('/', async (req, res, next) => {
  const parsedProductData = await productPage.getData("products.json");
  const parsedGlobalData = await productPage.getData("siteVars.json");
  const parsedUserData = await productPage.getData("testUser.json");
  res.render('home', {...parsedProductData, global: parsedGlobalData, user: parsedUserData, helpers: await productPage.helpers});
})

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});