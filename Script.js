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
    drawing = false;
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
    canvasX = drawingCanvas.offsetLeft;
    canvasY = drawingCanvas.offsetTop;
    lastMouseX = lastMouseY = 0;
    mouseX = mouseY = 0;
    drawing = false;
    w = h = 0;

    drawingCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
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
            w = (e.pageX - canvasX) - lastMouseX;
            h = (e.pageY - canvasY) - lastMouseY;
            drawCtx.strokeRect(lastMouseX, lastMouseY, w, w);       
        } 
    });
}

function selectCircle() {
    canvasX = drawingCanvas.offsetLeft;
    canvasY = drawingCanvas.offsetTop;
    lastMouseX = lastMouseY = 0;
    mouseX = mouseY = 0;
    drawing = false;

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
           
            var scaleX = 1 * ((mouseX - lastMouseX) / 2);
            var scaleY = 1 * ((mouseY - lastMouseY) / 2);
            drawCtx.scale(scaleX, scaleY);

            var centerX = (lastMouseX / scaleX) + 1;
            var centerY = (lastMouseY / scaleY) + 1;
            drawCtx.arc(centerX, centerY, 1, 0, 2 * Math.PI, false);
            drawCtx.stroke();
            drawCtx.restore();    
        }
        
       });
}

function selectEllipse() {
    canvasX = drawingCanvas.offsetLeft;
    canvasY = drawingCanvas.offsetTop;
    lastMouseX = lastMouseY = 0;
    mouseX = mouseY = 0;
    drawing = false;

    drawingCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
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
    canvasX = drawingCanvas.offsetLeft;
    canvasY = drawingCanvas.offsetTop;
    lastMouseX = lastMouseY = 0;
    mouseX = mouseY = 0;
    drawing = false;

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
            drawCtx.lineTo(mouseY, mouseX);
            drawCtx.closePath();
            drawCtx.stroke();
        }
       });
}

function selectDreptunghi() {
    canvasX = drawingCanvas.offsetLeft;
    canvasY = drawingCanvas.offsetTop;
    lastMouseX = lastMouseY = 0;
    mouseX = mouseY = 0;
    drawing = false;
    w = h = 0;

    drawingCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
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
            w = (e.pageX - canvasX) - lastMouseX;
            h = (e.pageY - canvasY) - lastMouseY;
            drawCtx.strokeRect(lastMouseX, lastMouseY, w, h);       
        } 
    });
}

function selectLinie() {
    canvasX = drawingCanvas.offsetLeft;
    canvasY = drawingCanvas.offsetTop;
    lastMouseX = lastMouseY = 0;
    mouseX = mouseY = 0;
    drawing = false;

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





function aplicatie() {
    nr = 0;
    nrBrush = 0;
    nrShapes = 0;
    nrSave = 0;
    //color-picker canvas
    canvas = document.getElementById("picker");
    ctx = canvas.getContext("2d");

    //drawing canvas
    drawingCanvas = document.getElementById("drawing-canvas");
    drawCtx = drawingCanvas.getContext("2d");
    drawingCanvas.height = window.innerHeight;
    drawingCanvas.width = window.innerWidth * 0.7;

    btnColors = document.getElementById("colors");
    btnColors.addEventListener('click', selectColor);

    btnBrushes = document.getElementById("brushes");
    btnBrushes.addEventListener('click', selectBrush);

    btnShapes = document.getElementById("shapes");
    btnShapes.addEventListener('click', selectShape);

    btnBgColor = document.getElementById("background");
    btnBgColor.addEventListener('click', colorBg);

    btnSave = document.getElementById("save");
    btnSave.addEventListener('click', function() {
        nrSave++;
        if (nrSave % 2 == 0) {
            document.getElementById("saveAs").style.display = "none";
        }else 
        {
            document.getElementById("saveAs").style.display = "block";
        }
    })

   
}

document.addEventListener("DOMContentLoaded", aplicatie);
