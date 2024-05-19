const express = require('express');
const healthRoute = require('./routes/health-route');
const medicineRoute = require('./routes/medicine-route');
const userRoute = require('./routes/user-route');
const connectDB = require('./config/db-config');

const app = express();

connectDB();

app.use(express.json());

app.use('/', healthRoute);
app.use('/medicine', medicineRoute);
app.use('/user', userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
