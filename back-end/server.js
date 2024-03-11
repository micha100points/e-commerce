const express = require('express');
const app = express();
const port = 3001; // hoặc bất kỳ cổng nào bạn muốn

app.get('/', (req, res) => {
    res.send('Hello from Express server!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
