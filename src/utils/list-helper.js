const totalLikes = blogs => {
    if (blogs.length === 0) {
        return 0;
    }

    let likesCount = 0;
    blogs.forEach(blog => {
        likesCount += blog.likes;
    });

    return likesCount;
};

const favoriteBlog = blogs => {
    if (blogs.length === 0) {
        return {};
    }

    let favoriteBlog = { likes: 0 };
    blogs.forEach(blog => {
        if (blog.likes > favoriteBlog.likes) {
            favoriteBlog = blog;
        }
    });

    return favoriteBlog;
};

module.exports = { totalLikes, favoriteBlog };
