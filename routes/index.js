var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '臺大軍訓室' });
});

router.get('/post/:id', function(req, res, next) {
  var id = req.params.id;
  res.render('single-post', { title: '臺大軍訓室' , post_id: id});
});



module.exports = router;
