import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to IntelliMail!');
});

app.listen(port, () => {
  console.log(`IntelliMail is running at http://localhost:${port}`);
});