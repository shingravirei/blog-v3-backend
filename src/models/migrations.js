const { User, Blog } = require('./database-config');

const migrateAll = async () => {
    try {
        await User.sync({ force: true });
        await Blog.sync({ force: true });

        console.log('migrations completed');
    } catch (err) {
        console.log(err);
    }
};

const dropAll = async () => {
    try {
        await User.drop();
        console.log('User table droped');
        await Blog.drop();
        console.log('Blog table droped');
    } catch (err) {
        console.log(err);
    }
};

if (process.argv[2] === 'drop-all') {
    dropAll();
} else {
    migrateAll();
}
