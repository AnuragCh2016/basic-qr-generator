import express from 'express';
import qrcode from 'qrcode';
import path from 'path';
const app = express();
const port = process.env.PORT;

app.use(express.json());

const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'public')));


// Define an endpoint to generate the QR code
app.post('/generateQRCode', async (req, res) => {
  try {
    // Get the input from req.body
    const input = req.body.input;

    // Generate the QR code as a data URI
    const qrCodeDataUri = await qrcode.toDataURL(input);
    console.log(qrCodeDataUri);
    // Return the data URI as the response
    res.send(qrCodeDataUri);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating QR code');
  }
});

// Serve the HTML file
app.get('/', (req, res) => {
    const filePath = path.join(process.cwd(), 'public', 'index.html');
    res.sendFile(filePath);
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});