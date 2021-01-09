function selectBrush() {
    chooseSize = document.getElementById("brushSize");
    nrBrush++;
    if (nrBrush % 2 == 0) {
        chooseSize.style.display = "none";
    } else {
        chooseSize.style.display = "block";
        chooseSize.addEventListener("change", function () {
            drawCtx.lineWidth = chooseSize.value;
        });
    }
}

function selectShape() {
    shapeSelection = document.querySelector(".shapes-wrapper");
    nrShapes++;
    if (nrShapes % 2 == 0) {
        shapeSelection.style.display = "none";
    } else {
        shapeSelection.style.display = "block";
        drawing = false;
        pencil = document.getElementById("pencil");
        square = document.getElementById("square");
        circle = document.getElementById("circle");
        ellipse = document.getElementById("ellipse");
        triangle = document.getElementById("triangle");
        dreptungi = document.getElementById("dreptungi");
        linie = document.getElementById("linie");

        pencil.addEventListener('click', selectPencil);
        square.addEventListener('click', selectSquare);
        circle.addEventListener('click', selectCircle);
        ellipse.addEventListener('click', selectEllipse);
        triangle.addEventListener('click', selectTriangle);
        dreptungi.addEventListener('click', selectDreptunghi);
        linie.addEventListener('click', selectLinie);

    }
}

function selectPencil() {
    ppts = []
    drawingCanvas.addEventListener('mousedown', function(e) {
        drawing = true;
        drawCtx.moveTo(e.x, e.y);
    });
    drawingCanvas.addEventListener('mouseup', function(e) {
        drawing = false;
        drawCtx.beginPath();
    });
    drawingCanvas.addEventListener('mousemove', function(e) {
        if(drawing) {
            drawCtx.lineTo(e.x, e.y);
            drawCtx.stroke();
            drawCtx.beginPath();
            drawCtx.moveTo(e.x, e.y);
        }
    });
}

function selectSquare() {
    w = h = 0;
    drawingCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        drawing = true;
    });

    drawingCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        squares.push({x: lastMouseX, y:lastMouseY, width: w, stroke: drawCtx.strokeStyle, fill: "none", line: drawCtx.lineWidth});
    });

    drawingCanvas.addEventListener('mousemove', function (e) {
        mouseX = parseInt(e.clientX - canvasX);
        mouseY = parseInt(e.clientY - canvasY);
        if (drawing) {
            drawCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            drawCtx.save();
            drawCtx.beginPath();
            w = (e.pageX - canvasX) - lastMouseX;
            h = (e.pageY - canvasY) - lastMouseY;
            drawCtx.strokeRect(lastMouseX, lastMouseY, w, w);       
        } 
    });
}

function selectCircle() {
    centerX = centerY = 0;
    drawingCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = parseInt(e.clientX - canvasX);
        lastMouseY = parseInt(e.clientY - canvasY);
        drawing = true;
    });

    drawingCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        circles.push({x: centerX, y:centerY, rx:scaleX, ry: scaleY, stroke: drawCtx.strokeStyle, fill: "none", line: drawCtx.lineWidth}); 
    });

    drawingCanvas.addEventListener('mousemove', function (e) {
        mouseX = parseInt(e.clientX - canvasX);
        mouseY = parseInt(e.clientY - canvasY);
        if (drawing) {
            drawCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            drawCtx.save();
            drawCtx.beginPath();
           
            scaleX = parseInt((mouseX - lastMouseX) / 2);
            scaleY = parseInt((mouseY - lastMouseY) / 2);
            drawCtx.scale(scaleX, scaleY);

            centerX = (lastMouseX / scaleX) + 1;
            centerY = (lastMouseY / scaleY) + 1;
            drawCtx.ellipse(centerX, centerY, Math.abs(scaleX), Math.abs(scaleX), 0, 2 * Math.PI, false);
            drawCtx.stroke();
            drawCtx.restore();    
        } 
       });
}

function selectEllipse() {
    centerX = centerY = 0;
    drawingCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = parseInt(e.clientX - canvasX);
        lastMouseY = parseInt(e.clientY - canvasY);
        drawing = true;
    });

    drawingCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        ellipses.push({x: centerX, y:centerY, rx: scaleX, ry: scaleY, stroke: drawCtx.strokeStyle, fill: "none", line: drawCtx.lineWidth}); 
    });

    drawingCanvas.addEventListener('mousemove', function (e) {
        mouseX = parseInt(e.clientX - canvasX);
        mouseY = parseInt(e.clientY - canvasY);
        if (drawing) {
            drawCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            drawCtx.save();
            drawCtx.beginPath();
           
            scaleX = parseInt((mouseX - lastMouseX) / 2);
            scaleY = parseInt((mouseY - lastMouseY) / 2);
            drawCtx.scale(scaleX, scaleY);

            centerX = (lastMouseX / scaleX) + 1;
            centerY = (lastMouseY / scaleY) + 1;
            drawCtx.ellipse(centerX, centerY, Math.abs(scaleX), Math.abs(scaleY), 0, 2 * Math.PI, false);
            drawCtx.stroke();
            drawCtx.restore();    
        } 
    });
}

