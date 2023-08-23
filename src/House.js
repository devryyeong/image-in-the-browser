import { HOUSE_WIDTH, HOUSE_HEIGHT } from './utils/constant';

function drawWindow (context, x, y) {
  context.fillStyle = '#FFFF00';
  context.fillRect(x + 10, y + 10, 30, 30);
}

function drawHouse (context, x, y) {
  context.beginPath();
  context.fillStyle = '#3C3C3C';
  context.fillRect(x, y, HOUSE_WIDTH, HOUSE_HEIGHT);

  // 창문 그리기
  const windowWidth = 20;
  const windowHeight = 20;
  const windowPadding = 20;

  // 1행에 3개의 창문 그리기
  for (let i = 0; i < 3; i++) {
    const windowX = x + windowPadding + i * ((200 - windowWidth) / 5 + windowPadding);
    const windowY = y + windowPadding;
    drawWindow(context, windowX, windowY);
  }

  for (let i = 0; i < 3; i++) {
    const windowX = x + windowPadding + i * ((200 - windowWidth) / 5 + windowPadding);
    const windowY = y + windowPadding;
    drawWindow(context, windowX, windowY + windowHeight + windowPadding);
  }
};

export default drawHouse;