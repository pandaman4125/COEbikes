const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const FTP = require("basic-ftp");
const fs = require("fs");

dotenv.config();

const pullInventory = async () => {
	const config = {
		host: "ftp.drivehq.com",
		user: process.env.FTP_USERNAME,
		password: process.env.FTP_PASSWORD
	};

	const ftpClient = new FTP.Client();
	ftpClient.ftp.verbose = true;

	try {
		await ftpClient.access(config);
		await ftpClient.cd("/drivehqshare/killianlgrant/GroupWrite/csv");

		const fileList = await ftpClient.list();
		const latestFileName = fileList[fileList.length - 1].name;

		await ftpClient.downloadTo("./data/inventory.csv", latestFileName);

	} catch (err) {
		console.log(err);
	}
};

const app = express();
const port = process.env.HTTP_PORT;

app.use(express.static(path.join(process.cwd(), "dist")));

app.get("/inventory.csv", async (req, res) => {
	// If inventory.csv does not exist, fetch a new file
	if (!fs.existsSync(path.join(process.cwd(), "data/inventory.csv"))) {
		await pullInventory();
	}

	// If inventory.csv is older than 2 hours, fetch a new file
	const stats = fs.statSync(path.join(process.cwd(), "data/inventory.csv"));
	if (Date.now() - Math.round(stats.mtimeMs) > 1000 * 60 * 60 * 2) {
		await pullInventory();
	}

	res.sendFile(path.join(process.cwd(), "data/inventory.csv"));
});

app.get("*", (req, res) => res.sendFile(path.join(process.cwd(), "dist/index.html")));

await pullInventory();
app.listen(port, () => console.log(`http://localhost:${port}!`));
