Entities.addEntity({
	position: Vec3.sum(MyAvatar.position, Quat.getFront(MyAvatar.orientation)),
	"script": "http://mpassets.highfidelity.com/a250c5bc-1ee1-4c34-a1d0-7a6acbcaa989-v1/paddle_drop_converted.wav",
	type: "paddle",
	color: { red: 255, green: 255, blue: 255 },
	dimensions: { x: .5, y: .1, z: .1 },
	name: "Paddle Spawner",
	"userData": "{ \"grabbableKey\": { \"wantsTrigger\": true }, \"wearable\": { \"joints\": { \"RightHand\": [ { \"x\": 0.0813, \"y\": 0.0452, \"z\": 0.0095 }, { \"x\": -0.3946, \"y\": -0.6604, \"z\": 0.4748, \"w\": -0.4275 } ], \"LeftHand\": [ { \"x\": -0.0881, \"y\": 0.0259, \"z\": 0.0159 }, { \"x\": 0.4427, \"y\": -0.6519, \"z\": 0.4592, \"w\": 0.4099 } ] } } }"
});