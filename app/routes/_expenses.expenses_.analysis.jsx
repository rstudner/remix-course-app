//expenses/analysis
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Chart from '~/components/expenses/Chart';
import { getExpenses } from '~/data/expenses.server';
import { useLoaderData } from '@remix-run/react';
import { requireUserSession } from '~/data/auth.server';

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader({ request }) {
  await requireUserSession(request);

  return await getExpenses();
}
