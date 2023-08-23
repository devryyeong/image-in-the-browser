const drawHouse = (context, x, y) => {
  context.beginPath();
  context.rect(x, y, 200, 150);
  context.fillStyle = '#d3d3d3';
  context.fill();
  context.closePath();

  // 문
  context.beginPath();
  context.rect(x + 70, y + 50, 60, 100);
  context.fillStyle = '#5e3811';
  context.fill();
  context.closePath();

  // 창문
  context.beginPath();
  context.rect(x + 20, y + 20, 50, 50);
  context.rect(x + 130, y + 20, 50, 50);
  context.fillStyle = '#2e5a9a';
  context.fill();
  context.closePath();
};

export default drawHouse;