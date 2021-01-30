
var gen = 0;
var scores = {};
var fitnessses = {};
function nextGeneration(){
  gen++;
  console.log("Generation : "+gen.toString());
  calcFitness();
  generate();
}


function generate(){
  for (let i=0; i< totalBirds; i++){
    birds[i] = getBird();
  }
}

function getBird(){
  fitnesses = sortDict(fitnesses);
  
  bestBird = getBestBirds();
  let child = new Bird(bestBird.brain);
  child.mutate(0.1);

  return child;
}

function getBestBird(){
  calcFitness();
  if (getLength(scores) > 0){
    index = getKey(scores, getLength(scores)-1);
  }else{
    return;
  }

  return birdsLog[index];
}

function getBestBirds(){
  var fits = sortDict(fitnesses);
  r = parseInt(random(getLength(fits)-6, getLength(fits)-1));

  index = getKey(fits, r);

  return birdsLog[index];
}

function sortDict(dict){
    items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    sorted_dict={}
    $.each(items, function(k, v) {
        use_key = v[0]
        use_value = v[1]
        sorted_dict[use_key] = use_value
    })
    return(sorted_dict)
}

function getKey(dict, n){
keys = Object.keys(dict);
if (n >= keys.length || n < 0) {
console.error("N out of range !");
return;
}
key = keys[n];
return key;
}

function calcFitness(){
  let sum = 0;
  for (let bird of birdsLog){
    sum += bird.score;
  }
  for (let bird of birdsLog){
    bird.fitness = bird.score/sum;
  }
  fitnesses = {};
  for (let i=0;i<birdsLog.length;i++){
    fitnesses[i] = birdsLog[i].fitness;
  }
  scores = {};
  for (let i=0;i<birdsLog.length;i++){
    scores[i] = birdsLog[i].score;
  }

  fitnesses = sortDict(fitnesses);
  scores = sortDict(scores);
}


function getLength(dict){
  return Object.keys(dict).length;
}

function getBird2(){
  
  var index = 0;
  var r = random(1);
  while (r > 0){
    r -= birdsLog[index].fitness;
    index++;
  }
  index--;
  let bird = birdsLog[index];
  let child = new Bird(bird.brain);
  child.mutate(0.1);
  return child;
}