function selectTriangle() {
    drawingCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = parseInt(e.clientX - canvasX);
        lastMouseY = parseInt(e.clientY - canvasY);
        drawing = true;
    });

    drawingCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        triangles.push({lastMouseX: lastMouseX, lastMouseY: lastMouseY, mouseX: mouseX, mouseY: mouseY, stroke: drawCtx.strokeStyle, fill: "none", line: drawCtx.lineWidth });
    });

    drawingCanvas.addEventListener('mousemove', function (e) {
        mouseX = parseInt(e.clientX - canvasX);
        mouseY = parseInt(e.clientY - canvasY);
        if (drawing) {
            drawCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            drawCtx.save();
            drawCtx.beginPath();
            drawCtx.moveTo(lastMouseX, lastMouseY);
            drawCtx.lineTo(mouseX, mouseY);
            drawCtx.lineTo(mouseY, mouseX);
            drawCtx.closePath();
            drawCtx.stroke();
        }
       });
}

function selectDreptunghi() {
    w = h = 0;
    drawingCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        drawing = true;
    });

    drawingCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        rectangles.push({x: lastMouseX, y:lastMouseY, width: w,  height: h, stroke: drawCtx.strokeStyle, fill: "none", line: drawCtx.lineWidth}); 
    });

    drawingCanvas.addEventListener('mousemove', function (e) {
        mouseX = parseInt(e.clientX - canvasX);
        mouseY = parseInt(e.clientY - canvasY);
        if (drawing) {
            drawCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            drawCtx.save();
            drawCtx.beginPath();
            w = (e.pageX - canvasX) - lastMouseX;
            h = (e.pageY - canvasY) - lastMouseY;
            drawCtx.strokeRect(lastMouseX, lastMouseY, w, h);
        } 
    });
}

function selectLinie() {

    drawingCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = parseInt(e.clientX - canvasX);
        lastMouseY = parseInt(e.clientY - canvasY);
        drawing = true;
    });

    drawingCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        lines.push({x1: lastMouseX, y1: lastMouseY, x2: mouseX, y2: mouseY, stroke: drawCtx.strokeStyle, fill: "none", line: drawCtx.lineWidth});
    });

    drawingCanvas.addEventListener('mousemove', function (e) {
        mouseX = parseInt(e.clientX - canvasX);
        mouseY = parseInt(e.clientY - canvasY);
        if (drawing) {
            drawCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            drawCtx.save();
            drawCtx.beginPath();
            drawCtx.moveTo(lastMouseX, lastMouseY);
            drawCtx.lineTo(mouseX, mouseY);
            drawCtx.stroke();
            drawCtx.restore();   
        }
       });
}

function getPixelColor(e) {
    x = e.pageX - canvas.offsetLeft;
    y = e.pageY - canvas.offsetTop;
    pixel = ctx.getImageData(x, y, 1, 1).data;
    pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
    return pixelColor;
}

function colorBg() {
    showColor.style.backgroundColor = bgPixel; 
    drawColorPicker();
    canvas.addEventListener("click", function (e) {
        bgPixel = getPixelColor(e);    
    });
    drawingCanvas.style.backgroundColor = bgPixel; 
}

function drawColorPicker() {
    wrapper = document.querySelector(".color-picker-wrapper");
    showColor = document.getElementById("color-id");
    nr++;
    if (nr % 2 == 0) {
        wrapper.style.display = "none";
        showColor.style.display = "none";
    }
    else {
        wrapper.style.display = "block";
        showColor.style.display = "block";
        
        img = new Image();
        img.src = '../media/colorWheel.png';
        img.onload = function () {
            ctx.drawImage(img, 20, 5, 150, 150);
            imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        };

        canvas.addEventListener("click", function (e) {
            pixelColor = getPixelColor(e);
            showColor.style.backgroundColor = pixelColor;
        });

    }

}

function selectColor() {
    drawColorPicker();
    canvas.addEventListener("click", function (e) {
        pixelColor = getPixelColor(e);    
    });
    drawCtx.strokeStyle = pixelColor;
}

function savePng() {
   a = document.createElement("a");

   document.body.appendChild(a);
   a.href = drawingCanvas.toDataURL("image/png");
   a.download = "image.png";
   a.click();
   document.body.removeChild(a);
}

