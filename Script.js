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
        squares.push({x: lastMouseX, y:lastMouseY, width: w, stroke: drawCtx.strokeStyle, fill: null}); 
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
        circles.push({x: centerX, y:centerY, stroke: drawCtx.strokeStyle, fill: null}); 
    });

    drawingCanvas.addEventListener('mousemove', function (e) {
        mouseX = parseInt(e.clientX - canvasX);
        mouseY = parseInt(e.clientY - canvasY);
        if (drawing) {
            drawCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            drawCtx.save();
            drawCtx.beginPath();
           
            scaleX = 1 * ((mouseX - lastMouseX) / 2);
            scaleY = 1 * ((mouseY - lastMouseY) / 2);
            drawCtx.scale(scaleX, scaleY);

            centerX = (lastMouseX / scaleX) + 1;
            centerY = (lastMouseY / scaleY) + 1;
            drawCtx.arc(centerX, centerY, 1, 0, 2 * Math.PI, false);
            drawCtx.stroke();
            drawCtx.restore();    
        }
       });
}

function selectEllipse() {
    centerX = centerY = 0;
    drawingCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        drawing = true;
    });

    drawingCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        ellipse.push({x: centerX, y:centerY, stroke: drawCtx.strokeStyle, fill: null}); 
    });

    drawingCanvas.addEventListener('mousemove', function (e) {
        mouseX = parseInt(e.clientX - canvasX);
        mouseY = parseInt(e.clientY - canvasY);
        if (drawing) {
            drawCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            drawCtx.save();
            drawCtx.beginPath();
           
            var scaleX = 1 * ((mouseX - lastMouseX) / 2);
            var scaleY = 1 * ((mouseY - lastMouseY) / 2);
            drawCtx.scale(scaleX, scaleY);

            var centerX = (lastMouseX / scaleX) + 1;
            var centerY = (lastMouseY / scaleY) + 1;
            drawCtx.arc(centerX, centerY, 1, 0, 2 * Math.PI);
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
        triangles.push({mouseX: mouseX, mouseY: mouseY, stroke: drawCtx.strokeStyle, fill: null });
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
        //nu merge chiar cum trebuie
        rectangles.push({x: lastMouseX, y:lastMouseY, width: w,  height: h, stroke: drawCtx.strokeStyle, fill: null}); 
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
    drawColorPicker();
   
    canvas.addEventListener("click", function (e) {
        pixelColor = getPixelColor(e);    
    });
    drawingCanvas.style.backgroundColor = pixelColor; 
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
        img.src = 'colorWheel.png';
        img.onload = function () {
            ctx.drawImage(img, 20, 5, 150, 150);
            imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            canvas.addEventListener("click", function (e) {
                pixelColor = getPixelColor(e);
                showColor.style.backgroundColor = pixelColor;
            });
        };

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


//doesn't really work -- look onto it
function saveSvg() {
    svg.width = drawingCanvas.width;
    svg.height = drawingCanvas.height;

    if (rectangles.length != null)
        for (i = 0; i< rectangles.length; i++){
            rect = document.createElement('rect');
            svg.appendChild(rect);
            rect.setAttribute('width', rectangles[i].width);
            rech.setAttribute('height', rectangles[i].height);
            rect.style.offsetLeft = rectangles[i].x;
            rect.style.offsetTop = rectangles[i].y;
            rect.setAttribute('stroke', rectangles[i].stroke);
            rect.setAttribute('fill', rectangles[i].fill);
        }

    if (squares.length != null)
        for (i = 0; i< squares.length; i++){
            sq = document.createElement('rect');
            svg.appendChild(sq);
            sq.setAttribute('width', squares[i].width);
            sq.setAttribute('height', squares[i].width);
            sq.style.offsetLeft = squares[i].x;
            sq.style.offsetTop = squares[i].y;
            sq.setAttribute('stroke', squares[i].stroke);
            sq.setAttribute('fill', squares[i].fill);
        }

    if (circles.length != null)
        for (i = 0; i< circles.length; i++){
            circ = document.createElement("circle");
            svg.appendChild(circ);
            circ.setAttribute('cx', circles[i].x);
            circ.setAttribute('cy', circles[i].y);
            circ.setAttribute('stroke', circles[i].stroke);
            circ.setAttribute('fill', circles[i].fill);
        }

    if (ellipses.length != null)
        for (i = 0; i< ellipses.length; i++){
            ell = document.createElement("ellipse");
            svg.appendChild(ell);
            ell.setAttribute('cx', ellipses[i].x);
            ell.setAttribute('cy', ellipses[i].y);
            ell.setAttribute('stroke', ellipses[i].stroke);
            ell.setAttribute('fill', ellipses[i].fill);
        }

    if(triangles.length != null)
        for (i = 0; i< triangles.length; i++){
            tr = document.createElement("polygon");
            svg.appendChild(tr);
            tr.setAttribute('points', [triangles[i].mouseX,triangles[i]. mouseY, triangles[i].mouseX]);
            tr.setAttribute('stroke', triangles[i].stroke);
            tr.setAttribute('fill', triangles[i].fill);
        }

        svgText = svg.outerHTML;
        svgText = svgText.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"');

        var svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
        var svgUrl = URL.createObjectURL(svgBlob);

        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "image.svg";
        downloadLink.click();

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

        btnPng.addEventListener('click', savePng);
        btnJpeg.addEventListener('click', saveJpeg);
        btnSvg.addEventListener('click', saveSvg);
    }
}

function aplicatie() {
    nr = nrBrush = nrShapes = nrSave = 0;
    pixelColor = "#000000"
    //color-picker canvas
    canvas = document.getElementById("picker");
    ctx = canvas.getContext("2d");

    //drawing canvas
    drawingCanvas = document.getElementById("drawing-canvas");
    drawCtx = drawingCanvas.getContext("2d");
    drawingCanvas.height = window.innerHeight;
    drawingCanvas.width = window.innerWidth * 0.7;
    
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

    //console.log(circles);

}

document.addEventListener("DOMContentLoaded", aplicatie);
