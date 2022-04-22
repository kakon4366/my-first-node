const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//midleware
app.use(cors());
app.use(express.json());

const uri =
	"mongodb+srv://dbkakon1:mLhyTgtMyR5lbWb0@cluster0.co7pr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

async function run() {
	try {
		await client.connect();
		const usersCollection = client.db("usersBundle").collection("users");

		//get method
		app.get("/users", async (req, res) => {
			const query = {};
			const cursor = usersCollection.find(query);
			const users = await cursor.toArray();
			res.send(users);
		});

		//post method
		app.post("/user", async (req, res) => {
			const user = req.body;
			const result = await usersCollection.insertOne(user);
			res.send(result);
		});

		//delete method
		app.delete("/user/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await usersCollection.deleteOne(query);
			res.send(result);
		});

		// update method
		app.put("/user/:id", async (req, res) => {
			const id = req.params.id;
			const updateUser = req.body;
			const filter = { _id: ObjectId(id) };
			const options = { upsert: true };
			const updateDoc = {
				$set: {
					name: updateUser.name,
					user: updateUser.user,
					email: updateUser.email,
					password: updateUser.password,
				},
			};

			const result = await usersCollection.updateOne(
				filter,
				updateDoc,
				options
			);
			res.send(result);
		});
	} finally {
		// await client.close();
	}
}

run().catch(console.dir());

app.listen(port, () => {
	console.log("This server is running port: " + port);
});
