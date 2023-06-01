import { prisma } from './database.server';
export async function addExpense(expenseData, userId) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: { connect: { id: userId } },
      },
    });
  } catch (error) {
    throw new Error('Failed to get expenses');
  }
}

export async function getExpenses(userId) {
  try {
    return await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  } catch (error) {
    throw new Error('Failed to get expense');
  }
}

export async function updateExpense(userId, expenseData) {
  try {
    return await prisma.expense.update({
      where: { userId },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    throw new Error('Failed to update expense');
  }
}

export async function deleteExpense(userId) {
  try {
    return await prisma.expense.delete({
      where: { userId },
    });
  } catch (error) {
    throw new Error('Failed to delete expense');
  }
}

export async function getExpense(userId) {
  if (!userId) {
    throw new Error('Failed to get expenses.');
  }
  try {
    return await prisma.expense.findFirst({ where: { userId } });
  } catch (error) {
    throw new Error('Failed to get expenses.');
  }
}
