var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    content: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
})
/*commentSchema.methods.getDtoComment = function (){
    var commentDTO = {
        comment: this.comment,
        author: this.author
    };
    return commentDTO;
};*/

module.exports = mongoose.model('Comment', commentSchema);