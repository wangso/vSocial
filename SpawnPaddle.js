(function(){
var paddleList = [];

var TRIGGER_CONTROLS = [
Controller.Standard.LT,
Controller.Standard.RT,
];

var hand;
var _this;

function paddleSpawner(){
}

PaddleSpawner.prototype = {
	preload: function(entityID){
		_this = this;
		_this.entityID = entityID;
		this.entityID = entityID;
	},
	startEquip: function(entityID, args){
		print("Equipping");
		hand = args[0] == "left" ? 0:1;
	},
	continueEquip: function(entityID, args){
		if(Controller.getValue(TRIGGER_CONTROLS[hand]) > .95)
		{
			spawnAPaddle();
		}
	}
}

var spawnAPaddle = function(){
var paddlePosition = frontPosition();
var id = Entities.addEntity({
            clientOnly: 0,
            collisionSoundURL: "http://mpassets.highfidelity.com/a250c5bc-1ee1-4c34-a1d0-7a6acbcaa989-v1/paddle_drop_converted.wav",
            created: "2017-04-17T16:21:25Z",
            dimensions: {
                x: 0.028699999675154686,
                y: 0.37590000033378601,
                z: 0.24050000309944153
            },
            gravity: {
                x: 0,
                y: -5,
                z: 0
            },
            id: "{94a40243-aa11-409d-8ede-ce1b511050d0}",
            lastEdited: 1496420801680065,
            lastEditedBy: "{aea85f3c-44fe-4d00-9334-c7138d11a45a}",
            modelURL: "http://mpassets.highfidelity.com/a250c5bc-1ee1-4c34-a1d0-7a6acbcaa989-v1/paddleRed.fbx",
            name: "red_paddle",
            owningAvatarID: "{00000000-0000-0000-0000-000000000000}",
            queryAACube: {
                scale: 0.44717419147491455,
                x: -0.22358709573745728,
                y: -0.22358709573745728,
                z: -0.22358709573745728
            },
            restitution: 0.75,
            rotation: {
                w: 3.6422716220840812e-05,
                x: 0.55557841062545776,
                y: 0.83144032955169678,
                z: -1.9468663595034741e-05
            },
            script: "http://mpassets.highfidelity.com/a250c5bc-1ee1-4c34-a1d0-7a6acbcaa989-v1/itemSpawner.js",
            shapeType: "simple-compound",
            type: "Model",
            "userData": "{\n  \"grabbableKey\: {\n    \"wantsTrigger\: true,\n    \"grabbable\: false,\n    \"cloneLifetime\: 300,\n    \"cloneLimit\: 0,\n    \"cloneDynamic\: false,\n    \"cloneable\: true\n  },\n  \"originalPosition\: {\n    \"x\: 39.68617248535156,\n    \"y\: -200.48626708984375,\n    \"z\: 31.1165771484375\n  },\n  \"originalRotation\: {\n    \"x\: 0.06160598620772362,\n    \"y\: -0.7044286727905273,\n    \"z\: 0.06160786375403404,\n    \"w\: 0.7044072151184082\n  },\n  \"wearable\: {\n    \"joints\: {\n      \"RightHand\: [\n        {\n          \"x\: 0.001,\n          \"y\: 0.139,\n          \"z\: 0.05\n        },\n        {\n          \"x\: -0.73,\n          \"y\: -0.043,\n          \"z\: -0.108,\n          \"w\: -0.666\n        }\n      ],\n      \"LeftHand\: [\n        {\n          \"x\: 0.007,\n          \"y\: 0.151,\n          \"z\: 0.061\n        },\n        {\n          \"x\: -0.417,\n          \"y\: 0.631,\n          \"z\: -0.389,\n          \"w\: -0.525\n        }\n      ]\n    }\n  }\n}"
});
	print("Made a paddle!" , id);
	paddleList.push(id);
}

var frontPosition = function(){
	var position = Entities.getEntityProperties(_this.entityID).position;
	var rotation = Entities.getEntityProperties(_this.entityID).rotation;

	var front = Quat.getFront(rotation);
	var offset = Vec3.multiply(front, 0.25);
	
	return Vec3.sum(position, offset);
}

var deleteAllPaddles = function(){
	while(paddleList.length > 0)
		{
			Entities.deleteEntity(paddleList.pop());
		}
}

Entities.deletingEntity.connect(deleteAllPaddles);

return new PaddleSpawner();
});