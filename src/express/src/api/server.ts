import dotenv from "dotenv";
import app from "./express";

dotenv.config();
const port: number = 3000;

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

// app.listen(process.env.NODE_ENV_API_PORT, () => console.log(`Server running! ${port}`));
app.listen(port, () => {
  console.log('Express server listening on port ' + port)
})
