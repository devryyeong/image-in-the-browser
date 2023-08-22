import './css/index.css';
import COLORS from "./colors";
import drawHouse from './House';
import drawBear from './Bear';
import drawHeart from './Heart';
import drawCircle from './Circle';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// 랜덤 색상 선택 함수
function getRandomColor() {
  const colorKeys = Object.keys(COLORS);
  const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
  return COLORS[randomColorKey];
};

// 랜덤 도형 추가 함수
function addRandomShape(x, y) {
  const shapeTypes = ['circle', 'heart', 'bear'];
  const randomShapeIndex = Math.floor(Math.random() * shapeTypes.length);

  const shapeType = shapeTypes[randomShapeIndex];
  const shapeColor = shapeType === 'bear' ? `${COLORS.BROWN}` : getRandomColor();

  if (shapeType === 'circle') {
    drawCircle(canvas, context, x, y);
  } else if (shapeType === 'heart') {
    drawHeart(canvas, context, x, y);
  } else if (shapeType === 'bear') {
    drawBear(canvas, context, x, y);
  }

  context.fillStyle = shapeColor;
  context.fill();
  context.closePath();
};

// 집 도형 위치 계산
const houseX = (canvas.width - 200) / 2;
const houseY = canvas.height - 150;

// 집 영역인지 확인하는 함수
function isPointInHouse(pointX, pointY) {
  // 집 도형의 가로와 세로 크기
  const houseWidth = 200;
  const houseHeight = 150;

  // 집 도형의 왼쪽 상단 모서리 좌표
  const houseLeft = houseX;
  const houseTop = houseY;

  // 집 영역 내인지 체크
  if (
    pointX >= houseLeft && pointX <= houseLeft + houseWidth &&
    pointY >= houseTop && pointY <= houseTop + houseHeight
  ) {
    return true;
  }
  return false;
}

drawHouse(context, 620, 450);

// 역삼각형 내부의 랜덤 좌표 생성 함수
function getRandomPointInTriangle(minX, maxX, minY, maxY) {
  const randomX = Math.random() * (maxX - minX) + minX;    // 역삼각형 범위 내에서 랜덤 X 좌표 생성
  const randomY = Math.random() * (maxY - minY) + minY;   // 역삼각형 범위 내에서 랜덤 Y 좌표 생성
  return { x: randomX, y: randomY };
}

// 클릭 이벤트 리스너 등록
canvas.addEventListener('click', (event) => {
  const clickX = event.offsetX;
  const clickY = event.offsetY;

  if (isPointInHouse(clickX, clickY)) {
    console.log('click');
    const randomPoint = getRandomPointInTriangle(180, 1260, 10, 300);
    addRandomShape(randomPoint.x, randomPoint.y);
  }
});

function draw() {
  if (canvas.getContext) {
    //
  }
}

draw();


