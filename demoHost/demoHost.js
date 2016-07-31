/* requirements */
const express = require('express');
const fs = require('fs');
const jade = require('jade');
const path = require('path');

var app = express();

var getDirectories = srcpath => {
  return fs.readdirSync(srcpath).filter(file => {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
};

var getDemoFile = srcpath => {
  return fs.readdirSync(srcpath).filter(file => {
    return !fs.statSync(path.join(srcpath, file)).isDirectory();
  });
};

var constructDirectory = () => {
  var output = {};
  getDirectories(path.resolve(__dirname, '../dist')).forEach(firstLayer => {
    output[firstLayer] = {};

    getDirectories(path.resolve(__dirname, '../dist/' + firstLayer + '/')).forEach(secondLayer => {
      output[firstLayer][secondLayer] =
        getDemoFile(path.resolve(__dirname, '../dist/' + firstLayer + '/' + secondLayer + '/'))
          .filter(item => {
            return /\.demo\.html/.test(item);
          })[0]
          .split('.')[0];
    });

  });
  return output;
};

app.get('/', (req, res) => {
  var pageData;
  pageData = {
    structure: constructDirectory()
  };
  res.send(
    jade.renderFile(path.resolve(__dirname, './templates/index.jade'), pageData)
  );
});

app.get('/component/*', (req, res) => {
  // First, we need the base path of the request without all the extra stuff
  var filePath = req.path.split('/').slice(2).join('/');
  var basePath = filePath.replace('.demo.html', '');
  // We also need to retain the name of the Component
  var componentName = req.path.split('/')[3];

  // If this is the request for the HTML file, wrap it in the host template
  if (filePath.indexOf('.demo.html') > 0) {
    fs.readFile(path.resolve(__dirname, '../dist/' + filePath), 'utf8', (err, contents) => {
      if (err) {
        res.send(err);
      }
      res.send(
        jade.renderFile(
          path.resolve(__dirname, './templates/component-host.jade'),
          {
            componentName: componentName,
            demo: contents,
            uri: basePath
          }
        )
      );
    });
  } else {
    fs.readFile(path.resolve(__dirname, '../dist/' + filePath), 'utf8', (err, contents) => {
      if (err) {
        res.send(err);
      }
      if (filePath.indexOf('.css') > 0) {
        res.header("Content-Type", "text/css");
      }
      res.send(contents);
    });
  }
});

app.get('/lib/*', (req, res) => {
  var filePath = req.path.split('/').slice(2).join('/');
  fs.readFile(path.resolve(__dirname, '../node_modules/' + filePath), 'utf8', (err, contents) => {
    if (err) {
      res.send(err);
    }
    if (filePath.indexOf('.css') > 0) {
      res.header("Content-Type", "text/css");
    }
    res.send(contents);
  });

});

// Start server
app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', () => {
  console.log("Demo server listening at", process.env.PORT || 3000, process.env.IP || '0.0.0.0');
});
