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
          })[0];
    });

  });
  return output;
};

app.get('/',(req, res) => {
  var pageData;

  if (req.path === '/') {
    console.log('Providing Demo index');
    pageData = {
      structure: constructDirectory()
    };
    res.send(
      jade.renderFile(path.resolve(__dirname, './templates/index.jade'), pageData)
    );
  }

});

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', () => {
  console.log("Demo server listening at", process.env.PORT || 3000, process.env.IP || '0.0.0.0');
});
