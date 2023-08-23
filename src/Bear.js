import COLORS from './utils/colors';
import { HOUSE_CENTER } from './utils/constant';

const drawBear = (x, y) => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  const centerX = x + 150;
  const centerY = y + 200;

  // 얼굴
  context.beginPath();
  context.arc(x + 150, y + 150, 50, 0, Math.PI * 2);
  context.fillStyle = `${COLORS.BROWN}`;
  context.fill();
  context.closePath();

  // 눈
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

  // 코
  context.beginPath();
  context.arc(x + 150, y + 150, 5, 0, Math.PI * 2);
  context.fillStyle = '#000000';
  context.fill();
  context.closePath();

  // 입
  context.beginPath();
  context.arc(x + 150, y + 155, 20, 0.2 * Math.PI, 0.8 * Math.PI);
  context.strokeStyle = '#000000';
  context.lineWidth = 3;
  context.stroke();
  context.closePath();

  // 끈
  context.beginPath();
  context.moveTo(centerX, centerY);
  context.lineTo(HOUSE_CENTER.x, HOUSE_CENTER.y);
  context.strokeStyle = 'black';
  context.stroke();
  context.closePath();
};
export default drawBear;
