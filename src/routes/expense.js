const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_URL = 'http://localhost:6000/';

router.get('/', async (req, res) => {
  const expenses = await axios.get(API_URL + 'expenses');

  return res.status(200).send({
    status: 200,
    message: 'Successfully fetched expenses',
    data: expenses.data,
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await axios.get(API_URL + `expenses/${id}`);
    res.status(200).send({
      status: 200,
      message: 'Successfully fetched expense',
      data: expense.data,
    });
  } catch (err) {
    res.status(404).send({
      status: 404,
      message: 'Expense not found',
      data: {},
    });
  }
});

router.post('/', async (req, res) => {
  const { id, name, price, category } = req.body;

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  try {
    const updatedExpense = await axios.post(API_URL + 'expenses', {
      id,
      name,
      price,
      category,
      createdAt,
      updatedAt,
    });

    return res.status(201).send({
      status: 201,
      message: 'Successfully created expense',
      data: updatedExpense.data,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: 'Failed to create expense',
      data: {},
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;
  const updatedAt = new Date().toISOString();

  try {
    const expense = await axios.get(API_URL + `expenses/${id}`);
    const { createdAt } = expense.data;

    const updatedExpense = await axios.put(API_URL + `expenses/${id}`, {
      id,
      name,
      price,
      category,
      createdAt,
      updatedAt,
    });

    return res.status(200).send({
      status: 200,
      message: 'Successfully updated expense',
      data: updatedExpense.data,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: 'Failed to update expense',
      data: {},
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await axios.delete(API_URL + `expenses/${id}`);

    return res.status(200).send({
      status: 200,
      message: 'Successfully deleted expense',
      data: deletedExpense.data,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: 'Failed to delete expense',
      data: {},
    });
  }
});

module.exports = router;
