import PostService from "../PostService/PostService.js";

class PostController {
  async create(req, res) {
    try {
      const post = await PostService.create(req.body, req.files.image);
      res.json(post);
    } catch(err) {
      res.status(500).json(err.message);
    }
  }

  async getAll(req, res) {
    try {
      const { limit, page } = req.query;
      const allPosts = await PostService.getAll();
      const totalCount = Object.keys(allPosts).length;

      res.set("x-total-count", totalCount.toString());

      if(!limit || !page) {
        return res.json(allPosts);
      }

      const slicedPosts = await PostService.getPostsByLimitAndPage(parseInt(limit), parseInt(page));
      return res.json(slicedPosts);
    } catch(err) {
      res.status(500).json(err.message);
    }
  }

  async getOne(req, res) {
    try {
      const post = await PostService.getOne(req.params.id);
      return res.json(post);
    } catch(err) {
      res.status(500).json(err.message);
    }
  }

  async update(req, res) {
    try {
      const updatedPost = await PostService.update(req.body);
      return res.json(updatedPost);
    } catch(err) {
      res.status(500).json(err.message);
    }
  }
};

export default new PostController();