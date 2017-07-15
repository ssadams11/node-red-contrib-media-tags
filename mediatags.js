/**
 * Copyright 2017 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";

    /***************************************************************/
    function GetMediaTags(config) {

        RED.nodes.createNode(this,config);
        this.filename = config.filename;
        var node = this;
        this.on('input', function(msg) {
            var jsmediatags = require('jsmediatags');
            var fn = msg.filename
            if (!fn){
                fn = this.filename
            }
            jsmediatags.read(fn, {
                onSuccess: function(tag) {
                    //console.log(tag);
                    msg.payload = tag;
                    node.send(msg)
                },
                onError: function(error) {
                    console.log(':(', error.type, error.info);
                    node.error(error)
                }
            });

        })

    }
    RED.nodes.registerType("get media tags",GetMediaTags);

};