const express = require('express');
const app = express();

app.use(express.json());

app.post('/ct-extensions/hello', (req, res) => {
  const body = req.body;
  const order = body?.resource?.obj;

  console.log('====== API Extension Called ======');
  console.log('Hello World from Extension!');

  if (!order || !order.totalPrice) {
    // Just continue if data looks strange (or you can fail)
    return res.status(200).json({ action: "Update" });
  }

  const amount = order.totalPrice.centAmount; // in minor units
  const currency = order.totalPrice.currencyCode;
  const limit = 1000000; // e.g. 10,000.00 if using 2 decimal currency

  if (amount > limit) {
    console.log(`Blocking order ${order.orderNumber} – amount too high`);

    return res.status(200).json({
      action: "Failure",
      errors: [
        {
          code: "ExtensionBadRequest",
          message: `Order total exceeds allowed limit of ${(limit / 100).toFixed(2)} ${currency}`
        }
      ]
    });
  }

  console.log(`Order ${order.orderNumber} allowed`);
  return res.status(200).json({ action: "Update" });
});

// IMPORTANT: Azure provides the port in process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Extension service listening on port ${PORT}`);
});



