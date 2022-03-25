const validatePostBody = (req, res, next) => {
    const { postBody } = req.body;

    if (!postBody) {
        res.status(400).json({ message: "Cannot create an empty post" });
    } else {
        req.postBody = postBody;
        next();
    }
};

module.exports = {
    validatePostBody,
};
