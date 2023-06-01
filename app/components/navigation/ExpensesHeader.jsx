import { Form, Link, NavLink, useLoaderData } from '@remix-run/react';

import Logo from '../util/Logo';

function ExpensesHeader() {
  const userId = useLoaderData();
  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/expenses" end>
              Manage Expenses
            </NavLink>
          </li>
          <li>
            <NavLink to="/expenses/analysis">Analyze Expenses</NavLink>
          </li>
        </ul>
      </nav>
      {userId && (
        <Form method="post" id="logout-form" action="/logout">
          <button className="cta-alt">Logout</button>
        </Form>
      )}
      {!userId && (
        <Link to="/auth?mode=login" className="cta">
          Login
        </Link>
      )}
    </header>
  );
}

export default ExpensesHeader;
