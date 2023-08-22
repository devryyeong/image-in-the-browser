const drawHouse = (context, x, y) => {
  context.beginPath();
  context.rect(x, y, 200, 150); // x, y, width, height
  context.fillStyle = '#d3d3d3'; // 회색
  context.fill();
  context.closePath();

  // 문 그리기
  context.beginPath();
  context.rect(x + 70, y + 50, 60, 100); // x, y, width, height
  context.fillStyle = '#5e3811'; // 갈색
  context.fill();
  context.closePath();

  // 창문 그리기
  context.beginPath();
  context.rect(x + 20, y + 20, 50, 50); // x, y, width, height
  context.rect(x + 130, y + 20, 50, 50); // x, y, width, height
  context.fillStyle = '#2e5a9a'; // 파란색
  context.fill();
  context.closePath();
};

export default drawHouse;