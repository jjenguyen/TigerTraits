db = db.getSiblingDB('mern_db'); // Use a database named "mern_db"
db.createUser({
  user: "mern_user",
  pwd: "mern_password",
  roles: [{ role: "readWrite", db: "mern_db" }]
});
db.createCollection("test_collection");