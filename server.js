const port = process.env.PORT || 3350;
const app = require('./src/app');

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});