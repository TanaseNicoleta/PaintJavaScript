function selectBrush() {
    chooseSize = document.getElementById("brushSize");
    nrBrush++;
    if (nrBrush % 2 == 0) {
        chooseSize.style.display = "none";
    } else {
        chooseSize.style.display = "block";
        chooseSize.addEventListener("change", function () {
        tempCtx.lineWidth = chooseSize.value;
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
    tempCanvas.addEventListener('mousedown', function(e) {
        drawing = true;
        tempCtx.moveTo(e.x, e.y);
    });
    tempCanvas.addEventListener('mouseup', function(e) {
        drawing = false;
        setupCanvas();
        tempCtx.beginPath();
    });
    tempCanvas.addEventListener('mousemove', function(e) {
        if(drawing) {
            tempCtx.lineCap = "round";
            tempCtx.lineTo(e.x, e.y);
            tempCtx.stroke();
            tempCtx.beginPath();
            tempCtx.moveTo(e.x, e.y);
            tempCtx.save();
        }
    });
}

function selectSquare() {
    w = h = 0;
    tempCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        drawing = true;
    });

    tempCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        setupCanvas();
        squares.push({x: lastMouseX, y:lastMouseY, width: w, stroke: tempCtx.strokeStyle, fill: "none", line: tempCtx.lineWidth});
    });

    tempCanvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            mouseX = parseInt(e.clientX - canvasX);
            mouseY = parseInt(e.clientY - canvasY);
            w = (e.pageX - canvasX) - lastMouseX;
            h = (e.pageY - canvasY) - lastMouseY;
            tempCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            tempCtx.save();
            tempCtx.beginPath();
            tempCtx.strokeRect(lastMouseX, lastMouseY, w, w);       
        } 
    });
}

function selectCircle() {
    centerX = centerY = 0;
    tempCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = parseInt(e.clientX - canvasX);
        lastMouseY = parseInt(e.clientY - canvasY);
        drawing = true;
    });
    tempCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        setupCanvas();
        circles.push({x: centerX, y:centerY, rx:scaleX, ry: scaleY, stroke: tempCtx.strokeStyle, fill: "none", line: tempCtx.lineWidth}); 
    });

    tempCanvas.addEventListener('mousemove', function (e) {
        mouseX = parseInt(e.clientX - canvasX);
        mouseY = parseInt(e.clientY - canvasY);
        if (drawing) {
            tempCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            tempCtx.save();
            tempCtx.beginPath();
           
            scaleX = parseInt((mouseX - lastMouseX) / 2);
            scaleY = parseInt((mouseY - lastMouseY) / 2);
            tempCtx.scale(scaleX, scaleY);
            centerX = (lastMouseX / scaleX) + 1;
            centerY = (lastMouseY / scaleY) + 1;
            
            tempCtx.arc(centerX, centerY, Math.abs(scaleX), 0, 2 * Math.PI, false);
            tempCtx.stroke();
            tempCtx.restore();    
        } 
       });
}

function selectEllipse() {
    centerX = centerY = 0;
    tempCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = parseInt(e.clientX - canvasX);
        lastMouseY = parseInt(e.clientY - canvasY);
        drawing = true;
    });

    tempCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        setupCanvas();
        ellipses.push({x: centerX, y:centerY, rx: scaleX, ry: scaleY, stroke: tempCtx.strokeStyle, fill: "none", line: tempCtx.lineWidth}); 
    });

    tempCanvas.addEventListener('mousemove', function (e) {
        mouseX = parseInt(e.clientX - canvasX);
        mouseY = parseInt(e.clientY - canvasY);
        if (drawing) {
            tempCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            tempCtx.save();
            tempCtx.beginPath();
           
            scaleX = parseInt((lastMouseX - mouseX) / 2);
            scaleY = parseInt((lastMouseY - mouseY) / 2);
            tempCtx.scale(scaleX, scaleY);

            centerX = (lastMouseX / scaleX) + 1;
            centerY = (lastMouseY / scaleY) + 1;
            tempCtx.ellipse(centerX, centerY, Math.abs(scaleX), Math.abs(scaleY), 0, 2 * Math.PI, false);
            tempCtx.stroke();
            tempCtx.restore();    
        } 
    });
}

function selectTriangle() {
    tempCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = parseInt(e.clientX - canvasX);
        lastMouseY = parseInt(e.clientY - canvasY);
        drawing = true;
    });

    tempCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        setupCanvas();
        triangles.push({lastMouseX: lastMouseX, lastMouseY: lastMouseY, mouseX: mouseX, mouseY: mouseY, stroke: tempCtx.strokeStyle, fill: "none", line: tempCtx.lineWidth });
    });

    tempCanvas.addEventListener('mousemove', function (e) {
        mouseX = parseInt(e.clientX - canvasX);
        mouseY = parseInt(e.clientY - canvasY);
        if (drawing) {
            tempCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            tempCtx.save();
            tempCtx.beginPath();
            tempCtx.moveTo(lastMouseX, lastMouseY);
            tempCtx.lineTo(mouseX, mouseY);
            tempCtx.lineTo(mouseY, mouseX);
            tempCtx.closePath();
            tempCtx.stroke();
        }
       });
}

