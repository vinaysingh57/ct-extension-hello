const express = require('express');
const app = express();

app.use(express.json());

app.post('/ct-extensions/hello', (req, res) => {
  console.log('====== API Extension Called ======');
  console.log('Hello World from Extension!');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  

  // Minimal valid response for a CT HTTP Extension
  res.status(200).json({
    actions: []
  });
});

// IMPORTANT: Azure provides the port in process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Extension service listening on port ${PORT}`);
});