function saveJpeg() {
    a = document.createElement("a");
 
    document.body.appendChild(a);
    a.href = drawingCanvas.toDataURL("image/jpeg");
    a.download = "image.jpeg";
    a.click();
    document.body.removeChild(a);
}

function saveSvg() {
    svgText = svg.outerHTML;
    svgText = svgText.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"');
    svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    svgUrl = URL.createObjectURL(svgBlob);

    downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "image.svg";
    downloadLink.click();

}

//din moment ce am reusit sa desenez doar o forma o data, incerc sa retin toate formele desenate si sa le incarc pe canvas
//nu merge decat pt triunghi si linie
function setupCanvas() {
    drawCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    if (rectangles.length != null)
        for (i = 0; i< rectangles.length; i++){
            drawCtx.strokeStyle = rectangles[i].stroke;
            drawCtx.lineWidth = rectangles[i].line;
            drawCtx.beginPath();
            drawCtx.strokeRect(rectangles[i].x, rectangles[i].y, Math.abs(rectangles[i].w), Math.abs(rectangles[i].h));
            drawCtx.save();
        }

    if (squares.length != null)
        for (i = 0; i< squares.length; i++){
            drawCtx.strokeStyle = squares[i].stroke;
            drawCtx.lineWidth = squares[i].line;
            drawCtx.beginPath();
            drawCtx.strokeRect(squares[i].x, squares[i].x, Math.abs(squares[i].w), Math.abs(squares[i].w));
            drawCtx.save();
        }

    if (circles.length != null)
        for (i = 0; i< circles.length; i++){
            drawCtx.strokeStyle = circles[i].stroke;
            drawCtx.lineWidth = circles[i].line;
            drawCtx.beginPath();
            drawCtx.ellipse(circles[i].x, circles[i].y, Math.abs(circles[i].rx), Math.abs(circles[i].rx), 0, 2 * Math.PI, false);
            drawCtx.stroke();
            drawCtx.save();
        }

    if (ellipses.length != null)
        for (i = 0; i< ellipses.length; i++){
            drawCtx.strokeStyle = ellipses[i].stroke;
            drawCtx.lineWidth = ellipses[i].line;
            drawCtx.beginPath();
            drawCtx.ellipse(ellipses[i].x, ellipses[i].y, Math.abs(ellipses[i].rx), Math.abs(ellipses[i].ry), 0, 2 * Math.PI, false);
            drawCtx.save();
        }

    if(triangles.length != null)
        for (i = 0; i< triangles.length; i++){
            drawCtx.beginPath();
            drawCtx.strokeStyle = triangles[i].stroke;
            drawCtx.lineWidth = triangles[i].line;
            drawCtx.moveTo(triangles[i].lastMouseX, triangles[i].lastMouseY);
            drawCtx.lineTo(triangles[i].mouseX, triangles[i].mouseY);
            drawCtx.lineTo(triangles[i].mouseY, triangles[i].mouseX);
            drawCtx.closePath();
            drawCtx.stroke();
            drawCtx.save();
        }

    if(lines.length != null)
        for (i = 0; i< lines.length; i++){
            drawCtx.beginPath();
            drawCtx.strokeStyle = lines[i].stroke;
            drawCtx.lineWidth = lines[i].line;
            drawCtx.moveTo(lines[i].x1, lines[i].y1);
            drawCtx.lineTo(lines[i].x2, lines[i].y2);
            drawCtx.stroke();
            drawCtx.save();
        }
}

