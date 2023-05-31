import AuthForm from '~/components/auth/AuthForm';
import authStyles from '~/styles/auth.css';
import type { ActionArgs } from '@remix-run/node';

export default function Index() {
  return <AuthForm />;
}

export async function action({ request }: ActionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  // validate user input -- exercise on my own

  if (authMode === 'login') {
    //login logic
  } else {
    //signup logic
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
