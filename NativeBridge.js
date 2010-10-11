/* ***** BEGIN LICENSE BLOCK *****
# Copyright 2010 Alexandre Poirot
#
# Contributor(s):
#   Alexandre poirot <poirot.alex@gmail.com>
# 
# 
# This library is free software; you can redistribute it and/or
# modify it under the terms of the GNU Lesser General Public
# License as published by the Free Software Foundation; either 
# version 2.1 of the License, or (at your option) any later version.
# 
# This library is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# Lesser General Public License for more details.
# 
# You should have received a copy of the GNU Lesser General Public 
# License along with this library.  If not, see <http://www.gnu.org/licenses/>.
#
# ***** END LICENSE BLOCK *****/


var NativeBridge = {
  callbacksCount : 1,
  callbacks : {},
  
  // Automatically called by native layer when a result is available
  resultForCallback : function resultForCallback(callbackId, resultArray) {
    try {
    var callback = NativeBridge.callbacks[callbackId];
    if (!callback) return;
    
    callback.apply(null,resultArray);
    } catch(e) {alert(e)}
  },
  
  // Use this in javascript to request native objective-c code
  // functionName : string (I think the name is explicit :p)
  // args : array of arguments
  // callback : function with n-arguments that is going to be called when the native code returned
  call : function call(functionName, args, callback) {
    
    var hasCallback = callback && typeof callback == "function";
    var callbackId = hasCallback ? NativeBridge.callbacksCount++ : 0;
    
    if (hasCallback)
      NativeBridge.callbacks[callbackId] = callback;
    
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", "js-frame:" + functionName + ":" + callbackId+ ":" + encodeURIComponent(JSON.stringify(args)));
    document.documentElement.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null;
    
    
  }

};


