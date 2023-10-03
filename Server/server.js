import { app } from "./app.js";

const port = process.env.PORT;

// here i am starting the server
app.listen(port, () => console.log(`Server is listening on this port no. ${port}`));