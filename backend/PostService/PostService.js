import Post from "../Schema/Post.js";
import FileService from "./FileService.js";

class PostService {
  async create(post, image) {
    const fileName = FileService.saveFile(image);
    const createdPost = await Post.create({...post, image: fileName });
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

    return posts.slice(startIndex, endIndex);;
  }

  async update(post) {
    if(!post._id) throw new Error("Не указан ID");
    const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true });
    return updatedPost;
  }
}

export default new PostService();