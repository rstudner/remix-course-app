import { prisma } from './database.server';
export async function addExpense(expenseData) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get expenses');
  }
}

export async function getExpenses() {
  try {
    return await prisma.expense.findMany({ orderBy: { date: 'desc' } });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get expense');
  }
}

export async function updateExpense(id, expenseData) {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update expense');
  }
}

export async function deleteExpense(id) {
  try {
    return await prisma.expense.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete expense');
  }
}

export async function getExpense(id) {
  try {
    return await prisma.expense.findFirst({ where: { id } });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
