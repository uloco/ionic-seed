'use strict';

/**
 * Module dependencies
 */

//import './bower_components/font-awesome/css/font-awesome.min.css';
import 'font-awesome-webpack';
import './components/assets/styles/app.ionic.css';
import './app.css';
import './components/assets/styles/app.ionic.css';

import './bower_components/ionic/release/js/ionic.bundle.js';
import './bower_components/ngCordova/dist/ng-cordova.js';

import './app.js';
import './app.route.js';
import './app.controller.js';
import './view/view.module.js';
import './view/view.controller.js';

require("html!./index.html");
