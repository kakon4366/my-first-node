const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
let cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
	"mongodb+srv://dbkakon1:mLhyTgtMyR5lbWb0@cluster0.co7pr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
// client.connect((err) => {
// 	const collection = client.db("test").collection("devices");
// 	console.log("Mongodb connect");
// 	// perform actions on the collection object
// 	client.close();
// });
async function run() {
	try {
		await client.connect();
		const usersCollection = client.db("foodExpress").collection("users");
		const user = { name: "Barman", email: "barman@gmail.com" };
		const result = await usersCollection.insertOne(user);
		console.log(`User insert with id ${result.insertedId}`);
	} finally {
		// await client.close();
	}
}

run().catch(console.dir());

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
	if (req.query.name) {
		const search = req.query.name.toLowerCase();
		const matched = users.filter((user) =>
			user.name.toLowerCase().includes(search)
		);
		res.send(matched);
	} else {
		res.send(users);
	}
});

//create dynamic users
app.get("/user/:id", (req, res) => {
	console.log(req.params);
	const id = parseInt(req.params.id);
	const user = users.find((u) => u.id == id);
	res.send(user);
});

//post method
app.post("/user", (req, res) => {
	console.log(req.body);
	const user = req.body;
	user.id = users.length + 1;
	users.push(user);
	res.send(user);
});

app.listen(port, () => {
	console.log(`Example app listing on port ${port}`);
});
