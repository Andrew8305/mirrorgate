/*
 * Copyright 2017 Banco Bilbao Vizcaya Argentaria, S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * BuildsController - Controller to handle builds
 *
 */
var BuildsController = (function(dashboardId) {

  var observable = new Event('BuildsController');
  var service = Service.get(Service.types.builds, dashboardId);
  var config;

  function getLastBuilds(response) {
    function accumulateBuildStatus(build, item) {
      build.status = build.status || item.buildStatus;
      if (build.status !== 'Failure' && item.buildStatus !== 'Success') {
        build.status = item.buildStatus;
      }
    }

    var data;
    if (response) {
      response = JSON.parse(response);

      if (response.lastBuilds) {
        // We structure the build list in a tree.
        data = {stats: response.stats, buildRoot: []};
        data.stats.lastBuildTimestamp = 0;
        var mainBranches = {};
        var developBranches = {};

        for (var index in response.lastBuilds) {
          var item = response.lastBuilds[index];
          var filters = config.filters;
          if (filters) {
            if (filters.timeSpan &&
                new Date().getTime() - item.timestamp > filters.timeSpan) {
              continue;
            }
            if (filters.status && !filters.status[item.buildStatus]) {
              continue;
            }
            if (filters.branch && !filters.branch[item.branch]) {
              continue;
            }
          }

          var key = item.projectName + '/' + item.repoName;
          var mainBuild = mainBranches[key];
          var devBuilds = developBranches[key];
          var devBuild;
          if (!mainBuild) {
            mainBranches[key] = mainBuild = new Build(key);
            data.buildRoot.push(mainBuild);
            //data.buildRoot.addChild(mainBuild);
          }
          if(item.branch !== null) {
            if (!devBuilds) {
              devBuilds = developBranches[key] = {};
            }
            key += '/develop';
            devBuild = devBuilds[key];
            if (!devBuild) {
              devBuild = devBuilds[key] = new Build(key);
              mainBuild.addChild(devBuild);
            }
            key += '/' + item.branch;
          }

          switch (item.branch) {
            case 'master':
            case null:
              mainBuild.data = item;
              mainBuild.status = item.buildStatus;
              break;
            case 'develop':
              devBuild.data = item;
              devBuild.status = item.buildStatus;
              break;
            default:
              var build = new Build(key, item.buildStatus);
              devBuild.addChild(build);
              build.data = item;
          }

          data.stats.lastBuildTimestamp =
              Math.max(item.timestamp, data.stats.lastBuildTimestamp);
        }
      }
    }

    observable.notify(data);
  }

  this.observable = observable;
  this.dispose = function() {
    this.observable.reset();
    service.removeListener(getLastBuilds);
  };
  this.init = function(_config) {
    config = _config;
    service.addListener(getLastBuilds);
  };

});
