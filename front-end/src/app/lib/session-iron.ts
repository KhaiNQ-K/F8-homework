import {
  getIronSession,
  getServerActionIronSession,
  IronSessionData,
  IronSessionOptions,
} from 'iron-session';
import { cookies } from 'next/headers';
export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
declare module 'iron-session' {
  interface IronSessionData {
    jwt?: string;
    isLoggedIn: boolean;
  }
}
const getSession = async (req: Request, res: Response) => {
  const session = getIronSession<IronSessionData>(req, res, sessionOptions);
  return session;
};

const getServerActionSession = async () => {
  const session = getServerActionIronSession<IronSessionData>(sessionOptions, await cookies());
  return session;
};

export { getServerActionSession, getSession };
