var Project = require('./models/project');

module.exports = function (app, db) {
  
  // show the home page (all projects)
  app.get('/', function (req, res) {
    Project.find().sort({ deadline: 1 }).exec(function (err, projects) {
      if (err) return console.log(err);
      res.render('index.ejs', {
        projects: projects || []
      });
    });
  });

  // show add project page
  app.get('/add-project', function (req, res) {
    res.render('add-project.ejs');
  });

  // handle add project form submission
  app.post('/add-project', function (req, res) {
    const ratingInput = parseInt(req.body.rating, 10);
    const ratingValue = isNaN(ratingInput) ? 5 : ratingInput;

    var newProject = new Project({
      clientName: req.body.clientName,
      projectName: req.body.projectName,
      deadline: req.body.deadline,
      deliverables: req.body.deliverables,
      hours: req.body.hours || 0,
      invoiceStatus: req.body.invoiceStatus,
      priority: req.body.priority,
      rating: Math.min(10, Math.max(0, ratingValue))
    });

    newProject.save(function (err, result) {
      if (err) {
        console.log(err);
        return res.send('Error saving project');
      }
      console.log('Project saved to database');
      res.redirect('/');
    });
  });

  // show edit project page
  app.get('/edit-project/:id', function (req, res) {
    Project.findById(req.params.id, function (err, project) {
      if (err) {
        console.log(err);
        return res.redirect('/');
      }
      res.render('edit-project.ejs', {
        project: project,
        projectId: req.params.id
      });
    });
  });

  // handle edit project form submission
  app.post('/edit-project/:id', function (req, res) {
    const ratingInput = parseInt(req.body.rating, 10);
    const ratingValue = isNaN(ratingInput) ? 0 : ratingInput;

    Project.findByIdAndUpdate(req.params.id, {
      clientName: req.body.clientName,
      projectName: req.body.projectName,
      deadline: req.body.deadline,
      deliverables: req.body.deliverables,
      hours: req.body.hours || 0,
      invoiceStatus: req.body.invoiceStatus,
      priority: req.body.priority,
      rating: Math.min(10, Math.max(0, ratingValue))
    }, function (err, result) {
      if (err) {
        console.log(err);
        return res.send('Error updating project');
      }
      console.log('Project updated');
      res.redirect('/');
    });
  });

  // handle rating increase/decrease
  app.put('/projects', function (req, res) {
    Project.findById(req.body.projectId, function (err, project) {
      if (err || !project) {
        return res.status(404).send('Project not found');
      }

      let rating = typeof project.rating === 'number' ? project.rating : 5;
      if (req.body.action === 'increment') {
        rating = Math.min(10, rating + 1);
      } else if (req.body.action === 'decrement') {
        rating = Math.max(0, rating - 1);
      }

      project.rating = rating;
      project.save(function (saveErr, updated) {
        if (saveErr) return res.status(500).send(saveErr);
        res.send({ rating: updated.rating });
      });
    });
  });

  // handle delete project
  app.delete('/projects', function (req, res) {
    Project.findByIdAndDelete(req.body.projectId, function (err, result) {
      if (err) {
        return res.send(500, err);
      }
      res.send('Project deleted!');
    });
  });
};

