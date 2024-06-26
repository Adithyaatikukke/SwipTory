import Story from "../model/story.js";

const getAllListedStories = async (req, res) => {
  try {
    const {
      foodLimit,
      fitnessLimit,
      travelLimit,
      moviesLimit,
      educationLimit,
    } = req.query;

    const allStories = await Story.find();
    const food = allStories.filter(({ category }) => category === "Food");
    const fitness = allStories.filter(({ category }) => category === "Fitness");
    const travel = allStories.filter(({ category }) => category === "Travel");
    const movies = allStories.filter(({ category }) => category === "Movies");
    const education = allStories.filter(
      ({ category }) => category === "Education"
    );

    const foodStories = {
      category: "Food",
      stories: food
        .map(({ stories, _id, likes }) => {
          return { _id, stories, likes };
        })
        .slice(0, foodLimit || 4),
      limit: food.map(({ stories }) => stories).length,
      currentLimit: movies
        .map(({ stories }) => stories)
        .slice(0, moviesLimit || 4)?.length,
    };
    const fitnessStories = {
      category: "Fitness",
      stories: fitness
        .map(({ stories, _id, likes }) => {
          return { _id, stories, likes };
        })
        .slice(0, fitnessLimit || 4),
      limit: fitness.map(({ stories }) => stories).length,
      currentLimit: movies
        .map(({ stories }) => stories)
        .slice(0, moviesLimit || 4)?.length,
    };
    const travelStories = {
      category: "Travel",
      stories: travel
        .map(({ stories, _id, likes }) => {
          return { _id, stories, likes };
        })
        .slice(0, travelLimit || 4),
      limit: travel.map(({ stories }) => stories).length,
      currentLimit: travel
        .map(({ stories }) => stories)
        .slice(0, travelLimit || 4)?.length,
    };

    const moviesStrories = {
      category: "Movies",
      stories: movies
        .map(({ stories, _id, likes }) => {
          return { _id, stories, likes };
        })
        .slice(0, moviesLimit || 4),
      limit: movies.map(({ stories }) => stories).length,
      currentLimit: movies
        .map(({ stories }) => stories)
        .slice(0, moviesLimit || 4)?.length,
    };
    const educationStrioes = {
      category: "Education",
      stories: education
        .map(({ stories, _id, likes }) => {
          return { _id, stories, likes };
        })
        .slice(0, educationLimit || 4),
      limit: education.map(({ stories }) => stories).length,
      currentLimit: movies
        .map(({ stories }) => stories)
        .slice(0, moviesLimit || 4)?.length,
    };

    res
      .status(200)
      .json([
        foodStories,
        fitnessStories,
        travelStories,
        moviesStrories,
        educationStrioes,
      ]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const createStory = async (req, res) => {
  try {
    const { story, category } = req.body;
    const { _id } = req.user;

    if (_id) {
      if (story) {
        const newStory = await Story.create({
          owner: _id,
          stories: story,
          category,
        });
        res.status(200).json(newStory);
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

export const shareStory = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const story = await Story.findById(id);
      if (story) {
        res.status(200).json(story);
      } else {
        res.statsus(404).json({ message: "Story not found!" });
      }
    } else {
      res.status(400).json({ message: "id is required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeStory = async (req, res) => {
  try {
    const { id } = req.body;
    const { _id } = req.user;
    const alreadyLikeStory = await Story.findById(id);
    if (alreadyLikeStory.likes.find((likeId) => likeId === _id.toString())) {
      const removeLike = await Story.findByIdAndUpdate(
        id,
        {
          $pull: {
            likes: _id.toString(),
          },
        },
        { new: true }
      );
      res.status(201).json(removeLike);
    } else {
      const addLike = await Story.findByIdAndUpdate(
        id,
        {
          $push: {
            likes: _id.toString(),
          },
        },
        { new: true }
      );
      res.status(201).json(addLike);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createStory, getAllListedStories };
