# gulp-script-inject

> Plugin to inject variables from filenames from a directory. Used for tapestry

## Usage

First, install `gulp-script-inject` as a development dependency:

```shell
npm install --save-dev gulp-script-inject
```

Then, add it to your `gulpfile.js`:

```javascript
var scriptInject = require('gulp-script-inject'),
    prunehtml = require('gulp-prune-html');

gulp.src('./src/index.html')
    .pipe(prunehtml(['#YamlPath']))
    .pipe(scriptInject({
        json: './src/json'
    }))
    .pipe(gulp.dest('./src'))
```

## API

### scriptInject(options)

#### options.path
Type: `String|Number`

Default: `35729`

Folder path of files to be read

#### options.varname
Type: `String`

Default: `yamlPath`

Variable name


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)