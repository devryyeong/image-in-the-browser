const drawHeart = (x, y) => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  context.save(); // 현재 상태 저장
  context.translate(x, y); // 원점 이동

  context.beginPath();
  context.moveTo(75, 40);
  context.bezierCurveTo(75, 37, 70, 25, 50, 25);
  context.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  context.bezierCurveTo(20, 80, 40, 102, 75, 120);
  context.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
  context.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
  context.bezierCurveTo(85, 25, 75, 37, 75, 40);
  context.fill();
  context.closePath();

  context.restore(); // 상태 복원

  // 하단 중앙에서 선 그리기
  const centerX = x + 75;
  const centerY = y + 120;
  const endX = canvas.width / 2;
  const endY = canvas.height - 150;

  context.beginPath();
  context.moveTo(centerX, centerY);
  context.lineTo(endX, endY);
  context.strokeStyle = 'black';
  context.stroke();
  context.closePath();
};

export default drawHeart;