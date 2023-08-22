const drawBear = (x,y) => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  if (canvas.getContext) {
    // 얼굴 그리기
    context.beginPath();
    context.arc(x + 150, y + 150, 50, 0, Math.PI * 2);
    context.fillStyle = '#ffd699';
    context.fill();
    context.closePath();

    // 눈 그리기
    context.beginPath();
    context.arc(x + 130, y + 130, 5, 0, Math.PI * 2);
    context.fillStyle = '#000';
    context.fill();
    context.closePath();

    context.beginPath();
    context.arc(x + 170, y + 130, 5, 0, Math.PI * 2);
    context.fillStyle = '#000';
    context.fill();
    context.closePath();

    // 코 그리기
    context.beginPath();
    context.arc(x + 150, y + 150, 5, 0, Math.PI * 2);
    context.fillStyle = '#ffac33';
    context.fill();
    context.closePath();

    // 입 그리기
    context.beginPath();
    context.arc(x + 150, y + 155, 20, 0.2 * Math.PI, 0.8 * Math.PI);
    context.strokeStyle = '#000000';
    context.lineWidth = 3;
    context.stroke();
    context.closePath();
  }
};
export default drawBear;