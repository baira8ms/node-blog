var Todo = require('./models/blog');

function getTodos(res) {
    Todo.find(function (err, blogs) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(blogs); // return all blogs in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all blogs
    app.get('/api/blogs', function (req, res) {
        // use mongoose to get all blogs in the database
        getTodos(res);
    });

    // create blog and send back all blogs after creation
    app.post('/api/blogs', function (req, res) {

        // create a blog, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, blog) {
            if (err)
                res.send(err);

            // get and return all the blogs after you create another
            getTodos(res);
        });

    });

    // delete a blog
    app.delete('/api/blogs/:blog_id', function (req, res) {
        Todo.remove({
            _id: req.params.blog_id
        }, function (err, blog) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};