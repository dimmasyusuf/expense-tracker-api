const express = require('express');
const app = express();
const PORT = 5000;

const expenseRouter = require('./routes/expense');

app.use(express.json());
app.use('/api/expenses', expenseRouter);

app.get('/api', (req, res) => {
  res.status(200).send({
    status: 200,
    message: "Expense Tracker API",
    data: {},
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})