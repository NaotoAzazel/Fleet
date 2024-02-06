import Post from "../Schema/Post.js";

class PostService {
  async create(post, image) {
    const imageBase64 = image.data.toString("base64");
    const createdPost = await Post.create({...post, image: imageBase64 });
    return createdPost;
  }

  async getAll() {
    const posts = await Post.find();
    return posts;
  }

  async getOne(id) {
    if(!id) throw new Error("Не указан ID");
    const post = await Post.findById(id);
    return post;
  }

  async getPostsByLimitAndPage(limit, page, posts) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return posts.slice(startIndex, endIndex);;
  }

  filterByStatus(status, posts) {
    posts = posts.filter((field) => {
      switch(status) {
        case "avaible":
          return !field.takeBy.length
        case "unavaible": 
          return field.takeBy.length
        default: 
          return field.takeBy === status;
      }
    })
  
    return posts;
  }

  filterByOption(sortOption, posts) {
    if(sortOption == "alphabet") {
      posts = posts.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      posts = posts.filter((field) => field.category === sortOption);
    }
  
    return posts;
  }

  async update(post) {
    if(!post._id) throw new Error("Не указан ID");
    const updatedData = { takeBy: post.takeBy };
    const updatedPost = await Post.findByIdAndUpdate(post._id, updatedData, { new: true });
    return updatedPost;
  }

  async getCategories() {
    const posts = await this.getAll();
    const categories = new Set();

    posts.map(({ category }) => {
      categories.add(category);
    });

    return categories;
  }

  async getColors() {
    const posts = await this.getAll();
    const colors = new Set();

    posts.map(({ color }) => {
      colors.add(color);
    });

    return colors;
  }
}

export default new PostService();