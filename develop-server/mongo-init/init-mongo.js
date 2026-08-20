const appUser = process.env.MONGO_APP_USER;
const appPassword = process.env.MONGO_APP_PASSWORD;
const appDb = process.env.MONGO_INITDB_DATABASE;

db = db.getSiblingDB(appDb);

db.createUser({
  user: appUser,
  pwd: appPassword,
  roles: [
    {
      role: 'readWrite',
      db: appDb,
    },
  ],
});