const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("Hi my name is Kakon!!!");
});

app.get("/myuser", (req, res) => {
	res.send({ id: 1, name: "Kakon", job: "web developer" });
});

const users = [
	{ id: 1, name: "Kakon", job: "Web Developer" },
	{ id: 2, name: "Dipok", job: "Full stak Developer" },
	{ id: 3, name: "Shuvo", job: "App Developer" },
	{ id: 4, name: "Dhono", job: "Facebook Marketer" },
	{ id: 5, name: "Saurov", job: "T-shirt Designer" },
	{ id: 6, name: "Madhob", job: "Computer Oparator" },
];

//create users
app.get("/users", (req, res) => {
	res.send(users);
});

//create dynamic users
app.get("/user/:id", (req, res) => {
	console.log(req.params);
	const id = parseInt(req.params.id);
	const user = users.find((u) => u.id == id);
	res.send(user);
});

app.listen(port, () => {
	console.log(`Example app listing on port ${port}`);
});
