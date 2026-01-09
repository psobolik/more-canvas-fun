import './style.css'
import Point from "./Point.ts";
import Util from "./Util.ts";

enum Shapes { circle, square, triangle, pill}

const SIZE_MAX = 30;
const SIZE_MIN = 4;
const WIDTH = 800;
const HEIGHT = 800;
const RADIUS = (Math.min(WIDTH, HEIGHT) - SIZE_MAX) / 2;
const SECTIONS = 8;
const ANGLE = (2 * Math.PI) / SECTIONS;
const BACKGROUND_COLOR = '#000';

const POINTS = [new Point(0, 0), // Center
    new Point(0, -RADIUS), new Point(Math.cos(ANGLE) * RADIUS, -Math.sin(ANGLE) * RADIUS), new Point(RADIUS, 0), new Point(Math.cos(ANGLE) * RADIUS, Math.sin(ANGLE) * RADIUS), new Point(0, RADIUS), new Point(-Math.cos(ANGLE) * RADIUS, Math.sin(ANGLE) * RADIUS), new Point(-RADIUS, 0), new Point(-Math.cos(ANGLE) * RADIUS, -Math.sin(ANGLE) * RADIUS), new Point(0, -RADIUS),];
const CX = WIDTH / 2;
const CY = HEIGHT / 2;

const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
if (!canvas) throw ("No canvas");

const drawBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.roundRect(0.0, 0.0, ctx.canvas.width, ctx.canvas.height, 20);
    ctx.fill();
}
const path = (ctx: CanvasRenderingContext2D, n: number) => {
    ctx.beginPath();
    ctx.moveTo(POINTS[0].x, POINTS[0].y);
    ctx.lineTo(POINTS[n].x, POINTS[n].y);
    ctx.lineTo(POINTS[n + 1].x, POINTS[n + 1].y);
    ctx.closePath();
}
// const drawSection = (ctx: CanvasRenderingContext2D, section: number) => {
//     ctx.save();
//     ctx.translate(CX, CY);
//     path(ctx, section)
//     ctx.strokeStyle = "white";
//     ctx.stroke();
//     ctx.restore();
// }

