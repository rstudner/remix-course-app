import AuthForm from '~/components/auth/AuthForm';
import authStyles from '~/styles/auth.css';
import type { ActionArgs } from '@remix-run/node';
import { validateCredentials } from '~/data/validation.server';
import { login, signup } from '~/data/auth.server';

// interface AuthFormData {
//   email: string;
//   password: string;
// }
export default function Index() {
  return <AuthForm />;
}

export async function action({ request }: ActionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';
  // const formData = (await request.formData()) as unknown as Iterable<
  //   [AuthFormData, FormDataEntryValue]
  // >;
  //const credentials = Object.fromEntries(formData);
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const credentials = { email, password };

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === 'login') {
      return await login(credentials);
    } else {
      return await signup(credentials);
    }
  } catch (error: any) {
    if (error.status === 422) {
      return { credentials: error.message };
    }
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
