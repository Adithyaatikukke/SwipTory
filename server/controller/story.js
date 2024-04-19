import User from "../model/user.js";

const createStory = async (req, res) => {
  try {
    const { header, description, image, category } = req.body;
    const { _id } = req.user;
    if (_id) {
      if (header && description && image && category) {
        const user = await User.findByIdAndUpdate(_id, {
          $push: { stories: req.body },
        });
        res.status(200).json(user);
      } else {
        res.status(400).json({ message: "All inputs required!" });
      }
    } else {
      res.status(500).json({ message: "Unauthorized user!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createStory };
