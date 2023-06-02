import { Link, Outlet, useLoaderData } from '@remix-run/react';
import ExpensesList from '~/components/expenses/ExpensesList';
import { FaPlus, FaDownload } from 'react-icons/fa';
import { getExpenses } from '~/data/expenses.server';
import { requireUserSession } from '~/data/auth.server';
import { json } from '@remix-run/node';
export default function ExpensesLayout() {
  const expenses = useLoaderData();
  const hasExpenses = expenses && expenses.length > 0;

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);
  //return expenses; //return json(expenses); -- this is a RESPONSE
  return json(expenses, {
    headers: {
      'Cache-Control': 'max-age=3',
    },
  });
}

export function meta() {
  return {
    title: 'Expenses',
    description: 'List of expenses.',
  };
}

export function headers({ loaderHeaders }) {
  return {
    'Cache-Control': loaderHeaders.get('Cache-Control'),
  };
}
