#pragma strict

var parado_animation:Transform;
var andando_animation:Transform;

private var curr_animation:Transform;
private var curr_animation_name:String;

function ChangeAnimation(name:String) {
	if (name != curr_animation_name) {
		//Debug.Log("Mudando animacao de " + curr_animation_name + " para " + name);
		GameObject.Destroy(curr_animation.gameObject);		
		if (name == "Parado") curr_animation = Instantiate(parado_animation, transform.position, Quaternion.identity);		
		else if (name == "Andando") curr_animation = Instantiate(andando_animation,transform.position, Quaternion.identity);
		
		curr_animation.parent = transform;
		curr_animation_name = name;
	}
}

function Start () {    
	curr_animation_name = "Parado";
	curr_animation = Instantiate(parado_animation, transform.position, Quaternion.identity);	
	curr_animation.parent = transform;
}

function Update () {	
	// Checa se precisa mudar a animacao
	
	var player_horizontal_speed:float = rigidbody.velocity.x;
	var player_vertical_speed:float = rigidbody.velocity.y;
	
	var anim_script:SimpleSpriteAnim;
	anim_script = curr_animation.gameObject.GetComponent("SimpleSpriteAnim");		

	var animation_finished:boolean = anim_script.AnimationFinished();
	
	if (Mathf.Abs(player_horizontal_speed) > 0) {
		ChangeAnimation("Andando");
	}
	
	else if (player_horizontal_speed == 0 && player_vertical_speed == 0) {
		ChangeAnimation("Parado");
	}	
	
	if (transform.localScale.x > 0 && player_horizontal_speed > 0) {
		transform.localScale.x *= -1;
	}
	else if (transform.localScale.x < 0 && player_horizontal_speed < 0) {
		transform.localScale.x *= -1;
	}
}
