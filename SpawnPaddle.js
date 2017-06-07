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
			 position: paddlePosition,
			 "script": Script.resolvePath("paddle.js") ,
			 type: "Box",
			 name: "ScriptBox",
			 color: { red: 0, green: 0, blue: 155 }});
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