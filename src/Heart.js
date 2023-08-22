const drawHeart = (x, y) => {
  const canvas = document.getElementById('canvas');
  const balloonContext = canvas.getContext('2d');
  const rotationAngle = (30 * Math.PI) / 180; // 회전 각도 (30도)

  balloonContext.save(); // 현재 상태 저장
  balloonContext.translate(x, y); // 원점 이동
  // balloonContext.rotate(-rotationAngle); // 왼쪽으로 30도 회전

  balloonContext.beginPath();
  balloonContext.moveTo(75, 40);
  balloonContext.bezierCurveTo(75, 37, 70, 25, 50, 25);
  balloonContext.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  balloonContext.bezierCurveTo(20, 80, 40, 102, 75, 120);
  balloonContext.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
  balloonContext.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
  balloonContext.bezierCurveTo(85, 25, 75, 37, 75, 40);
  balloonContext.fillStyle = '#ff69b4'; // 분홍색
  balloonContext.fill();
  balloonContext.closePath();

  balloonContext.restore(); // 상태 복원
};

export default drawHeart;