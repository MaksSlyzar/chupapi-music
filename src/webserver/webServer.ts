import express, { Express, Request, Response } from 'express';
import axios from 'axios';


const app: Express = express();
const port = 4030;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/p', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
  console.log("d")
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});