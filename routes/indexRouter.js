const { randomUUID } = require("crypto");
const { Router } = require("express");

const indexRouter = Router();
const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date(),
        id: randomUUID()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date(),
        id: randomUUID()
    }
];

indexRouter.get("/", (req, res) =>
    res.render("index", { title: "Mini Messageboard", messages: messages }));
indexRouter.get("/posts/", (req, res) =>
    res.render("index", { title: "Mini Messageboard", messages: messages }));
indexRouter.get("/new", (req, res) =>
    res.render("form", { id: randomUUID() + "" }));
indexRouter.post("/new", (req, res) => {
    console.log(req.body)
    try {
        console.log(req.body);
        messages.push({ id: req.body.id, text: req.body.text, user: req.body.user, added: new Date() });
    }
    catch (error) {
        throw error;
    }
    res.redirect("/");
});
indexRouter.get("/posts/:user/:id", (req, res) => {
    const { id } = req.params;
    const post = messages.find(message => message.id === id);
    res.render("posts/post", { user: post.user, message: post.text, added: post.added })
});
indexRouter.get("/posts/:user", (req, res) => {
    const { user } = req.params;
    const posts = messages.filter(message => message.user === user);
    res.render("posts/user", { user: user, messages: posts })
});
module.exports = indexRouter;