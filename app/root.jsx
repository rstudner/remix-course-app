import {
  isRouteErrorResponse,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  useRouteError,
} from '@remix-run/react';

import sharedStyles from '~/styles/shared.css';
import { FaDove } from 'react-icons/fa';
import Error from '~/components/util/Error';

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

function Document({ title, children }) {
  const matches = useMatches();
  const disableJSPages = matches.some((match) => match.handle?.disableJS);
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disableJSPages && <Scripts />}
        <LiveReload />
      </body>
    </html>
  );
}
export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    console.log('is route error response');
    return (
      <Document title={error.statusText}>
        <main>
          <Error title={error.statusText}>
            <p>
              {error.data?.message ||
                'Something went wrong. Please try again later'}
            </p>
            <p>
              Back to <Link to="/">Safety</Link>
            </p>
          </Error>
        </main>
      </Document>
    );
  }

  console.log('is not route error response');

  return (
    <Document title="An error occurred">
      <main>
        <Error title="An error occurred">
          <p>
            {error.message || 'Something went wrong. Please try again later'}
          </p>
          <p>
            Back to <Link to="/">Safety</Link>
          </p>
        </Error>
      </main>
    </Document>
  );
}

export const links = () => [{ rel: 'stylesheet', href: sharedStyles }];
