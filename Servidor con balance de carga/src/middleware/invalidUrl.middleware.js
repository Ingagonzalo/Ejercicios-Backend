const invalidUrl = (req, res, next) => {
    res.render("routing-error");
};

export default invalidUrl;