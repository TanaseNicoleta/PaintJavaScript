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
        square = document.getElementById("square");
        circle = document.getElementById("circle");
        ellipse = document.getElementById("ellipse");
        triangle = document.getElementById("triangle");
        dreptungi = document.getElementById("dreptungi");
        linie = document.getElementById("linie");
      
        // square.addEventListener('click', selectSquare);
        circle.addEventListener('click', selectCircle);
        //ellipse.addEventListener('click', selectEllipse);
        //triangle.addEventListener('click', selectTriangle);
        //dreptungi.addEventListener('click', selectDreptunghi);
        //linie.addEventListener('click', selectLinie);

    }
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
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
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


function aplicatie() {
    nr = 0;
    nrBrush = 0;
    nrShapes = 0;

    //color-picker canvas
    canvas = document.getElementById("picker");
    ctx = canvas.getContext("2d");

    //drawing canvas
    drawingCanvas = document.getElementById("drawing-canvas");
    drawCtx = drawingCanvas.getContext("2d");

    btnColors = document.getElementById("colors");
    btnColors.addEventListener('click', drawColorPicker);

    btnBrushes = document.getElementById("brushes");
    btnBrushes.addEventListener('click', selectBrush);

    btnShapes = document.getElementById("shapes");
    btnShapes.addEventListener('click', selectShape);

    btnBgColor = document.getElementById("background");
    btnBgColor.addEventListener('click', colorBg);

   
}

document.addEventListener("DOMContentLoaded", aplicatie);