const drawCircles = (ctx: CanvasRenderingContext2D,
                     x: number, y: number, r: number, fill: string) => {
    const drawCircle = (x: number, y: number, r: number) => {
        ctx.moveTo(x + r, y + r);
        ctx.ellipse(x, y, r, r, Math.PI * 4, 0, Math.PI * 2);
    }
    ctx.save();
    ctx.translate(CX, CY);
    ctx.fillStyle = fill;
    ctx.beginPath();
    drawCircle(x, y, r);
    drawCircle(x, -y, r);
    drawCircle(-x, y, r);
    drawCircle(-x, -y, r);
    drawCircle(y, x, r);
    drawCircle(y, -x, r);
    drawCircle(-y, x, r);
    drawCircle(-y, -x, r);
    ctx.fill();
    ctx.restore();
}
const drawSquares = (ctx: CanvasRenderingContext2D,
                    x: number, y: number, size: number, color: string) => {
    const drawSquare = (ctx: CanvasRenderingContext2D,
                        x: number, y: number, size:number, rotation: number, offset: number) => {
        ctx.save();
        ctx.translate(CX + x, CY + y);
        ctx.rotate((rotation * Math.PI) / 100);
        ctx.beginPath();
        ctx.moveTo(-offset, -offset);
        ctx.lineTo(-offset, -offset + size);
        ctx.lineTo(-offset + size, -offset + size);
        ctx.lineTo(-offset + size, -offset);
        ctx.closePath();
        ctx.fill()
        ctx.restore()
    }
    ctx.save();
    ctx.fillStyle = color;
    const offset = size / 2
    drawSquare(ctx, x, y, size, 22.5, offset); // 1
    drawSquare(ctx, -y, -x, size, 45, offset); // 2
    drawSquare(ctx, -y, x, size, 67.5, offset); // 3
    drawSquare(ctx, x, -y, size, 90, offset); // 4
    drawSquare(ctx, -x, -y, size, 112.5, offset); // 5
    drawSquare(ctx, y, x, size, 135, offset); // 6
    drawSquare(ctx, y, -x, size, 157.5, offset); // 7
    drawSquare(ctx, -x, y, size, 180, offset); // 8
    ctx.restore();
}
const drawPills = (ctx: CanvasRenderingContext2D, x: number, y: number, dx: number, dy: number, color: string) => {
    const drawPill = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
    }
    ctx.save();
    ctx.translate(CX, CY);
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.min(Math.abs(dx), Math.abs(dy));
    ctx.lineCap = "round";
    const x2 = x + dx;
    const y2 = y + dy;
    ctx.beginPath();
    drawPill(ctx, x, y, x2, y2);
    drawPill(ctx, x, -y, x2, -y2);
    drawPill(ctx, -x, y, -x2, y2);
    drawPill(ctx, -x, -y, -x2, -y2);
    drawPill(ctx, y, x, y2, x2);
    drawPill(ctx, -y, x, -y2, x2);
    drawPill(ctx, y, -x, y2, -x2);
    drawPill(ctx, -y, -x, -y2, -x2);
    ctx.stroke();
    ctx.restore();
}
const drawTriangles = (ctx: CanvasRenderingContext2D,
                       x: number, y: number, size: number, color: string)=> {
    const drawTriangle = (ctx: CanvasRenderingContext2D,
                          x: number, y: number, size: number, rotation: number)=> {
        ctx.save();
        const xa = -0.866 * size; const ya = -0.5 * size;
        const xb = 0.866 * size; const yb = -0.5 * size;
        const xc = 0.0; const yc = size;
        ctx.translate(CX + x, CY + y);
        ctx.rotate((rotation * Math.PI) / 100);
        ctx.scale(1, -1)
        ctx.beginPath();
        ctx.moveTo(xa, ya);
        ctx.lineTo(xb, yb);
        ctx.lineTo(xc, yc);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    drawTriangle(ctx, x, y, size, 22.5); // 1
    drawTriangle(ctx, -y, -x, size, 45); // 2
    drawTriangle(ctx, -y, x, size, 67.5); // 3
    drawTriangle(ctx, x, -y, size, 90); // 4
    drawTriangle(ctx, -x, -y, size, 112.5); // 5
    drawTriangle(ctx, y, x, size, 135); // 6
    drawTriangle(ctx, y, -x, size, 157.5); // 7
    drawTriangle(ctx, -x, y, size, 180); // 8
    ctx.restore();
}
canvas.setAttribute('width', WIDTH.toString());
canvas.setAttribute('height', HEIGHT.toString());

const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
if (ctx == null) throw ("Failed to get context");

let minColor = 0;
let maxColor = 255;

const reset = (ctx: CanvasRenderingContext2D) => {
    minColor = Util.random(0, 128);
    maxColor = Util.random(128, 255);
    drawBackground(ctx);
    setTimeout(() => { reset(ctx); }, Util.random(5, 15) * 1000)
}
reset(ctx);
setInterval(() => {
    const x = Util.random(0, RADIUS);
    const y = Util.random(0, -RADIUS);
    path(ctx, 1);
    if (ctx.isPointInPath(x, y)) {
        const red = Util.random(minColor, maxColor).toString();
        const green = Util.random(minColor, maxColor).toString();
        const blue = Util.random(minColor, maxColor).toString();
        const color = `rgb(${red.toString()}, ${green.toString()}, ${blue.toString()})`;
        switch (Util.random(0, 3)) {
            case Shapes.circle:
                const radius = Util.random(SIZE_MIN / 2, SIZE_MAX / 2);
                drawCircles(ctx, x, y, radius, color);
                break;
            case Shapes.square:
                const size = Util.random(SIZE_MIN, SIZE_MAX);
                drawSquares(ctx, x, y, size, color);
                break;
            case Shapes.triangle:
                const size_t = Util.random(SIZE_MIN, SIZE_MAX);
                drawTriangles(ctx, x, y, size_t, color);
                break;
            case Shapes.pill:
                const dx = Util.random(-SIZE_MAX, SIZE_MAX);
                const dy = Util.random(-SIZE_MAX, SIZE_MAX);
                drawPills(ctx, x, y, dx, dy, color);
                break;
        }
        // drawSection(ctx, 1);
        // drawSection(ctx, 2);
        // drawSection(ctx, 3);
        // drawSection(ctx, 4);
        // drawSection(ctx, 5);
        // drawSection(ctx, 6);
        // drawSection(ctx, 7);
        // drawSection(ctx, 8);
    }
}, 1)
