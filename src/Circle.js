const drawCircle = (x, y) => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  context.beginPath();
  context.arc(x, y, 50, 0, Math.PI * 2);
  context.fill();
  context.closePath();
};

export default drawCircle;