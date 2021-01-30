class Pipe {
  constructor() {

    
    let spacing = 125;
    let centery = random(spacing, height - spacing);
    
    this.color = "white";
    this.top = centery - spacing / 2;
    this.bottom = height - (centery + spacing / 2);

    this.x = width;
    this.w = 80;
    this.speed = 6;
  }

  hits(col) {
    return (col.y < this.top || col.y > height - this.bottom) && (col.x > this.x && this.x + this.w);
  }

  show() {
    noStroke();
    //fill(this.color);
    //rect(this.x, 0, this.w, this.top);
    //rect(this.x, height - this.bottom, this.w, this.bottom);
    image(top_pipe_img, this.x, 0, this.w, this.top);
    image(bottom_pipe_img, this.x, height - this.bottom, this.w, this.bottom);
  }

  // Update the pipe
  update() {
    this.x -= this.speed;
  }

  // Has it moved offscreen?
  offScreen(from) {
    if (from == "left"){
      return (this.x < -this.w);
    }
  }
}