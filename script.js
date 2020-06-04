let slvr = {
  ex1: "",
  ex2: "",
  rng: {
    min: 0,
    max: 0
  },
  int: 0,
  intL: 0
}

var a;
window.onload = function() {
  get("exp").children[3].addEventListener("click", () => {
    slvr.ex1 = get("exp1").value;
    get("exp1r").value = slvr.ex1;
    slvr.ex2 = get("exp2").value;
    get("exp2r").value = slvr.ex2;
    get("exp").style.opacity = 0;
    a = setInterval("hide('exp', 'opt', false)", 500);
  });
  get("opt").children[5].addEventListener("click", () => {
    slvr.rng.min = parseInt(get("rng-min").value);
    slvr.rng.max = parseInt(get("rng-max").value);
    slvr.int = parseFloat(get("int").value);
    let s = slvr.int.toString().split(".")
    slvr.intL = s[s.length - 1].length;
    get("opt").style.opacity = 0;
    a = setInterval("hide('opt', 'slvr', true)", 500);
  });
}
function hide(out, inn, strt) {
  get(out).style.display = "none";
  get(inn).style.opacity = 1;
  clearInterval(a);
  if(strt) {
    brute();
  }
}
function get(x) {
  return document.getElementById(x);
}
function brute() {
  let min = Math.abs(slvr.rng.min).toString().length;
  let max = Math.abs(slvr.rng.max).toString().length;
  let strt = ((min > max) ? min : max) - 1;
  let zeros = (Math.pow(10, strt) / slvr.int).toString().split("0").length - 1;
  let int = Math.pow(10, strt);
  let intL = int.toString().split(".")[int.toString().split(".").length - 1].length;

  let mi = slvr.rng.min;
  let ma = slvr.rng.max;
  let count = 0;
  let startTime = new Date().getTime();
  for(let x=0;x<=zeros;x++) {
    let nmi = mi,
        nma = ma;
    let a = [];
    let done = false;
    for(let y=mi;y <= ma && y >= mi; y+=int) {
      count++;
      let num = Math.round(y * Math.pow(10, intL)) / Math.pow(10, intL);
      let l = math.evaluate(slvr.ex1, {x: num});
      let r = math.evaluate(slvr.ex2, {x: num});
      let dif = Math.abs(l - r);
      if(l === r) {
        done = true;
        log("Solution: " + num);
        break;
      }
      if(dif >= a[a.length - 1]) {
        nmi = Math.round((num - (int * 2)) * Math.pow(10, intL)) / Math.pow(10, intL);
        nma = Math.round((num + int) * Math.pow(10, intL)) / Math.pow(10, intL);
        break;
      }
      a.push(Math.abs(l - r));
    }
    mi = nmi;
    ma = nma;
    int = int / 10;
    intL = int.toString().split(".")[int.toString().split(".").length - 1].length;
    if(done) {
      get("what").innerHTML = "Finished";
      break;
    }
    console.log(mi, ma, int, intL, a);
  }
  log("Total Attempts: " + count + " in " + (new Date().getTime() - startTime) + "ms");
}


function bruteX() {
  let arr = [];
  for(let x = slvr.rng.min; x <= slvr.rng.max && x >= slvr.rng.min; x += slvr.int) {
    let num = Math.round(x * Math.pow(10, slvr.intL)) / Math.pow(10, slvr.intL);
    let l = math.evaluate(slvr.ex1, {x: num});
    let r = math.evaluate(slvr.ex2, {x: num});
    if(l === r) {
      log(num);
      break;
    }else if(Math.abs(l - r) > arr[arr.length - 1]) {
      log(num + " dif is greater than solution");
      x = slvr.rng.max + 1;
    }
    arr.push(Math.abs(l - r));
  }
  get("what").innerHTML = "Finished";
}
function log(v) {
  let i = get("output");
  i.innerHTML = i.innerHTML + v + "\n";
}
