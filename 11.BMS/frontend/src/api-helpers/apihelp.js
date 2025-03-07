import axios from "axios";
export const getAllMovies = async () => {
  const response = await axios
    .get("http://localhost:8080/movie/get")
    .catch((err) => {
      console.log(err);
    });

  if (!response) return;
  return response.data;
};

export const getMovieDetails = async (id) => {
  const res = await axios
    .get(`http://localhost:8080/movie/get/${id}`)
    .catch((err) => {
      console.log(err);
    });
  if (!res) return;
  return res.data;
};

export const newBooking = async (data) => {
  try {
    const user = localStorage.getItem("user"); // Retrieve user data with "user" key
    if (!user) {
      throw new Error("User not found in localStorage");
    }

    const parsedUser = JSON.parse(user);
    const userId = parsedUser._id;

    if (!userId) {
      throw new Error("User ID is missing");
    }

    const res = await axios.post("http://localhost:8080/book/new", {
      movieName: data.movie,
      seatNumber: data.seat,
      date: data.date,
      user: userId,
    });

    return res.data;
  } catch (err) {
    console.error(
      "Error in newBooking:",
      err.response ? err.response.data : err.message
    );
    throw err;
  }
};

export const getUserBookings = async () => {
  const user = localStorage.getItem("user"); // Retrieve user data with "user" key
  if (!user) {
    throw new Error("User not found in localStorage");
  }

  const parsedUser = JSON.parse(user);
  const userId = parsedUser._id;

  const res = await axios
    .get(`http://localhost:8080/user/book/${userId}`)
    .catch((err) => {
      console.log(err);
    });

  if (!res) return;
  return res.data;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`http://localhost:8080/book/delete/${id}`)
    .catch((err) => {
      console.log(err);
    });
  if (!res) return;
  return res.data;
};

export const AddNewMovies = async (data) => {
  const token = localStorage.getItem("Admin"); // Retrieve user data with "Admin" key
  if (!token) {
    throw new Error("User not found in localStorage");
  }

  const parsedUser = JSON.parse(token);
  const Token = parsedUser.token;

  try {
    const res = await axios.post("http://localhost:8080/movie/add", data, {
      headers: { Authorization: `Bearer ${Token}` },
    });
    return res.data;
  } catch (err) {
    // Log error for debugging
    console.error(
      "Error adding new movie:",
      err.response ? err.response.data : err.message
    );
    throw err; // Re-throw error for further handling if needed
  }
};
