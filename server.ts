import dotenv from 'dotenv';
import app from './src/app';

dotenv.config();

const appPort: number = Number(process.env.appPort) || 3000;

app.listen(appPort, (): void => {
  console.log(`Servidor escutando em http://localhost:${appPort}`);
});