function selectDreptunghi() {
    w = h = 0;
    tempCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        drawing = true;
    });

    tempCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        setupCanvas();
        rectangles.push({x: lastMouseX, y:lastMouseY, width: w,  height: h, stroke: tempCtx.strokeStyle, fill: "none", line: tempCtx.lineWidth}); 
    });

    tempCanvas.addEventListener('mousemove', function (e) {
        mouseX = parseInt(e.clientX - canvasX);
        mouseY = parseInt(e.clientY - canvasY);
        if (drawing) {
            tempCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            tempCtx.save();
            tempCtx.beginPath();
            w = (e.pageX - canvasX) - lastMouseX;
            h = (e.pageY - canvasY) - lastMouseY;
            tempCtx.strokeRect(lastMouseX, lastMouseY, w, h);
        } 
    });
}

function selectLinie() {
    tempCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = parseInt(e.clientX - canvasX);
        lastMouseY = parseInt(e.clientY - canvasY);
        drawing = true;
    });

    tempCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        setupCanvas();
        lines.push({x1: lastMouseX, y1: lastMouseY, x2: mouseX, y2: mouseY, stroke: tempCtx.strokeStyle, fill: "none", line: tempCtx.lineWidth});
    });

    tempCanvas.addEventListener('mousemove', function (e) {
        mouseX = parseInt(e.clientX - canvasX);
        mouseY = parseInt(e.clientY - canvasY);
        if (drawing) {
            tempCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            tempCtx.save();
            tempCtx.beginPath();
            tempCtx.moveTo(lastMouseX, lastMouseY);
            tempCtx.lineTo(mouseX, mouseY);
            tempCtx.stroke();
            tempCtx.restore();   
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

function colorBg() {
    drawColorPicker();
    canvas.addEventListener("click", function (e) {
        bgPixel = getPixelColor(e);    
    });
    tempCtx.fillStyle = bgPixel;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    drawCtx.fillStyle = bgPixel;
    drawCtx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
}

function selectColor() {
    drawColorPicker();
    canvas.addEventListener("click", function (e) {
        pixelColor = getPixelColor(e);    
    });
    tempCtx.strokeStyle = pixelColor;
}

function saveImage() {
    nrSave++;
    if (nrSave % 2 == 0) {
        document.getElementById("saveAs").style.display = "none";
    }else 
    {
       // setupCanvas();
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

function setupCanvas() {
    drawCtx.drawImage(tempCanvas, 0, 0);
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
}

function canvasToSVG() {
    svg.innerHTML = "";
    svg.width = drawingCanvas.width;
    svg.height = drawingCanvas.height;
    svg.style.backgroundColor = drawCtx.fillStyle;

    if (rectangles.length != null)
        for (i = 0; i< rectangles.length; i++){
            rect = document.createElement('rect');
            svg.appendChild(rect);
            rect.setAttribute('width', Math.abs(rectangles[i].width));
            rect.setAttribute('height', Math.abs(rectangles[i].height));
            rect.setAttribute('stroke', rectangles[i].stroke);
            rect.setAttribute('stroke-width', rectangles[i].line);
            rect.setAttribute('fill', rectangles[i].fill);
            rect.setAttribute('x', rectangles[i].x - svg.offsetLeft);
            rect.setAttribute('y', rectangles[i].y - svg.offsetTop);
        }

    if (squares.length != null)
        for (i = 0; i< squares.length; i++){
            sq = document.createElement('rect');
            svg.appendChild(sq);
            sq.setAttribute('width', Math.abs(squares[i].width));
            sq.setAttribute('height', Math.abs(squares[i].width));
            sq.setAttribute('x', squares[i].x - svg.offsetLeft);
            sq.setAttribute('y', squares[i].y - svg.offsetTop);
            sq.setAttribute('stroke', squares[i].stroke);
            sq.setAttribute('stroke-width', squares[i].line);
            sq.setAttribute('fill', squares[i].fill);
        }

    if (circles.length != null)
        for (i = 0; i< circles.length; i++){
            circ = document.createElement("circle");
            svg.appendChild(circ);
            circ.setAttribute('cx', circles[i].x - svg.offsetLeft);
            circ.setAttribute('cy', circles[i].y - svg.offsetTop);
            circ.setAttribute('stroke', circles[i].stroke);
            circ.setAttribute('r', Math.abs(circles[i].rx));
            circ.setAttribute('stroke-width', circles[i].line);
            circ.setAttribute('fill', circles[i].fill);
        }

    if (ellipses.length != null)
        for (i = 0; i< ellipses.length; i++){
            ell = document.createElement("ellipse");
            svg.appendChild(ell);
            ell.setAttribute('cx', ellipses[i].x - svg.offsetLeft);
            ell.setAttribute('cy', ellipses[i].y - svg.offsetTop);
            ell.setAttribute('ry', ellipses[i].rx - svg.offsetLeft);
            ell.setAttribute('rx', ellipses[i].ry - svg.offsetTop);
            ell.setAttribute('stroke', ellipses[i].stroke);
            ell.setAttribute('stroke-width', ellipses[i].line);
            ell.setAttribute('fill', ellipses[i].fill);
        }

    if(triangles.length != null)
        for (i = 0; i< triangles.length; i++){
            tr = document.createElement("polygon");
            svg.appendChild(tr);
            x1 = triangles[i].lastMouseX -svg.offsetLeft;
            y1 = triangles[i].lastMouseY - svg.offsetTop;
            x2 = triangles[i].mouseX - svg.offsetLeft;
            y2 = triangles[i].mouseY - svg.offsetTop;
            x3 = triangles[i].mouseY - svg.offsetLeft;
            y3 = triangles[i].mouseX - svg.offsetTop;
            tr.setAttribute('points', x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3);
            tr.setAttribute('stroke', triangles[i].stroke);
            tr.setAttribute('stroke-width', ellipses[i].line);
            tr.setAttribute('fill', triangles[i].fill);
        }
    
    if(lines.length != null)
        for (i = 0; i< lines.length; i++){
            ln = document.createElement("line");
            svg.appendChild(ln);
            ln.setAttribute('x1', lines[i].x1 - svg.offsetLeft);
            ln.setAttribute('x2', lines[i].x2 - svg.offsetLeft);
            ln.setAttribute('y1', lines[i].y1 - svg.offsetTop);
            ln.setAttribute('y2', lines[i].y2 - svg.offsetTop);
            ln.setAttribute('stroke', lines[i].stroke);
            ln.setAttribute('stroke-width', lines[i].line);
            ln.setAttribute('fill', lines[i].fill);
        }

}

function createFigList() {
    parent = document.getElementById('figuri');
    if (rectangles.length != null)
        for (i = 0; i< rectangles.length; i++){
            rect = document.createElement('canvas');
            parent.appendChild(rect);
            rect.width = 150;
            rect.height = 150;
            rectCtx = rect.getContext('2d');
        }

    if (squares.length != null)
        for (i = 0; i< squares.length; i++){
            sq = document.createElement('canvas');
            parent.appendChild(sq);
            sq.width = 150;
            sq.height = 150;
            sqCtx = sq.getContext('2d');
            
        }

    if (circles.length != null)
        for (i = 0; i< circles.length; i++){
            circ = document.createElement("canvas");
            parent.appendChild(circ);
            circ.width = 150;
            circ.height = 150;
            circCtx = circ.getContext('2d');
        }

    if (ellipses.length != null)
        for (i = 0; i< ellipses.length; i++){
            ell = document.createElement("canvas");
            parent.appendChild(ell);
            ell.width = 150;
            ell.height = 150;
            ellCtx = ell.getContext('2d');
        }

    if(triangles.length != null)
        for (i = 0; i< triangles.length; i++){
            tr = document.createElement("canvas");
            parent.appendChild(tr);
            tr.width = 150;
            tr.height = 150;
            trCtx = tr.getContext('2d');
            
        }

    if(lines.length != null)
        for (i = 0; i< lines.length; i++){
            ln = document.createElement("canvas");
            parent.appendChild(ln);
            ln.width = 150;
            ln.height = 150;
            lnCtx = ln.getContext('2d');
        
        }
}

function showList() {
    nrList++;
    if (nrList % 2 == 0) {
       document.getElementById('figuri').style.display = "none";
    }
    else {
       createFigList();
    }
}

function buttonEvents () {
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

    btnLista = document.getElementById('lista');
    btnLista.addEventListener('click', showList);
    //nu uita de butonul de fill shape
}

function aplicatie() {
    nr = nrBrush = nrShapes = nrSave = nrList = 0;
    pixelColor = "#000000";
    bgPixel = "white";
    //color-picker canvas
    canvas = document.getElementById("picker");
    ctx = canvas.getContext("2d");

    //drawing canvas
    drawingCanvas = document.getElementById("drawing-canvas");
    drawCtx = drawingCanvas.getContext("2d");
    drawingCanvas.height = 600;
    drawingCanvas.width = window.innerWidth * 0.6;

    //temporary canvas
    container = drawingCanvas.parentNode;
    tempCanvas = document.createElement('canvas');
    tempCanvas.id = 'imageTemp';
    tempCanvas.width = drawingCanvas.width;
    tempCanvas.height = drawingCanvas.height;
    container.appendChild(tempCanvas);
    tempCtx = tempCanvas.getContext('2d');

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

    buttonEvents();
}

document.addEventListener("DOMContentLoaded", aplicatie);
