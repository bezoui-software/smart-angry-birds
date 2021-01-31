var totalBirds = 500, birdsLog = [],birds=[], pipes=[], space_between_pipe = 75;
let slider;
let counter = 0
let bottom_pipe_img, top_pipe_img;
function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  slider = createSlider(1, 100, 1);
  for (let i=0; i < totalBirds; i++){
    birds.push(new Bird());
  }
}

function preload() {
  bottom_pipe_img = loadImage('graphics/bottom pipe.png');
  top_pipe_img = loadImage('graphics/top pipe.png');
}

function draw(){
  // Proccessing
  for (let n=0; n< slider.value(); n++){
    if (counter % space_between_pipe == 0){
      pipes.push(new Pipe());
    }
    counter++;
    
    for (let bird of birds){
      bird.think(pipes);
      bird.update();
    }
    for (let i=birds.length-1;i >= 0;i--){
      if (birds[i].offScreen("down")){
        birdsLog.push(birds[i]);
        birds.splice(i, 1);
      } 
    }

    
    for (let i=pipes.length-1;i >= 0;i--){
      for (let j=birds.length-1;j >= 0;j--){
        if (pipes[i].hits(birds[j])){
          birdsLog.push(birds[j]);
          birds.splice(j, 1);
        }
      }

      if (pipes[i].offScreen("left")){
        pipes.splice(i, 1);
      } 
      pipes[i].update();
    }
    if (birds.length <= 0){
      counter = 0;
      space_between_pipe = 75;
      nextGeneration();
      pipes = []; 
      return;
    }


  }
  // Drawing
  background(255);


  for (let bird of birds){
    bird.show();
  }
  for (let pipe of pipes){
    pipe.show();
  }
}

function save_model(){
  var bestBird = getBestBird();
  //if (bestBird){
    let bird = getBestBird();
    saveJSON(bird.brain, 'bird.json'); 
  //}
}

function keyPressed(){
  if (key == ' '){
    bird.up();
  }
  if (key == 'S'){
    save_model();
  }
  //console.log(key);
}

function select_model(file){
  const reader = new FileReader()
  reader.onload = load_model;
  reader.readAsText(file.files[0])
}

function load_model(event){
  console.log(event.target.result);
}

