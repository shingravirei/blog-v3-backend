const { totalLikes, favoriteBlog } = require('../src/utils/list-helper');

describe('total likes', () => {
    test('of an empty list is 0', () => {
        const likes = totalLikes([]);

        expect(likes).toBe(0);
    });

    test('of an list with only one blog', () => {
        const blog = [{ likes: 5 }];
        const likes = totalLikes(blog);

        expect(likes).toBe(5);
    });

    test('of and list with more than one blog', () => {
        const blogs = [{ likes: 1 }, { likes: 2 }, { likes: 3 }];
        const likes = totalLikes(blogs);

        expect(likes).toBe(6);
    });
});

describe('favorite blog', () => {
    const blogs = [
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        },
        {
            title: 'Kappa',
            author: 'Keppo',
            likes: 13
        }
    ];

    test('of an list of empty blogs', () => {
        expect(favoriteBlog([])).toEqual({});
    });

    test('of an list with more than one blog', () => {
        const blog = favoriteBlog(blogs);

        expect(blog).toEqual(blogs[1]);
    });
});
