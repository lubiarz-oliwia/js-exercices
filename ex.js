// Program obliczający wzajemne połozenie kół w przestrzeni
// jedno kolo - dane przechowywane sa w obiekcie (wspolrzedne i promien)
// drugie kolo - wspolrzedne generowane losowo, jak i promien

const circle1 = {
  A: 0,
  B: -10,
  r: 20
}

document.getElementById('circle1A').innerHTML = circle1.A;
document.getElementById('circle1B').innerHTML = circle1.B;
document.getElementById('circle1r').innerHTML = circle1.r;

function getRandomInt(min = -10, max = 50) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const circle2 = {
  A: getRandomInt(),
  B: getRandomInt(),
  r: Math.abs(getRandomInt())
}

document.getElementById('circle2A').innerHTML = circle2.A;
document.getElementById('circle2B').innerHTML = circle2.B;
document.getElementById('circle2r').innerHTML = circle2.r;

function defineCircleType(circle1, circle2) {
  let x = circle1.A - circle2.A;
  let y = circle1.B - circle2.B;
  let distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  let radiusSum = circle1.r + circle2.r;
  let radiusDiff = circle1.r - circle2.r;

  if (distance > radiusSum) {
    return ('okręgi rozłączne zewnętrznie');
  }
  else if (distance == radiusSum) {
    return ('okręgi styczne zewnętrznie');
  }
  else if (Math.abs(radiusDiff) < distance && distance < radiusSum) {
    return ('okręgi przecinające się');
  }
  else if (distance == Math.abs(radiusDiff)) {
    return ('okręgi styczne wewnętrznie');
  }
  else if (distance < Math.abs(radiusDiff)) {
    return ('okręgi rozłączne wewnętrznie');
  }
  else if (circle1.A == circle2.A && circle1.B == circle2.B) {
    return ('Okręgi współśrodkowe')
  }
}

document.getElementById('result').innerHTML = defineCircleType(circle1, circle2);

window.onload = function () {
  console.log('loaded');

  var c = document.getElementById('canvas');
  var ctx = c.getContext('2d');

  // Center
  ctx.translate(300, 300);

  // Add some lines
  ctx.beginPath();
  ctx.moveTo(-200, 0);
  ctx.lineTo(200, 0);
  ctx.stroke();
  ctx.moveTo(0, -200);
  ctx.lineTo(0, 200);
  ctx.stroke();

  ctx.font = "14px Arial";
  ctx.fillStyle = 'red';
  ctx.fillText("+ x", 200, 0);
  ctx.fillText("- y", 0, -200);

  ctx.fillText("- x", -200, -0);
  ctx.fillText("+ y", 0, 200);

  // From the above I notice that -x coordinates behaves
  // as expected, but the y coordinates jumps on the '
  // wrong side of the line. 

  // From 'translate' this is correct, but only the x coordinate
  // looks like it should:
  // x = 200 - 100 = 100
  // y = 200 - 100 = 100

  // In order to draw correct cartesian coordinates we could make
  // a simple function like this 

  // function drawCartesianPoint(ctx, x, y) {
  //   ctx.fillRect(x, y, 4, 4);
  // }

  // // And for text:
  // function drawCartesianText(ctx, x, y, text) {
  //   ctx.fillText(text, x, y);
  // }

  function drawCircle(center_x, center_y, radius) {
    ctx.beginPath();
    ctx.arc(center_x, -center_y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  drawCircle(circle1.A, circle1.B, circle1.r);
  ctx.fillRect(circle1.A, -(circle1.B), 3, 3);
  ctx.fillText(`${circle1.A}, ${circle1.B} Circle1`, -circle1.A, -circle1.B);

  drawCircle(circle2.A, circle2.B, circle2.r);
  ctx.fillRect(circle2.A, -(circle2.B), 3, 3);
  ctx.fillText(`${circle2.A}, ${circle2.B} Circle2`, circle2.A, -circle2.B);
};