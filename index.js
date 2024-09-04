const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

// app.get('/', (req, res) =>{
//   res.send('Hello World');
// });

// app.get('/nueva-ruta',(req,res)=>{
//   res.send('nuevo endpoint');

// });

routerApi(app);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
