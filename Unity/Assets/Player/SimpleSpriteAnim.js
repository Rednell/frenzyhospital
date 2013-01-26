#pragma strict

class SimpleSpriteAnimation {
	var material:Material;
	var col_count:int;
	var row_count:int;
	var sprite_num:int;
	var time_between_sprites:float;
	var inverse:boolean;
	var invert_once:boolean;
	var loop:boolean;
}

var sprite_animation:SimpleSpriteAnimation;

private var cooldown:float;
private var curr_sprite:int;
private var size:Vector2;
private var inverted_once:boolean;
private var animation_finished:boolean;

// Objeto do jogo
private var obj:GameObject;

function Start () {
	obj = transform.parent.gameObject;
	curr_sprite = 0;
	cooldown = sprite_animation.time_between_sprites;
	
	size = Vector2 (1.0 / sprite_animation.col_count, 1.0 / sprite_animation.row_count);
	
	obj.renderer.material = sprite_animation.material;
	if (sprite_animation.inverse) obj.renderer.material.SetTextureOffset ("_MainTex", Vector2(0, 0));
	else obj.renderer.material.SetTextureOffset ("_MainTex", Vector2(0, 1 - size.y));
	obj.renderer.material.SetTextureScale  ("_MainTex", size);	
}

function Update () {
	cooldown -= Time.deltaTime;
	if (cooldown <= 0) {
		cooldown = sprite_animation.time_between_sprites;		
		if (curr_sprite >= sprite_animation.sprite_num) {						
			if (sprite_animation.loop) curr_sprite = 0;
			else if (sprite_animation.invert_once && !inverted_once) {
				curr_sprite = 0;
				inverted_once = true;
				sprite_animation.inverse = !sprite_animation.inverse;
			}
			else {
				curr_sprite = sprite_animation.sprite_num - 1;
				animation_finished = true;
			}
		}
		
	    // split into horizontal and vertical index
	    
	    var col_index:int = 0;
	    var row_index:int = 0;
	    
	    if (sprite_animation.inverse) {
	    	col_index = (sprite_animation.sprite_num - curr_sprite - 1) % sprite_animation.col_count;
		    row_index = (sprite_animation.sprite_num - curr_sprite - 1) / sprite_animation.col_count;
	    }
	    else {
		    col_index = curr_sprite % sprite_animation.col_count;
		    row_index = curr_sprite / sprite_animation.col_count;
	    }
	    
	    //Debug.Log("Col Index = " + col_index);
	    //Debug.Log("Row Index = " + row_index);
	    
	    var col_offset:float = size.x * col_index;
	    var row_offset:float = size.y * row_index;
    	
    	var offset:Vector2 = Vector2(col_offset, 1 - row_offset - size.y);
    	//Debug.Log("Offset = " + offset);
    	//Debug.Log("Size = " + size);
    	//Debug.Log("Curr_sprite = " + curr_sprite);
    	
    	obj.renderer.material.SetTextureOffset ("_MainTex", offset);
    	obj.renderer.material.SetTextureScale  ("_MainTex", size);
    	curr_sprite++;
	}
}

function AnimationFinished() : boolean {
	return animation_finished;
}
