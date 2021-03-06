"use strict";

exports.__esModule = true;
exports.default = void 0;

var _core = require("@superset-ui/core");

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var _default = {
  controlPanelSections: [{
    label: (0, _core.t)('Query'),
    expanded: true,
    controlSetRows: [['series'], ['metric'], ['adhoc_filters'], ['custom_filters'], ['row_limit', null]]
  }, {
    label: (0, _core.t)('Options'),
    expanded: true,
    controlSetRows: [[{
      name: 'size_from',
      config: {
        type: 'TextControl',
        isInt: true,
        label: (0, _core.t)('Minimum Font Size'),
        renderTrigger: true,
        default: 10,
        description: (0, _core.t)('Font size for the smallest value in the list')
      }
    }, {
      name: 'size_to',
      config: {
        type: 'TextControl',
        isInt: true,
        label: (0, _core.t)('Maximum Font Size'),
        renderTrigger: true,
        default: 70,
        description: (0, _core.t)('Font size for the biggest value in the list')
      }
    }], [{
      name: 'rotation',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('Word Rotation'),
        choices: [['random', 'random'], ['flat', 'flat'], ['square', 'square']],
        renderTrigger: true,
        default: 'square',
        clearable: false,
        description: (0, _core.t)('Rotation to apply to words in the cloud')
      }
    }], ['color_scheme', 'label_colors']]
  }],
  controlOverrides: {
    series: {
      validators: [_core.validateNonEmpty],
      clearable: false
    },
    row_limit: {
      default: 100
    }
  }
};
exports.default = _default;