const drawCircle = (x, y) => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  context.beginPath();
  context.arc(x, y, 50, 0, Math.PI * 2);
  context.fill();
  context.closePath();

  // 하단 중앙에서 선 그리기
  const centerX = x;
  const centerY = y + 50;
  const endX = canvas.width / 2;
  const endY = canvas.height - 150;

  context.beginPath();
  context.moveTo(centerX, centerY);
  context.lineTo(endX, endY);
  context.strokeStyle = 'black';
  context.stroke();
  context.closePath();
};

export default drawCircle;