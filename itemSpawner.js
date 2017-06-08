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
   var properties = Entities.getEntityProperties(itemID, [ "type", "name", "modelURL", "shapeType", "parentID", "position", "rotation", "dimensions", "gravity", "restitution", "collisionSoundURL", ]);
  properties["userData"]={"wearable":{
    "joints": {
      "RightHand": [
        {
          "x": 0.001,
          "y": 0.139,
          "z": 0.05
        },
        {
          "x": -0.73,
          "y": -0.043,
          "z": -0.108,
          "w": -0.666
        }
      ],
      "LeftHand": [
        {
          "x": 0.007,
          "y": 0.151,
          "z": 0.061
        },
        {
          "x": -0.417,
          "y": 0.631,
          "z": -0.389,
          "w": -0.525
        }
      ]
    }}};
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
, gravity: properties.gravity, restitution: properties.restitution, lifetime: ITEM_LIFETIME, collisionsWillMove: 1, dynamic: 1, density: 100, collisionSoundURL: properties.collisionSoundURL, 
}
);
  
  }
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
