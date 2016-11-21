var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo_development',function(err) {
  if(!err) {
    console.info('connect to MongoDB');
  }else {
    throw err;
  }
});

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
function validatePresenceOf(value) {
  return value && value.length;
}

var Task = new Schema({
  task: {type: String, validate: [validatePresenceOf, 'a task is required']}
});

var Task = mongoose.model("Task",Task);

// the new task
router.get('/new', function(req, res) {
  res.render('tasks/new.jade', {
      title: 'The new Task'
  });
});

// post form submit the data
router.post('/', function(req, res) {
  var task = new Task({task:req.body.task});
  task.save(function(err) {
    if(!err) {
      res.redirect('/tasks');
    }else {
      res.redirect('/tasks/new')
    }
  });
});

// 编辑记录
router.get('/:id/edit', function(req, res) {
  Task.findById(req.params.id, function(err, doc) {
      res.render('tasks/edit.jade', {
        title: 'Edit Task view',
        task: doc
      });
  });
});

// 编辑视图下，的记录的编辑工作
router.post('/:id/put', function(req, res) {
  Task.findById(req.params.id, function(err, doc) {
    doc.task = req.body.task;
    doc.save(function(err) {
      if(!err) {
        res.redirect('/tasks');
      }else {
        // error handing
        console.err(err);
      }
    });
  });
});

// 删除数据 的操作
router.post('/:id', function(req, res) {
  Task.findById(req.params.id, function(err, doc){
    if(!doc) return next(new NotFound('Document not found'));
    doc.remove(function() {
      res.redirect('/tasks');
    });
  });
});

// get the main page
router.get('/',function (req, res, next) {
  Task.find({}, function(err,docs) {
    res.render('tasks/index', {
      title: 'The index page',
      docs: docs
    });
  });
});

module.exports = router;
