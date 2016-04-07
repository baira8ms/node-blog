var models = require('./models/blog');
var Blog = models.Blog;
var Comment = models.Comment;

function getBlogs(res) {
    Blog.find().select('title title_sub _id user content date').exec(function (err, blogs) {

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
        getBlogs(res);
    });

    // create blog and send back all blogs after creation
    app.post('/api/blogs', function (req, res) {

        // create a blog, information comes from AJAX request from Angular
        Blog.create({
            title:req.body.title,
            title_sub:req.body.subject,
            date: new Date(),
            user:"chiru",
            content: req.body.text,
            done: false
        }, function (err, blog) {
            if (err)
                res.send(err);

            // get and return all the blogs after you create another
            getBlogs(res);
        });

    });

    // delete a blog
    app.delete('/api/blogs/:blog_id', function (req, res) {
        Blog.remove({
            _id: req.params.blog_id
        }, function (err, blog) {
            if (err)
                res.send(err);

            getBlogs(res);
        });
    });

    // get a blog
    app.get('/api/blogs/:blog_id', function (req, res) {
     Blog.findById(req.params.blog_id).select('title title_sub _id user content date').exec(function (err, blog) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(blog); // return all blogs in JSON format
    });
 });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

      // create blog and send back all blogs after creation
      app.put('/api/blogs', function (req, res) {

        // create a blog, information comes from AJAX request from Angular
        Blog.update({
            title:req.body.title,
            title_sub:req.body.title_sub,
            date: new Date(),
            user:"chiru",
            content: req.body.content,
            done: false
        }, function (err, blog) {
            if (err)
                res.send(err);

        //     // get and return all the blogs after you create another
        //     Blog.findById(blog.id).select('title title_sub _id user content date').exec(function (err, blog) {

        // // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        // if (err) {
        //     res.send(err);
        // }
        getBlogs(res); // return all blogs in JSON format
//    });
        });

    });
  };
