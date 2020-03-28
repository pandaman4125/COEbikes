import path from "path";
import express from "express";
import * as dotenv from "dotenv";
import * as FTP from "basic-ftp";
import * as cron from "cron";

dotenv.default.config();
const app = express();
const port = process.env.HTTP_PORT;

app.use(express.static(path.join(process.cwd(), "dist")));
app.get("/inventory.csv", (req, res) => res.sendFile(path.join(process.cwd(), "data/inventory.csv")));
app.get("*", (req, res) => res.sendFile(path.join(process.cwd(), "dist/index.html")));
app.listen(port, () => console.log(`http://localhost:${port}!`));

const pullInventory = async () => {
    const config = {
        host: "ftp.drivehq.com",
        user: process.env.FTP_USERNAME,
        password: process.env.FTP_PASSWORD
    };

    const ftpClient = new FTP.default.Client();
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

const job = new cron.default.CronJob("0 */2 * * *", () => {
    pullInventory();
}, null, true, "America/Los_Angeles");
job.start();

console.log("started");

pullInventory();
