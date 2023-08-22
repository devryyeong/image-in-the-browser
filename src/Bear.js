import COLORS from "./colors";

const drawBear = (x, y) => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  // 얼굴 그리기
  context.beginPath();
  context.arc(x + 150, y + 150, 50, 0, Math.PI * 2);
  context.fillStyle = `${COLORS.BROWN}`;
  context.fill();
  context.closePath();

  // 눈 그리기
  context.beginPath();
  context.arc(x + 130, y + 130, 5, 0, Math.PI * 2);
  context.fillStyle = '#000000';
  context.fill();
  context.closePath();

  context.beginPath();
  context.arc(x + 170, y + 130, 5, 0, Math.PI * 2);
  context.fillStyle = '#000000';
  context.fill();
  context.closePath();

  // 코 그리기
  context.beginPath();
  context.arc(x + 150, y + 150, 5, 0, Math.PI * 2);
  context.fillStyle = '#000000';
  context.fill();
  context.closePath();

  // 입 그리기
  context.beginPath();
  context.arc(x + 150, y + 155, 20, 0.2 * Math.PI, 0.8 * Math.PI);
  context.strokeStyle = '#000000';
  context.lineWidth = 3;
  context.stroke();
  context.closePath();

  // 하단 중앙에서 선 그리기
  const centerX = x + 150;
  const centerY = y + 200;
  const endX = canvas.width / 2;
  const endY = canvas.height - 150;

  context.beginPath();
  context.moveTo(centerX, centerY);
  context.lineTo(endX, endY);
  context.strokeStyle = 'black';
  context.stroke();
  context.closePath();
};
export default drawBear;