//kinda works
//svg viewbox ca sa vezi cum sa se vada si coord negative
//vezi coord pt toate formele dar in special cerc, elipsa
function canvasToSVG() {
    svg.innerHTML = "";
    svg.width = drawingCanvas.width;
    svg.height = drawingCanvas.height;
    svg.style.backgroundColor = drawingCanvas.style.backgroundColor;

    if (rectangles.length != null)
        for (i = 0; i< rectangles.length; i++){
            rect = document.createElement('rect');
            svg.appendChild(rect);
            rect.setAttribute('width', Math.abs(rectangles[i].width));
            rect.setAttribute('height', Math.abs(rectangles[i].height));
            rect.setAttribute('stroke', rectangles[i].stroke);
            rect.setAttribute('stroke-width', drawCtx.lineWidth);
            rect.setAttribute('fill', rectangles[i].fill);
            rect.setAttribute('x', rectangles[i].x);
            rect.setAttribute('y', rectangles[i].y);
        }

    if (squares.length != null)
        for (i = 0; i< squares.length; i++){
            sq = document.createElement('rect');
            svg.appendChild(sq);
            sq.setAttribute('width', Math.abs(squares[i].width));
            sq.setAttribute('height', Math.abs(squares[i].width));
            sq.setAttribute('x', squares[i].x);
            sq.setAttribute('y', squares[i].y);
            sq.setAttribute('stroke', squares[i].stroke);
            sq.setAttribute('stroke-width', drawCtx.lineWidth);
            sq.setAttribute('fill', squares[i].fill);
        }

    if (circles.length != null)
        for (i = 0; i< circles.length; i++){
            circ = document.createElement("circle");
            svg.appendChild(circ);
            circ.setAttribute('cx', Math.abs(circles[i].x));
            circ.setAttribute('cy', Math.abs(circles[i].y));
            circ.setAttribute('stroke', circles[i].stroke);
            circ.setAttribute('r', Math.abs(circles[i].rx));
            circ.setAttribute('stroke-width', drawCtx.lineWidth);
            circ.setAttribute('fill', circles[i].fill);
        }

    if (ellipses.length != null)
        for (i = 0; i< ellipses.length; i++){
            ell = document.createElement("ellipse");
            svg.appendChild(ell);
            ell.setAttribute('cx', Math.abs(ellipses[i].x));
            ell.setAttribute('cy', Math.abs(ellipses[i].y));
            ell.setAttribute('ry', Math.abs(ellipses[i].rx));
            ell.setAttribute('rx', Math.abs(ellipses[i].ry));
            ell.setAttribute('stroke', ellipses[i].stroke);
            ell.setAttribute('stroke-width', drawCtx.lineWidth);
            ell.setAttribute('fill', ellipses[i].fill);
        }

    if(triangles.length != null)
        for (i = 0; i< triangles.length; i++){
            tr = document.createElement("polygon");
            svg.appendChild(tr);
            tr.setAttribute('points', triangles[i].lastMouseX + "," + triangles[i].lastMouseY + " " + triangles[i].mouseX + "," + triangles[i].mouseY + " " + triangles[i].mouseY + "," + triangles[i].mouseX);
            tr.setAttribute('stroke', triangles[i].stroke);
            tr.setAttribute('stroke-width', drawCtx.lineWidth);
            tr.setAttribute('fill', triangles[i].fill);
        }
    
    if(lines.length != null)
        for (i = 0; i< lines.length; i++){
            ln = document.createElement("line");
            svg.appendChild(ln);
            ln.setAttribute('x1', lines[i].x1);
            ln.setAttribute('x2', lines[i].x2);
            ln.setAttribute('y1', lines[i].y1);
            ln.setAttribute('y2', lines[i].y2);
            ln.setAttribute('stroke', lines[i].stroke);
            ln.setAttribute('stroke-width', drawCtx.lineWidth);
            ln.setAttribute('fill', lines[i].fill);
        }

}

function saveImage() {
    nrSave++;
    if (nrSave % 2 == 0) {
        document.getElementById("saveAs").style.display = "none";
    }else 
    {
        document.getElementById("saveAs").style.display = "block";
        btnPng = document.getElementById("png");
        btnJpeg = document.getElementById("jpeg");
        btnSvg = document.getElementById("svg");

        canvasToSVG();
        btnPng.addEventListener('click', savePng);
        btnJpeg.addEventListener('click', saveJpeg);
        btnSvg.addEventListener('click', saveSvg);
    }
}

function aplicatie() {
    nr = nrBrush = nrShapes = nrSave = 0;
    pixelColor = "#000000";
    bgPixel = "#FFFFFF";
    //color-picker canvas
    canvas = document.getElementById("picker");
    ctx = canvas.getContext("2d");

    //drawing canvas
    drawingCanvas = document.getElementById("drawing-canvas");
    drawCtx = drawingCanvas.getContext("2d");
    drawingCanvas.height = 600;
    drawingCanvas.width = window.innerWidth * 0.6;
    
    canvasX = drawingCanvas.offsetLeft;
    canvasY = drawingCanvas.offsetTop;
    lastMouseX = lastMouseY = 0;
    mouseX = mouseY = 0;
    drawing = false;

    circles = [];
    ellipses = [];
    squares = [];
    rectangles = [];
    triangles = [];
    lines = [];

    btnColors = document.getElementById("colors");
    btnColors.addEventListener('click', selectColor);

    btnBrushes = document.getElementById("brushes");
    btnBrushes.addEventListener('click', selectBrush);

    btnShapes = document.getElementById("shapes");
    btnShapes.addEventListener('click', selectShape);

    btnBgColor = document.getElementById("background");
    btnBgColor.addEventListener('click', colorBg);

    svg = document.createElement("svg");
    document.body.appendChild(svg);
    svg.style.display = "none";

    btnSave = document.getElementById("save");
    btnSave.addEventListener('click', saveImage);

    //nu uita de butonul de fill shape

}

document.addEventListener("DOMContentLoaded", aplicatie);
