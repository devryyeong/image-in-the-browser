import './css/index.css';
import COLORS from './utils/colors';
import drawHouse from './House';
import drawBear from './Bear';
import drawHeart from './Heart';
import drawCircle from './Circle';
import { HOUSE_WIDTH, HOUSE_HEIGHT, HEART_RADIUS } from './utils/constant';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const ballons = []; // 추가한 풍선들을 저장하는 배열

// 랜덤 색상 선택 함수
function getRandomColor() {
  const colorKeys = Object.keys(COLORS);
  const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
  return COLORS[randomColorKey];
}

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

  ballons.push({
    type: shapeType,
    x,
    y,
    color: shapeColor,
  });
}

// 클릭한 좌표가 원 내부에 있는지 확인하는 함수
function isPointInsideCircle(pointX, pointY, circle) {
  const distance = Math.sqrt((pointX - circle.x) ** 2 + (pointY - circle.y) ** 2);
  return distance <= 50;
}

// 클릭한 좌표가 하트 내부에 있는지 확인하는 함수
function isPointInsideHeart(pointX, pointY, heartX, heartY) {
  const heartCenterX = heartX + HEART_RADIUS;
  const heartCenterY = heartY + HEART_RADIUS;

  // 하트 내부에 있는지 여부를 판단 (하트 내부에 있는 좌표들을 반복해서 확인하고 있는지 확인)
  for (let yOffset = -HEART_RADIUS; yOffset <= HEART_RADIUS; yOffset++) {
    const xOffset = HEART_RADIUS - Math.abs(yOffset); // 각 행에서의 x 범위
    const xStart = heartCenterX - xOffset;
    const xEnd = heartCenterX + xOffset;

    // 클릭 좌표가 해당 행에 속하면 내부에 있는 것으로 판단
    if (Math.abs(pointY - (heartCenterY + yOffset)) <= 1 && pointX >= xStart && pointX <= xEnd) {
      return true;
    }
  }
  return false;
}

// 클릭한 좌표가 곰 내부에 있는지 확인하는 함수
function isPointInsideBear(pointX, pointY, bearX, bearY) {
  const bearCenterX = bearX + 150;
  const bearCenterY = bearY + 150;
  const faceRadius = 50;

  // 곰 얼굴 내부에 있는지 여부를 판단
  const distance = Math.sqrt((pointX - bearCenterX) ** 2 + (pointY - bearCenterY) ** 2);
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
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawHouse(context, 620, 450);

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const ballon of ballons) {
    switch (ballon.type) {
      case 'circle':
        drawCircle(ballon.x, ballon.y);
        break;
      case 'heart':
        drawHeart(ballon.x, ballon.y);
        break;
      case 'bear':
        drawBear(ballon.x, ballon.y);
        break;
      default:
        break;
    }
    context.fillStyle = ballon.color;
    context.fill();
    context.closePath();
  }
}

// 집 영역인지 확인하는 함수
function isPointInHouse(pointX, pointY) {
  const houseX = (canvas.width - HOUSE_WIDTH) / 2;
  const houseY = canvas.height - HOUSE_HEIGHT;
  const houseLeft = houseX;
  const houseTop = houseY;

  // 집 영역 내인지 체크
  if (
    pointX >= houseLeft &&
    pointX <= houseLeft + HOUSE_WIDTH &&
    pointY >= houseTop &&
    pointY <= houseTop + HOUSE_HEIGHT
  ) {
    return true;
  }
  return false;
}

// 원, 하트, 곰 도형 클릭 시 실행될 함수
function handleShapeClick(clickX, clickY) {
  // eslint-disable-next-line no-restricted-syntax
  for (const ballon of ballons) {
    if (isPointInsideShape(clickX, clickY, ballon)) {
      ballon.type = null;
      break;
    }
  }
  redrawCanvas();
}

// 특정값 사이의 랜덤 좌표 생성 함수
function getRandomPointInRange(minX, maxX, minY, maxY) {
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
  for (const ballon of ballons) {
    if (isPointInsideShape(clickX, clickY, ballon)) {
      clickedShape = ballon.type;
      break;
    }
  }

  if (clickedShape) {
    handleShapeClick(clickX, clickY);
  } else if (isPointInHouse(clickX, clickY)) {
    const randomPoint = getRandomPointInRange(100, 1340, 50, 150);
    addRandomShape(randomPoint.x, randomPoint.y);
  }
});
drawHouse(context, canvas.width / 2 - HOUSE_WIDTH / 2, canvas.height - HOUSE_HEIGHT);


// 구름 그리기 함수
// function drawCloud(x, y, width, height) {
//   context.beginPath();
//   context.arc(x + width * 0.25, y + height * 0.5, width * 0.25, 0, Math.PI * 2);
//   context.arc(x + width * 0.5, y + height * 0.4, width * 0.3, 0, Math.PI * 2);
//   context.arc(x + width * 0.75, y + height * 0.5, width * 0.25, 0, Math.PI * 2);
//   context.closePath();

//   context.fillStyle = 'white';
//   context.fill();
// }

// // 구름 초기 좌표와 속도 설정
// let cloudX = canvas.width - 200;
// const cloudY = canvas.height - 550;
// const cloudWidth = 150;
// const cloudHeight = 80;
// const cloudSpeed = 2;


// // 캔버스 다시 그리기 함수
// function redrawCanvasWithAnimation() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   // 집 그리기
//   drawHouse(context, 620, 450);
//   // 구름 그리기
//   drawCloud(cloudX, cloudY, cloudWidth, cloudHeight);
// }
// // 구름 움직임 로직
// function updateCloudPosition() {
//   cloudX -= cloudSpeed;
//   if (cloudX + cloudWidth < 0) {
//     cloudX = canvas.width;
//   }
// }

// // 애니메이션 설정
// function animate() {
//   updateCloudPosition();
//   redrawCanvasWithAnimation();

//   // 다음 프레임 요청
//   requestAnimationFrame(animate);
// }
// animate();