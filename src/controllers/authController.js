import authService from "../services/authService.js";

const login = async (req, res) => {
  try {
    const data = await authService.login(req.body);

    res.cookie("userId", data._id);

    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { login };
