// require('dotenv').config()
// const express=require('express')
// require('./DB/connection')
// const cors=require('cors')
// const contactRoutes=require('./Routes/contactRoutes')
// const contactServer=express()
// contactServer.use(cors())
// contactServer.use(express.json())

// contactServer.use('/api/contacts',contactRoutes)
// const PORT=5000;
// contactServer.listen(PORT,()=>{
//     console.log(`server is running in ${PORT}`); 
// })

require('dotenv').config();
const express = require('express');
require('./DB/connection');
const cors = require('cors');
const contactRoutes = require('./Routes/contactRoutes');

const contactServer = express();


contactServer.use(cors());
contactServer.use(express.json());


contactServer.use('/api/contacts', contactRoutes);

contactServer.get('/', (req, res) => {
  res.send('Backend is running... use /api/contacts');
});


const PORT = process.env.PORT || 5000;

contactServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
