import "dotenv/config"
import app from "./app"

const PORT = Number(process.env.PORT) || 8000;

app.listen(PORT, () => {
    console.log(`Server connected successfully on port: ${PORT}`);
});