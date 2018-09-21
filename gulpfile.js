/**
 * Copyright 2017 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const gulp = require('gulp');
const gutil = require('gulp-util');
const Karma = require('karma').Server;
const karmaDefault = require('./karma.conf');


gulp.task('test', function(done) {
   try {
      require('./readiness-tool/vendors.json');
      console.log("vendors.json was found with no problems");
    } catch (err){
      gutil.log(gutil.colors.red('vendors.json failed to load because this error: ' + err.message));
      return;
    }
   new Karma(karmaDefault, function(exitCode) {
     $$.util.log($$.util.colors.yellow(
         'Shutting down test responses server on localhost:31862'));
     if (exitCode) {
       var error = new Error(
           $$.util.colors.red('Karma test failed (error code: ' + exitCode +
               ')'));
       done(error);
     } else {
       done();
     }
   }).start();
 });
