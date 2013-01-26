#pragma strict

var walk_speed:float;

function Start () {
	
}

function Update () {
	var horizontal_speed:float = walk_speed;	
	
	var horizontal_movement:float = 0;
	
	if (Input.GetButton("Left")) {		
		horizontal_movement = -1;
	}
	else if (Input.GetButton("Right")) {
		horizontal_movement = 1;
	}
	else horizontal_movement = 0;
	rigidbody.velocity.x = horizontal_speed * horizontal_movement;
}