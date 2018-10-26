
var Member = require('../models/member');

// /* GET register page */
// const register = function (req, res) {
//     res.render('register', {title: 'Storm Glass - Register'});
// };

// Display list of all Authors.
exports.member_list = function(req, res, next) {

    Member.find()
      .sort([['user_name', 'ascending']])
      .exec(function (err, list_members) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('member_list', { title: 'Member List', member_list: list_members });
      });
  
  };

// Display detail page for a specific member.
exports.member_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: member detail: ' + req.params.id);
};

// Display member create form on GET.
exports.member_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: member create GET');
};

// Handle member create on POST.
exports.member_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: member create POST');
};

// Display member delete form on GET.
exports.member_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: member delete GET');
};

// Handle member delete on POST.
exports.member_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: member delete POST');
};

// Display member update form on GET.
exports.member_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: member update GET');
};

// Handle member update on POST.
exports.member_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: member update POST');
};
