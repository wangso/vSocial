//
// itemSpawner.js 
//
// Created by Clement Brisset on 11/16/2016. 
// Copyright 2015 High Fidelity, Inc. //
// This script spawns items for the ping pong table 
// modified by Adam Starr on 06/08/2017 to make the spawned paddles wearable
//
// Distributed under the Apache License, Version 2.0. 
// See the accompanying file LICENSE or http:
// www.apache.org/licenses/LICENSE-2.0.html 
//
 (function () 
 	{
 	 var ITEM_LIFETIME = 2300;
  // 30 min. 
  var itemID;
  this.preload = function(entityID) 
  {
   itemID = entityID;
  
  }
   this.spawnItem = function () 
  {

  	var leftHandPosition = {
    "x": 0,//-0.0881,
    "y": 0.0559,
    "z": 0.259
	};
	var leftHandRotation = Quat.fromPitchYawRollDegrees(90, -90, 0);
	var rightHandPosition = Vec3.multiplyVbyV(leftHandPosition, { x: -1, y: 0, z: 0 });
	var rightHandRotation = Quat.fromPitchYawRollDegrees(90, 90, 0);

   var properties = Entities.getEntityProperties(itemID, [ "type", "name", "modelURL", "shapeType", "parentID", "position", "rotation", "dimensions", "gravity", "restitution", "collisionSoundURL", ]);
  properties["userData"]=JSON.stringify({
    "hifiHomeKey":{
      "reset": true
    },
    "grabbableKey":{
      "grabbable": true
    },
	    "wearable": {
	        "joints": {
	            "LeftHand": [
	                leftHandPosition,
	                leftHandRotation
	            ],
	            "RightHand": [
	                rightHandPosition,
	                rightHandRotation
	            ]
  }}});
  var parent = Entities.getEntityProperties(properties.parentID, ["position", "rotation"]);
  var pos = 
  {
   x: 0.0, y: 0.50, z: properties.name.indexOf("blue") !== -1 ? 1.40 : -1.40, 
}
;
  pos = Vec3.sum(parent.position, Vec3.multiplyQbyV(parent.rotation, pos));
  print("Spawning a new " + properties.name);
  Entities.addEntity(
  	{
  	 type: properties.type, name: "Spawned " + properties.name, modelURL: properties.modelURL, shapeType: properties.shapeType, position: pos, rotation: properties.rotation, dimensions: properties.dimensions, velocity: 
  {
   x: 0, y: 0.1, z: 0 
}
, gravity: properties.gravity, restitution: properties.restitution, lifetime: ITEM_LIFETIME, collisionsWillMove: 1, dynamic: 1, density: 100, collisionSoundURL: properties.collisionSoundURL, userData: properties.userData 
}
)};
  

   this.startNearTrigger = function () 
  {
   this.spawnItem();
  
  }
   this.startFarTrigger = function () 
  {
   this.spawnItem();
  
  }
}
);
