import { HOUSE_CENTER } from "./utils/constant";

const drawCircle = (x, y) => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  const centerX = x;
  const centerY = y + 50;

  context.beginPath();
  context.arc(x, y, 50, 0, Math.PI * 2);
  context.fill();
  context.closePath();

  // 끈
  context.beginPath();
  context.moveTo(centerX, centerY);
  context.lineTo(HOUSE_CENTER.x, HOUSE_CENTER.y);
  context.strokeStyle = 'black';
  context.stroke();
  context.closePath();
};

export default drawCircle;