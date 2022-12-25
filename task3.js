const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const formidable = require("formidable");

const filePath = path.join(__dirname, "./contacts.json");

http
  .createServer(async (req, res) => {
    if (req.url === "/") {
      res.end("Hello world!");
    }
    if (req.url === "/home") {
      res.end("Home");
    }
    if (req.url === "/contact") {
      const data = JSON.parse(await fs.readFile(filePath, "utf-8"));
      if (req.method.toLowerCase() === "post") {
        const form = formidable({ multiples: true });
        form.parse(req, async (error, fields, files) => {
          const { name, email, phone } = fields;
          const newContact = { name, email, phone, id: data.length + 1 };
          data.push(newContact);
          await fs.writeFile(filePath, JSON.stringify(data), "utf-8");
          res.end(JSON.stringify(data));
          return;
        });
      }
      if (req.method.toLowerCase() === "get") {
        res.end(await fs.readFile(filePath, "utf-8"));
      }
      if (req.method.toLowerCase() === "delete") {
        const form = formidable({ multiples: true });
        form.parse(req, async (error, fields, files) => {
          const { id } = fields;
          const newData = data.filter((item) => {
            return item.id !== id;
          });
          await fs.writeFile(filePath, JSON.stringify(newData), "utf-8");
          res.end(JSON.stringify(newData));
          return;
        });
      }
    }
    if (req.url === "/gallery") {
      res.end("Gallery");
    }
  })
  .listen(3001, () => {
    console.log("Server is running");
  });
