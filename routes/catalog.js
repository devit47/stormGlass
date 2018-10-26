var express = require('express');
var router = express.Router();

// Require controller modules.
var beach_controller = require('../controllers/beachController');
var member_controller = require('../controllers/memberController');

/// Beach routes ///

// GET catalog home page.
router.get('/', beach_controller.index);

// GET request for creating a Beach. NOTE This must come before routes that display Beach (uses id).
router.get('/beach/create', beach_controller.beach_create_get);

// POST request for creating Beach.
router.post('/beach/create', beach_controller.beach_create_post);

// GET request to delete Beach.
router.get('/beach/:id/delete', beach_controller.beach_delete_get);

// POST request to delete Beach.
router.post('/beach/:id/delete', beach_controller.beach_delete_post);

// GET request to update Beach.
router.get('/beach/:id/update', beach_controller.beach_update_get);

// POST request to update Beach.
router.post('/beach/:id/update', beach_controller.beach_update_post);

// GET request for one Beach.
router.get('/beach/:id', beach_controller.beach_detail);

// GET request for list of all Beaches.
router.get('/beaches', beach_controller.beach_list);


/// Member routes ///

// GET request for creating Member. NOTE This must come before route for id (i.e. display member).
router.get('/member/create', member_controller.member_create_get);

// POST request for creating Member.
router.post('/member/create', member_controller.member_create_post);

// GET request to delete Member.
router.get('/member/:id/delete', member_controller.member_delete_get);

// POST request to delete Member.
router.post('/member/:id/delete', member_controller.member_delete_post);

// GET request to update Member.
router.get('/member/:id/update', member_controller.member_update_get);

// POST request to update Member.
router.post('/member/:id/update', member_controller.member_update_post);

// GET request for one Member.
router.get('/member/:id', member_controller.member_detail);

// GET request for list of all Members.
router.get('/members', member_controller.member_list);

module.exports = router;
