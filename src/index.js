require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router')

app.use(express.json());
app.use('/path', router);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serviço rodando na :  ${PORT}`);
});
