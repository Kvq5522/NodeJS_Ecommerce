const config = require('./src/config/config.mongodb');
const port = config.app.port || 3350;
const app = require('./src/app');

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});