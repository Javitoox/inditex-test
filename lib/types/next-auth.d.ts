import type NextAuth, {
  type DefaultSession,
  type DefaultUser,
} from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    userRole?: string;
    user: {
      id: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    id?: string;
    userRole?: string;
  }
}
