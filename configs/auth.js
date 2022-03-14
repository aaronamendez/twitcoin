module.exports = {
    SALT_ROUNDS_FOR_BCRYPT: process.env.SALT_ROUNDS || 8,
    JWT_SECRET: process.env.JWT_SECRET || "developersarecool",
};
