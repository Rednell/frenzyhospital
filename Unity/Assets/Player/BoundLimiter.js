#pragma strict

function Start () {
	
}

function Update () {
	var min_bound_x:float;
	var max_bound_x:float;
	
	min_bound_x = 0 + (renderer.bounds.size.x / 2);
	max_bound_x = Screen.width - (renderer.bounds.size.x / 2);
	
	if (transform.position.x < min_bound_x) transform.position.x = min_bound_x;
	else if (transform.position.x > max_bound_x) transform.position.x = max_bound_x;	
	Debug.Log("transform.position.x = " + transform.position.x);
	Debug.Log("renderer.bounds.size.x / 2 = " + Screen.width);
}
