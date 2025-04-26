import User from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
  const { personQuery } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${personQuery}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).json(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in searchPerson controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const searchMovie = async (req, res) => {
  const { movieQuery } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?movieQuery=${movieQuery}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).json(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in searchMovie controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const searchTv = async (req, res) => {
  const { tvQuery } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${tvQuery}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).json(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in searchTv controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    console.log("Error in getSearchHistory controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const removeItemFromSearchHistory = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: {
          id: id,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Item removed successfully from search history",
    });
  } catch (error) {
    console.log(
      "Error in removeItemFromSearchHistory controller:",
      error.message
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
