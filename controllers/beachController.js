const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var Beach = require('../models/beach');
var Member = require('../models/member');

var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        beach_count: function(callback) {
            Beach.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        member_count: function(callback) {
            Member.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Storm47', error: err, data: results });
    });
};

// /* GET register page */
// const beach = function (req, res) {
//     res.render('beach', {title: 'Storm Glass - Beaches'});
// };

// Display list of all beaches.
// exports.beach_list = function(req, res) {
//     res.send('NOT IMPLEMENTED: beach list');
// };

exports.beach_list = function(req, res, next) {

    Beach.find()
      .sort([['beach_name', 'ascending']])
      .exec(function (err, list_beaches) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('beach_list', { title: 'Beach List', beach_list: list_beaches });
      });
  
  };

// Display detail page for a specific beach.
exports.beach_detail = function(req, res, next) {

    async.parallel({
        beach: function(callback) {
            Beach.findById(req.params.id)
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.beach==null) { // No results.
            var err = new Error('Beach not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('beach_detail', { title: 'Beach Detail', beach: results} );
    });

};

// Display beach create form on GET.
exports.beach_create_get = function(req, res, next) {       
    res.render('beach_form', { title: 'Create beach'});
};

// Handle beach create on POST.
exports.beach_create_post = [

    // Validate fields.
    body('beach_name', 'Name must not be empty.').isLength({ min: 1 }).trim(),
    body('location', 'Location must not be empty.').isLength({ min: 1 }).trim(),
    body('wind_speed', 'Wind speed must not be empty.').isLength({ min: 1 }).trim(),
    body('wind_direction', 'Wind direction must not be empty').isLength({ min: 1 }).trim(),
    body('difficulty', 'Difficulty must not be empty.').isLength({ min: 1 }).trim(),
    
    // Sanitize fields.
    sanitizeBody('beach_name').trim().escape(),
    sanitizeBody('location').trim().escape(),
    sanitizeBody('wind_speed').trim().escape(),
    sanitizeBody('wind_direction').trim().escape(),
    sanitizeBody('difficulty').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('beach_form', { title: 'Create beach', beach: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an beach object with escaped and trimmed data.
            var beach = new Beach(
                {
                    beach_name: req.body.beach_name,
                    location: req.body.location,
                    wind_speed: req.body.wind_speed,
                    wind_direction: req.body.wind_direction,
                    difficulty: req.body.difficulty
                });
            beach.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new beach record.
                res.redirect(beach.url);
            });
        }
    }
];

// Display beach delete form on GET.
exports.beach_delete_get = function(req, res, next) {

    async.parallel({
        beach: function(callback) {
            Beach.findById(req.params.id).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.beach==null) { // No results.
            res.redirect('/catalog/beaches');
        }
        // Successful, so render.
        res.render('beach_delete', { title: 'Delete beach', beach: results.beach} );
    });

};

// Handle beach delete on POST.
exports.beach_delete_post = function(req, res, next) {

    async.parallel({
        beach: function(callback) {
          Author.findById(req.body.beachid).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        Beach.findByIdAndRemove(req.body.beachid, function deleteBeach(err) {
            if (err) { return next(err); }
            // Success - go to author list
            res.redirect('/catalog/beaches')
        })
    });
};

// Handle beach delete on POST.
exports.beach_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: beach update GET');
};

// Handle beach update on POST.
exports.beach_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: beach update POST');
};
