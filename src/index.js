import './css/index.css';
import COLORS from "./colors";
import drawHouse from './House';
import drawBear from './Bear';
import drawHeart from './Heart';
import drawCircle from './Circle';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const shapes = []; // 생성된 도형을 저장하는 배열

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
    drawCircle(x, y);
  } else if (shapeType === 'heart') {
    drawHeart(x, y);
  } else if (shapeType === 'bear') {
    drawBear(x, y);
  }

  context.fillStyle = shapeColor;
  context.fill();
  context.closePath();

  shapes.push({
    type: shapeType,
    x,
    y,
    color: shapeColor,
  });
};

// 클릭한 좌표가 원 내부에 있는지 확인하는 함수
function isPointInsideCircle(pointX, pointY, circle) {
  const distance = Math.sqrt((pointX - circle.x) ** 2 + (pointY - circle.y) ** 2);
  return distance <= 50;
}

// 클릭한 좌표가 하트 내부에 있는지 확인하는 함수
function isPointInsideHeart(pointX, pointY, heartX, heartY) {
  const heartCenterX = heartX + 75;
  const heartCenterY = heartY + 75; // 하트 중심 좌표
  const heartRadius = 75; // 하트 반지름

  // 하트 내부에 있는지 여부를 판단
  // 하트 내부에 있는 좌표들을 반복해서 확인하고 있는지 확인
  for (let yOffset = -heartRadius; yOffset <= heartRadius; yOffset++) {
    const xOffset = heartRadius - Math.abs(yOffset); // 각 행에서의 x 범위
    const xStart = heartCenterX - xOffset;
    const xEnd = heartCenterX + xOffset;

    // 클릭 좌표가 해당 행에 속하면 내부에 있는 것으로 판단
    if (
      Math.abs(pointY - (heartCenterY + yOffset)) <= 1 && // Y 좌표 오차 허용
      pointX >= xStart &&
      pointX <= xEnd
    ) {
      return true;
    }
  }
  return false;
}

// 클릭한 좌표가 곰 내부에 있는지 확인하는 함수
function isPointInsideBear(pointX, pointY, bearX, bearY) {
  const faceCenterX = bearX + 150;
  const faceCenterY = bearY + 150; // 곰 얼굴 중심 좌표
  const faceRadius = 50; // 곰 얼굴 반지름

  // 곰 얼굴 내부에 있는지 여부를 판단
  const distance = Math.sqrt((pointX - faceCenterX) ** 2 + (pointY - faceCenterY) ** 2);
  return distance <= faceRadius;
}

// 클릭한 좌표가 도형 내부에 있는지 확인하는 함수
function isPointInsideShape(pointX, pointY, shape) {
  if (shape.type === 'circle') {
    return isPointInsideCircle(pointX, pointY, shape);
  }
  if (shape.type === 'heart') {
    return isPointInsideHeart(pointX, pointY, shape.x, shape.y);
  }
  if (shape.type === 'bear') {
    return isPointInsideBear(pointX, pointY, shape.x, shape.y);
  }
  return false;
}

// 캔버스 다시 그리기 함수
function redrawCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기
  drawHouse(context, 620, 450);

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const shape of shapes) {
    if (shape.type === 'circle') {
      drawCircle(shape.x, shape.y);
    } else if (shape.type === 'heart') {
      drawHeart(shape.x, shape.y);
    } else if (shape.type === 'bear') {
      drawBear(shape.x, shape.y);
    }
    context.fillStyle = shape.color;
    context.fill();
    context.closePath();
  }
}

// 집 영역인지 확인하는 함수
function isPointInHouse(pointX, pointY) {
  // 집 도형 위치 계산
  const houseX = (canvas.width - 200) / 2;
  const houseY = canvas.height - 150;
  // 집 도형의 가로와 세로 크기
  const houseWidth = 200;
  const houseHeight = 150;
  // 집 도형의 왼쪽 상단 모서리 좌표
  const houseLeft = houseX;
  const houseTop = houseY;

  // 집 영역 내인지 체크
  if (
    pointX >= houseLeft &&
    pointX <= houseLeft + houseWidth &&
    pointY >= houseTop &&
    pointY <= houseTop + houseHeight
  ) {
    return true;
  }
  return false;
}

// 원, 하트, 곰 도형 클릭 시 실행될 함수
function handleShapeClick(clickX, clickY) {
  // eslint-disable-next-line no-restricted-syntax
  for (const shape of shapes) {
    if (isPointInsideShape(clickX, clickY, shape)) {
      shape.type = null;
      break;
    }
  }
  redrawCanvas();
}

drawHouse(context, 620, 450);

// 특정값 사이의 랜덤 좌표 생성 함수
function getRandomPointInTriangle(minX, maxX, minY, maxY) {
  const randomX = Math.random() * (maxX - minX) + minX;
  const randomY = Math.random() * (maxY - minY) + minY;
  return { x: randomX, y: randomY };
}

// 클릭 이벤트 리스너 등록
canvas.addEventListener('click', (event) => {
  const clickX = event.offsetX;
  const clickY = event.offsetY;
  let clickedShape = null;

  // 클릭한 좌표가 어떤 도형 위에 있는지 확인
  // eslint-disable-next-line no-restricted-syntax
  for (const shape of shapes) {
    if (isPointInsideShape(clickX, clickY, shape)) {
      clickedShape = shape.type;
      break;
    }
  }

  if (clickedShape) {
    handleShapeClick(clickX, clickY);
  } else if (isPointInHouse(clickX, clickY)) {
    const randomPoint = getRandomPointInTriangle(100, 1340, 50, 150);
    addRandomShape(randomPoint.x, randomPoint.y);
  }
  console.log('shapes: ', shapes);
});