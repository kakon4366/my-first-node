const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("Hi my name is Kakon!!!");
});

app.listen(port, () => {
	console.log(`Example app listing on port ${port}`);
});
