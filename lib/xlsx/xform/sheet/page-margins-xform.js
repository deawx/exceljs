/**
 * Copyright (c) 2016 Guyon Roche
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
'use strict';
var _ = require('lodash');
var utils = require('../../../utils/utils');
var BaseXform = require('../base-xform');

var PageMarginsXform = module.exports = function() {
};

utils.inherits(PageMarginsXform, BaseXform, {

  get tag() { return 'pageMargins'; },

  render: function(xmlStream, model) {
    if (model) {
      var attributes = {
        left: model.left,
        right: model.right,
        top: model.top,
        bottom: model.bottom,
        header: model.header,
        footer: model.footer
      };
      if (_.some(attributes, function(value) { return value !== undefined})) {
        xmlStream.leafNode(this.tag, attributes);
      }
    }
  },
  
  parseOpen: function(node) {
    switch(node.name) {
      case this.tag:
        this.model = {
          left: parseFloat(node.attributes.left || 0.7),
          right: parseFloat(node.attributes.right || 0.7),
          top: parseFloat(node.attributes.top || 0.75),
          bottom: parseFloat(node.attributes.bottom || 0.75),
          header: parseFloat(node.attributes.header || 0.3),
          footer: parseFloat(node.attributes.footer || 0.3)
        };
        return true;
      default:
        return false;
    }
  },
  parseText: function() {
  },
  parseClose: function() {
    return false;
  }
});
