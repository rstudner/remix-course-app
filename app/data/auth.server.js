import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { prisma } from '~/data/database.server';
import { hash, compare } from 'bcryptjs';

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secret: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, //30 days
    httpOnly: true,
  },
});

async function createUserSession(userId, redirectPath = '/expenses') {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie'),
  );

  if (!session) {
    return null;
  }

  const userId = session.get('userId');
  if (!userId) {
    return null;
  }

  return userId;
}

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie'),
  );

  if (!session) {
    return null;
  }
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}
export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    const error = new Error('A user with the provided email address exists');
    error.status = 422;
    throw error; // this triggers error boundary, not catch boundary, since not an Error Response
  }
  const passwordHash = await hash(password, 12);
  const user = await prisma.user.create({
    data: { email, password: passwordHash },
  });
  return createUserSession(user.id, '/expenses');
}

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    const error = new Error(
      'Could not log you in, please check the provided credentials',
    );
    error.status = 401;
    throw error;
  }

  const passwordCorrect = await compare(password, existingUser.password);

  if (!passwordCorrect) {
    const error = new Error(
      'Could not log you in, please check the provided credentials',
    );
    error.status = 401;
    throw error;
  }

  return createUserSession(existingUser.id, '/expenses');
}
