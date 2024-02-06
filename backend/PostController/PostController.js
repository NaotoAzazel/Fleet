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
      const { limit, page, filter, status } = req.query;
      let posts = await PostService.getAll();

      if(filter) 
        posts = PostService.filterByOption(filter, posts);
      if(status) 
        posts = PostService.filterByStatus(status, posts);

      const totalCount = Object.keys(posts).length;
      res.set("x-total-count", totalCount.toString());

      if(!limit || !page) {
        return res.json(posts);
      }

      const slicedPosts = await PostService.getPostsByLimitAndPage(parseInt(limit), parseInt(page), posts);
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

  async getCategories(req, res) {
    try {
      const filteredCategories = await PostService.getCategories();
      const filteredCategoriesArray = Array.from(filteredCategories);

      return res.json(filteredCategoriesArray);
    } catch(err) {
      res.status(500).json(err.message);
    }
  }

  async getColors(req, res) {
    try {
      const filteredColors = await PostService.getColors();
      const filteredColorsArray = Array.from(filteredColors);

      return res.json(filteredColorsArray);
    } catch(err) {
      res.status(500).json(err.message);
    }
  }
};

export default new PostController();