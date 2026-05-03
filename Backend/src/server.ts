import app from "./app";
import { envVars } from "./app/config/env";
import { seedAdmin } from "./app/utils/seed";

const port = envVars.PORT;

const bootstrap = async () => {
    try {
        await seedAdmin();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server', error);
    }
}

bootstrap();