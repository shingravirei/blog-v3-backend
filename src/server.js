const app = require('./config/app');
const { PORT } = require('./config/env-vars');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
