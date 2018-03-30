var express = require('express');
var router = express.Router();
var articleModel = require('../models/article.model');
var userModel = require('../models/user.model');
var commentModel = require('../models/comment.model');
var verifiTokenMiddleware = require('../auth/verifyTokenMiddleware');

router.post('/', verifiTokenMiddleware, function (request, response) {

    var commentToCreate = {
        "content": request.body.comment.content,
        "author": request.params.userid
    };
    var newComment = new commentModel(commentToCreate);

    newComment.save(function (err, commentCreated) {
        if (err)
            return response.status(500).send({
                message: 'There was a problem creating the comment',
                error: err
            });
        /* response.send({
            message: 'A new comment has been created',
            data: commentCreated
        }); */
        console.log('..........: ', commentCreated);
        articleModel.findOne({ _id: request.body.articleid },
            function (err, articleFound) {
                if (err)
                    return response.status(500).send({
                        message: 'there was a problem to find the article, error server',
                        error: err
                    });
                if (!articleFound)
                    return response.status(404).send({
                        message: 'there was a problem to find the article(invalid id)',
                        error: ''
                    });
                articleFound.comments.push(commentCreated._id);
                //console.log('prueba', articleFound.comments);
                // articleFound.save();
                articleFound.save(function (err, articleComented) {
                    if (err)
                        return response.status(500).send({
                            message: 'There was a problem creating a comment for the article',
                            error: err
                        });
                    response.send({
                        message: 'A comment has been inserted in this article',
                        data: articleComented
                    });
                    console.log('..........: ',articleComented);
                });


            });
    });
});
module.exports = router;