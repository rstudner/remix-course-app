import { Outlet } from '@remix-run/react';
import ExpensesHeader from '~/components/navigation/ExpensesHeader';
import expensesStyles from '~/styles/expenses.css';
import { getUserFromSession } from '~/data/auth.server';
export default function ExpensesLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}

export function loader({ request }) {
  return getUserFromSession(request);
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyles }];
}

export function headers() {
  return {
    'Cache-Control': 'max-age-3600', // 60 minutes
  };
}
