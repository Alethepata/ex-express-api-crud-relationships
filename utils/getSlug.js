module.exports = createSlug = (title, posts) => {
    const baseSlug = title.trim().replaceAll(' ', '-').toLowerCase().replace('/', '');
    const slugs = posts.map(post => post.slug);
    let counter = 1;
    let slug = baseSlug;
    while(slugs.includes(slug)){
        slug = `${baseSlug}-${counter}`;
        counter ++;
    }
    return slug;
}