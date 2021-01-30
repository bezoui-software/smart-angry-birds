class Bird{
    constructor(brain){
      this.y = height/2;
      this.x = 64;
  
      this.h = 32;
      this.w = 32;
  
      this.weight = 1;
      this.gravity = 0.6;
      this.velocity = 0;
      this.force = 8;

      this.score = 0;
      this.fitness = 0;
      let r, g, b;
      r = random(0, 256);
      g = random(0, 256);
      b = random(0, 256);
      this.color = [r, g, b];
      if (brain){
        this.brain = brain.copy();
      }else{
        this.brain = new NeuralNetwork(5, 5, 2);
      }
    }
 
  think(pipes){

    let closest = pipes[0];
    let smallDist = this.x - closest.x;
    for (let i = 0; i < pipes.length; i++){
      let dist = (pipes[i].x + pipes[i].w) - (this.x + this.w);
      if (dist < smallDist){
        smallDist = dist;
        closest = pipes[i];
      }
    }

    let inputs = [];
    inputs[0] = this.y/height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;
    inputs[4] = this.velocity / 10;

    let output = this.brain.predict(inputs);
    if (output[0] > output[1]){
      this.up();
    }
  }

  show(){
    fill(this.color[0], this.color[1], this.color[2]);
    noStroke();
    ellipse(this.x, this.y, this.w, this.h);
  }

  up(){
    this.velocity -= this.force;
  }

  update(){
    this.score++; 
   
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.offScreen("up")){
      this.y = 0;
      this.velocity = 0;
    }
  }
 
  offScreen(from){
    if (from == "down"){
      return (this.y+this.h/2 > height);
    }else if (from == "up"){
      return (this.y < 0);    
    }
  }
  
  mutate(a){ 
    this.brain.mutate(a);
  }

  
}