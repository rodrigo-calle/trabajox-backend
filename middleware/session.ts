import session from "express-session";
export const userSession = () => {
  const oneDay = 1000 * 60 * 60 * 24;
  const expressSession = session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: oneDay,
      //   secure: false,
    },
  });
  return expressSession;
};
