// Switch to the admin database to create the user
db = db.getSiblingDB("admin");

db.createUser({
    user: "root",
    pwd: "example",
    roles: [
        { role: "readWrite", db: "mydatabase" },
        { role: "dbAdmin", db: "mydatabase" },
        { role: "userAdminAnyDatabase", db: "admin" }
    ]
});

// Switch to mydatabase and insert test data
db = db.getSiblingDB("mydatabase");

db.quizResults.insertMany([
    { name: "John Doe", score: 85 },
    { name: "Jane Smith", score: 92 }
]);