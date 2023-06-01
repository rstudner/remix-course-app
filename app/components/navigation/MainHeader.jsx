import { Form, Link, NavLink, useLoaderData } from '@remix-run/react';

import Logo from '../util/Logo';

function MainHeader() {
  const userId = useLoaderData();

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
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
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
