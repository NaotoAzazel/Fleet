import Post from "../Schema/Post.js";

class PostService {
  async create(post) {
    const createdPost = await Post.create(post);
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

  async getPostsByLimitAndPage(limit, page) {
    const posts = await this.getAll();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if(endIndex < posts.length) {
      results.next = {
        page: page + 1,
        limit
      };
    };

    if(startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit
      };
    };
    
    results.results = posts.slice(startIndex, endIndex);
    return results;
  }

  async update(post) {
    if(!post._id) throw new Error("Не указан ID");
    const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true });
    return updatedPost;
  }
}

export default new PostService();