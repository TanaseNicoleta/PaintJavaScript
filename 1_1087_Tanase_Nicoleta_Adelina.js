//Grosime linie
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
//Alegere culoare(linie si background)
function getPixelColor() {
    pixel = color.value;
    return pixel;
}

function selectColor() {
    nr++;
    if (nr % 2 == 0) {
        document.getElementById('picker').style.display = "none";
        color.addEventListener('click', function() {
            tempCtx.strokeStyle = color.value;
        });
    } else {
        document.getElementById('picker').style.display = "block";
        color.addEventListener('click', function() {
            tempCtx.strokeStyle = color.value;
        });
    }
}

function colorBg() {
    selectColor();
    color.addEventListener('click', function() {
        bgPixel = color.value;
        tempCtx.fillStyle = bgPixel;
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        drawCtx.fillStyle = bgPixel;
        drawCtx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    }); 
}

//Alegere si desenare cu forme
function selectShape() {
    shapeSelection = document.querySelector(".shapes-wrapper");
    nrShapes++;
    if (nrShapes % 2 == 0) {
        shapeSelection.style.display = "none";
    } else {
        shapeSelection.style.display = "block";
        drawing = false;
        square = document.getElementById("square");
        circle = document.getElementById("circle");
        ellipse = document.getElementById("ellipse");
        triangle = document.getElementById("triangle");
        dreptungi = document.getElementById("dreptungi");
        linie = document.getElementById("linie");

        square.addEventListener('click', selectSquare);
        circle.addEventListener('click', selectCircle);
        ellipse.addEventListener('click', selectEllipse);
        triangle.addEventListener('click', selectTriangle);
        dreptungi.addEventListener('click', selectDreptunghi);
        linie.addEventListener('click', selectLinie);

    }
}

function selectSquare() {
    w = h = 0;
    tempCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = e.clientX - canvasX;
        lastMouseY = e.clientY - canvasY;
        drawing = true;
    });

    tempCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        img = document.createElement('img');
        img.setAttribute('id', 'square ' + itSquare);
        parent.appendChild(img);
        ids.push(img.id);
        setupCanvas();
        squaresTemp.push({id: 'square ' + itSquare, x: lastMouseX, y:lastMouseY, width: Math.abs(w), stroke: tempCtx.strokeStyle, fill: "none", line: tempCtx.lineWidth});
        squares.push(squaresTemp.pop());
        itSquare++;
    });

    tempCanvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            mouseX = e.clientX - canvasX;
            mouseY = e.clientY - canvasY;
            w = Math.abs(mouseX - lastMouseX);
            h = Math.abs(mouseY - lastMouseY);
            tempCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            tempCtx.save();
            tempCtx.beginPath();
            tempCtx.strokeRect(lastMouseX, lastMouseY, w, w);       
        } 
    });


}

function selectCircle() {
    raza = 0;
    tempCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = e.clientX - canvasX;
        lastMouseY = e.clientY - canvasY;
        drawing = true;
    });
    tempCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        img = document.createElement('img');
        img.setAttribute('id', 'circle ' + itCircle);
        parent.appendChild(img);
        ids.push(img.id);
        setupCanvas();
        circlesTemp.push({id: 'circle ' + itCircle, x: lastMouseX, y:lastMouseY, rx:raza, ry: raza, stroke: tempCtx.strokeStyle, fill: "none", line: tempCtx.lineWidth});
        circles.push(circlesTemp.pop());
        itCircle++;
    });

    tempCanvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            tempCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            tempCtx.save();
            tempCtx.beginPath();
            mouseX = e.clientX - canvasX;
            mouseY = e.clientY - canvasY;
            raza = Math.abs(mouseY-lastMouseY);
            tempCtx.arc(lastMouseX, lastMouseY, raza, 0, 2 * Math.PI, false);
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
        img = document.createElement('img');
        img.setAttribute('id', 'ellipse ' + itEllipse);
        parent.appendChild(img);
        ids.push(img.id);
        setupCanvas();
        ellipsesTemp.push({id: 'ellipse ' + itEllipse, x: centerX, y:centerY, rx:  Math.abs(scaleX), ry:  Math.abs(scaleY), stroke: tempCtx.strokeStyle, fill: "none", line: tempCtx.lineWidth});
        ellipses.push(ellipsesTemp.pop());
        itEllipse++;
    });

    tempCanvas.addEventListener('mousemove', function (e) {
        mouseX = parseInt(e.clientX - canvasX);
        mouseY = parseInt(e.clientY - canvasY);
        if (drawing) {
            tempCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            tempCtx.save();
            tempCtx.beginPath();
           
            scaleX = Math.abs((lastMouseX - mouseX) / 2);
            scaleY = Math.abs((lastMouseY - mouseY) / 2);
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
        lastMouseX = e.clientX - canvasX;
        lastMouseY = e.clientY - canvasY;
        drawing = true;
    });

    tempCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        img = document.createElement('img');
        img.setAttribute('id', 'triangle ' + itTriangle);
        parent.appendChild(img);
        ids.push(img.id);
        setupCanvas();
        trianglesTemp.push({id: 'triangle ' + itTriangle, x1: lastMouseX, y1: lastMouseY, x2: mouseX, y2: mouseY, stroke: tempCtx.strokeStyle, fill: "none", line: tempCtx.lineWidth });  
        triangles.push(trianglesTemp.pop());
        itTriangle++;
    });

    tempCanvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            tempCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            tempCtx.save();
            tempCtx.beginPath();
            mouseX = e.clientX - canvasX;
            mouseY = e.clientY - canvasY;
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
        lastMouseX = e.clientX - canvasX;
        lastMouseY = e.clientY - canvasY;
        drawing = true;
    });

    tempCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        img = document.createElement('img');
        img.setAttribute('id', 'rectangle ' + itRect);
        parent.appendChild(img);
        ids.push(img.id);
        setupCanvas();
        rectanglesTemp.push({id: 'rectangle ' + itRect, x: lastMouseX, y:lastMouseY, width: Math.abs(w),  height: Math.abs(h), stroke: tempCtx.strokeStyle, fill: "none", line: tempCtx.lineWidth});
        rectangles.push(rectanglesTemp.pop());
    });

    tempCanvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            mouseX = e.clientX - canvasX;
            mouseY = e.clientY - canvasY;
            w = Math.abs(mouseX - lastMouseX);
            h = Math.abs(mouseY - lastMouseY);
            tempCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            tempCtx.save();
            tempCtx.beginPath();
            tempCtx.strokeRect(lastMouseX, lastMouseY, w, h);    
        } 
    });
}

function selectLinie() {
    tempCanvas.addEventListener('mousedown', function (e) {
        lastMouseX = e.clientX - canvasX;
        lastMouseY = e.clientY - canvasY;
        drawing = true;
    });

    tempCanvas.addEventListener('mouseup', function (e) {
        drawing = false;
        img = document.createElement('img');
        img.setAttribute('id', 'line ' + itLine);
        parent.appendChild(img);
        ids.push(img.id);
        setupCanvas();
        linesTemp.push({id: 'line ' + itLine, x1: lastMouseX, y1: lastMouseY, x2: mouseX, y2: mouseY, stroke: tempCtx.strokeStyle, fill: "none", line: tempCtx.lineWidth});
        lines.push(linesTemp.pop());
        itLine++;

    });

    tempCanvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            tempCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            tempCtx.save();
            tempCtx.beginPath();
            mouseX = e.clientX - canvasX;
            mouseY = e.clientY - canvasY;
            tempCtx.moveTo(lastMouseX, lastMouseY);
            tempCtx.lineTo(mouseX, mouseY);
            tempCtx.stroke();
            tempCtx.restore();   
        }
       });
}

function setupCanvas() {
    drawCtx.drawImage(tempCanvas, 0, 0);
    appendFig();
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
}

//Lista figuri existente
function appendFig() { 
    img.setAttribute('class', 'figure');
    img.src = tempCanvas.toDataURL('image/jpg');
    img.style.width = "150px";
    img.style.height = "auto";
}

function showList() {
    nrList++;
    ids = [];
    if (nrList % 2 == 0) {
       document.getElementById('figuri').style.display = "none";
       if( document.getElementById("detalii").style.display == "block")
        document.getElementById("detalii").style.display = "none"; 
    }
    else {
        document.getElementById('figuri').style.display = "block";
        figureElem = document.getElementsByClassName('figure');
        if(figureElem.length != null){
            for(i =0 ; i< figureElem.length ; i++) { 
                figureElem[i].addEventListener('click', function() {
                    changeElem(this.id);
                });
            }
        }
    }
}

//Modificare/stergere elemente  
function openDetails(x, y, w, h) {
    document.getElementById('detalii').style.display = "block";
    document.getElementById('tip').value = tip;
    document.getElementById('x').value = x;
    document.getElementById('y').value = y;
    document.getElementById('w').value = w;
    document.getElementById('h').value = h;
}

function changeElem(id) {
    nrElem++;
    line = 0;
    if (nrElem % 2 == 0) {
        document.getElementById("detalii").style.display = "none"; 
    }else 
    {
        k = parseInt(id.toString().slice(-1));
        if(id.toString().includes('circle')) {
            tip = circles[k].id;
            x = circles[k].x;
            y = circles[k].y;
            w = circles[k].rx;
            h = circles[k].ry;
            line = circles[k].line;
            openDetails(x, y, w, h);
        }

        if(id.toString().includes('ellipse')) {
            tip = ellipses[k].id;
            x = ellipses[k].x;
            y = ellipses[k].y;
            w = ellipses[k].rx;
            h = ellipses[k].ry;
            line = ellipses[k].line;
            openDetails(x, y, w, h);
        }

        if(id.toString().includes('square')) { 
            tip = squares[k].id;
            x = squares[k].x;
            y = squares[k].y;
            w = squares[k].width;
            h = squares[k].width;
            line = squares[k].line;
            openDetails(x, y, w, h);
        }

        if(id.toString().includes('rectangle')) { 
            tip = rectangles[k].id;
            x = rectangles[k].x;
            y = rectangles[k].y;
            w = rectangles[k].width;
            h = rectangles[k].height;
            line = rectangles[k].line;
            openDetails(x, y, w, h);
        }
        
        if(id.toString().includes('triangle')) { 
            tip = triangles[k].id;
            x = triangles[k].x1;
            y = triangles[k].y1;
            w = triangles[k].x2;
            h = triangles[k].y2;
            line = triangles[k].line;
            openDetails(x, y, w, h);
        }

        if(id.toString().includes('line')) { 
            tip = lines[k].id;
            x = lines[k].x1;
            y = lines[k].y1;
            w = lines[k].x2;
            h = lines[k].y2;
            line = lines[k].line;
            openDetails(x, y, w, h);
        }

        btnDelete = document.getElementById('delete');
        btnDelete.addEventListener('click', function() {
            deleteElement(id);
            document.getElementById(id).remove();
            // document.getElementById("detalii").style.display = "none";  
            // nrElem--;
        });

        btnChange = document.getElementById('change');
        btnChange.addEventListener('click', function () {
            updateElem(id);
        });

    }
}

function reDraw () {
    drawCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    // drawCtx.fillStyle = bgPixel;
    // drawCtx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    for(i =0 ; i<rectangles.length ; i++){
        drawCtx.beginPath();
        drawCtx.strokeStyle = rectangles[i].stroke;
        drawCtx.lineWidth = rectangles[i].line;
        drawCtx.strokeRect(rectangles[i].x, rectangles[i].y, rectangles[i].width, rectangles[i].height);
        drawCtx.stroke();
    }

    for(i =0 ; i<squares.length ; i++){
        drawCtx.beginPath();
        drawCtx.strokeStyle = squares[i].stroke;
        drawCtx.lineWidth = squares[i].line;
        drawCtx.strokeRect(squares[i].x, squares[i].y, squares[i].width, squares[i].width);
        drawCtx.stroke();
    }

    for(i =0 ; i<circles.length ; i++){
        drawCtx.beginPath();
        drawCtx.strokeStyle = circles[i].stroke;
        drawCtx.lineWidth = circles[i].line;
        drawCtx.arc(circles[i].x, circles[i].y, circles[i].rx, 0, 2 * Math.PI, false);
        drawCtx.stroke();
    }

    for(i =0 ; i<ellipses.length ; i++){
        drawCtx.beginPath();
        drawCtx.strokeStyle = ellipses[i].stroke;
        drawCtx.lineWidth = ellipses[i].line;
        drawCtx.ellipse(ellipses[i].x, ellipses[i].y, ellipses[i].rx, ellipses[i].ry, 0, 2 * Math.PI, false);
        drawCtx.stroke();
    }

    for(i =0 ; i<triangles.length ; i++){
        drawCtx.beginPath();
        drawCtx.strokeStyle = triangles[i].stroke;
        drawCtx.lineWidth = triangles[i].line;
        drawCtx.moveTo(triangles[i].x1, triangles[i].y1);
        drawCtx.lineTo(triangles[i].x2, triangles[i].y2);
        drawCtx.lineTo(triangles[i].y2, triangles[i].x2);
        drawCtx.closePath();
        drawCtx.stroke();
    }

    for(i =0 ; i<lines.length ; i++){
        drawCtx.beginPath();
        drawCtx.strokeStyle = lines[i].stroke;
        drawCtx.lineWidth = lines[i].line;
        drawCtx.moveTo(lines[i].x1, lines[i].y1);
        drawCtx.lineTo(lines[i].x2, lines[i].y2);
        drawCtx.stroke();
    }

}

function updateElem(id) {
    if(circles != null)
        for(k = 0; k<circles.length; k++){
            if(circles[k].id.includes(document.getElementById('tip').value)) {
                if(parseFloat(document.getElementById('x').value) != circles[k].x)
                    circles[k].x = parseFloat(document.getElementById('x').value);
                if(parseFloat(document.getElementById('y').value) != circles[k].y)
                    circles[k].y = parseFloat(document.getElementById('y').value);
                if(parseFloat(document.getElementById('w').value) != circles[k].rx)
                    circles[k].rx = parseFloat(document.getElementById('w').value);
                if(parseFloat(document.getElementById('h').value) != circles[k].ry)
                    circles[k].ry = parseFloat(document.getElementById('h').value);    
            }
        }

    if (ellipses.length != null)
        for (k = 0; k< ellipses.length; k++){
            if(ellipses[k].id.includes(document.getElementById('tip').value)) {
                if(parseFloat(document.getElementById('x').value) != ellipses[k].x)
                    ellipses[k].x = parseFloat(document.getElementById('x').value);
                if(parseFloat(document.getElementById('y').value) != ellipses[k].y)
                    ellipses[k].y = parseFloat(document.getElementById('y').value);
                if(parseFloat(document.getElementById('w').value) != ellipses[k].rx)
                    ellipses[k].rx = parseFloat(document.getElementById('w').value);
                if(parseFloat(document.getElementById('h').value) != ellipses[k].ry)
                    ellipses[k].ry = document.getElementById('h').value;
            }
        }

    if (squares.length != null)
        for (k = 0; k< squares.length; k++){
            if(squares[k].id.includes( document.getElementById('tip').value)) { 
                if(parseFloat(document.getElementById('x').value) != squares[k].x)
                    squares[k].x = parseFloat(document.getElementById('x').value);
                if(parseFloat(document.getElementById('y').value) != squares[k].y)
                    squares[k].y = parseFloat(document.getElementById('y').value);
                if(parseFloat(document.getElementById('h').value) != squares[k].width || parseFloat(document.getElementById('w').value) != squares[k].width)
                    squares[k].width = parseFloat(document.getElementById('w').value);
            }
        }
    if (rectangles.length != null){
        for (k = 0; k< rectangles.length; k++)
            if(rectangles[k].id.includes( document.getElementById('tip').value)) { 
                if(parseFloat(document.getElementById('x').value) != rectangles[k].x)
                    rectangles[k].x = parseFloat(document.getElementById('x').value);
                if(parseFloat(document.getElementById('y').value) != rectangles[k].y)
                    rectangles[k].y = parseFloat(document.getElementById('y').value);
                if(parseFloat(document.getElementById('w').value) != rectangles[k].height) 
                    rectangles[k].width = parseFloat(document.getElementById('w').value);
                if(parseFloat(document.getElementById('h').value) != rectangles[k].width)
                    rectangles[k].height = parseFloat(document.getElementById('h').value);
            }
    }

    if(triangles.length != null)
        for (k = 0; k< triangles.length; k++){
            if(triangles[k].id.includes( document.getElementById('tip').value)) {
                if(parseFloat(document.getElementById('x').value) != triangles[k].x1) 
                    triangles[k].x1 = parseFloat(document.getElementById('x').value);
                if(parseFloat(document.getElementById('y').value) != triangles[k].y1)
                    triangles[k].y1 = parseFloat(document.getElementById('y').value);
                if(parseFloat(document.getElementById('w').value) != triangles[k].x2) 
                    triangles[k].x2 = parseFloat(document.getElementById('w').value);
                if(parseFloat(document.getElementById('h').value) != triangles[k].y2) 
                    triangles[k].y2 = parseFloat(document.getElementById('h').value);
            }
        }

    if(lines.length != null)
        for (k = 0; k< lines.length; k++){
            if(lines[k].id.includes( document.getElementById('tip').value)) { 
                if(parseFloat(document.getElementById('x').value) != lines[k].x1)
                    lines[k].x1 = parseFloat(document.getElementById('x').value);
                if(parseFloat(document.getElementById('y').value) != lines[k].y1)
                    lines[k].y1 = parseFloat(document.getElementById('y').value);
                if(parseFloat(document.getElementById('w').value) != lines[k].x2)
                lines[k].x2 = parseFloat(document.getElementById('w').value);
                if(parseFloat(document.getElementById('h').value) != lines[k].y2)
                lines[k].y2 = parseFloat(document.getElementById('h').value);
            }
        }

    reDraw();
}

function removeEl(array) {
    for(i=0;i<array.length;i++)
        if((array[i].x == x && array[i].y == y) || (array[i].x1 == x && array[i].y1) || (array[i].lastMouseX == x && array[i].lastMouseY == y)){
            for(j=i+1 ; j<array.length ; j++){ 
                array[j-1] = array[j];
            }
            array.length--;
        }
}

function deleteElement(id) {
    if(id.toString().includes('rectangle')){  
       removeEl(rectangles);
    }
    if(id.toString().includes('square')){  
        removeEl(squares);
    }
    if(id.toString().includes('circle')){  
        removeEl(circles);
    }
    if(id.toString().includes('ellipse')){  
       removeEl(ellipses);
    }
    if(id.toString().includes('triangle')){  
        removeEl(triangles);
    }
    if(id.toString().includes('line')){  
        removeEl(lines);
    }
    reDraw();
}

//Salvare imagine
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
    svgText = svgText.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet"');
    svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    svgUrl = URL.createObjectURL(svgBlob);

    downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "image.svg";
    downloadLink.click();

}

function canvasToSVG() {
    svg.innerHTML = "";
    svg.width = drawingCanvas.width;
    svg.height = drawingCanvas.height;
    svg.style.backgroundColor = drawCtx.fillStyle;
    svg.style.marginLeft = drawingCanvas.offsetLeft;
    svg.style.marginTop = drawingCanvas.offsetTop;

    if (rectangles.length != null)
        for (i = 0; i< rectangles.length; i++){
            rect = document.createElement('rect');
            path = document.createElement('path');
            svg.appendChild(path);
            svg.appendChild(rect);
            path.setAttribute('d', 'M' + rectangles[i].x + " " +  rectangles[i].y);
            rect.setAttribute('width', Math.abs(rectangles[i].width));
            rect.setAttribute('height', Math.abs(rectangles[i].height));
            rect.setAttribute('stroke', rectangles[i].stroke);
            rect.setAttribute('stroke-width', rectangles[i].line);
            rect.setAttribute('fill', rectangles[i].fill);
            rect.setAttribute('x', rectangles[i].x);
            rect.setAttribute('y', rectangles[i].y);
        }

    if (squares.length != null)
        for (i = 0; i< squares.length; i++){
            sq = document.createElement('rect');
            path = document.createElement('path');
            svg.appendChild(path);
            svg.appendChild(sq);
            path.setAttribute('d', 'M' + squares[i].x + " " +  squares[i].y);
            sq.setAttribute('width', Math.abs(squares[i].width));
            sq.setAttribute('height', Math.abs(squares[i].width));
            sq.setAttribute('x', squares[i].x);
            sq.setAttribute('y', squares[i].y);
            sq.setAttribute('stroke', squares[i].stroke);
            sq.setAttribute('stroke-width', squares[i].line);
            sq.setAttribute('fill', squares[i].fill);
        }

    if (circles.length != null)
        for (i = 0; i< circles.length; i++){
            circ = document.createElement("circle");
            path = document.createElement('path');
            svg.appendChild(path);
            svg.appendChild(circ);
            path.setAttribute('d', 'M' + circles[i].x + " " +  circles[i].y);
            circ.setAttribute('cx', circles[i].x);
            circ.setAttribute('cy', circles[i].y);
            circ.setAttribute('stroke', circles[i].stroke);
            circ.setAttribute('r', Math.abs(circles[i].rx));
            circ.setAttribute('stroke-width', circles[i].line);
            circ.setAttribute('fill', circles[i].fill);
        }

    if (ellipses.length != null)
        for (i = 0; i< ellipses.length; i++){
            ell = document.createElement("ellipse");
            path = document.createElement('path');
            svg.appendChild(path);
            svg.appendChild(ell);
            path.setAttribute('d', 'M' + ellipses[i].x + " " +  ellipses[i].y);
            ell.setAttribute('cx', ellipses[i].x);
            ell.setAttribute('cy', ellipses[i].y);
            ell.setAttribute('ry', Math.abs(ellipses[i].rx));
            ell.setAttribute('rx', Math.abs(ellipses[i].ry));
            ell.setAttribute('stroke', ellipses[i].stroke);
            ell.setAttribute('stroke-width', ellipses[i].line);
            ell.setAttribute('fill', ellipses[i].fill);
        }

    if(triangles.length != null)
        for (i = 0; i< triangles.length; i++){
            tr = document.createElement("polygon");
            path = document.createElement('path');
            svg.appendChild(path);
            svg.appendChild(tr);
            x1 = triangles[i].lastMouseX;
            y1 = triangles[i].lastMouseY;
            x2 = triangles[i].mouseX;
            y2 = triangles[i].mouseY;
            path.setAttribute('d', 'M' + x1 + " " +  y1 + 'L' + x2 + " " + y2);
            tr.setAttribute('points', x1 + "," + y1 + " " + x2 + "," + y2 + " " + y2 + "," + x2);
            tr.setAttribute('stroke', triangles[i].stroke);
            tr.setAttribute('stroke-width', triangles[i].line);
            tr.setAttribute('fill', triangles[i].fill);
        }
    
    if(lines.length != null)
        for (i = 0; i< lines.length; i++){
            ln = document.createElement("line");
            path = document.createElement('path');
            svg.appendChild(path);
            svg.appendChild(ln);
            path.setAttribute('d', 'M' + lines[i].x1 + " " +  lines[i].y1 + 'L' + lines[i].x2 + " " + lines[i].y2);
            ln.setAttribute('x1', lines[i].x1);
            ln.setAttribute('x2', lines[i].x2);
            ln.setAttribute('y1', lines[i].y1);
            ln.setAttribute('y2', lines[i].y2);
            ln.setAttribute('stroke', lines[i].stroke);
            ln.setAttribute('stroke-width', lines[i].line);
            ln.setAttribute('fill', lines[i].fill);
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

}

function aplicatie() {
    nr = nrBrush = nrShapes = nrSave = nrList = nrElem = 0;
    itTriangle = itCircle = itEllipse = itPencil = itRect = itLine = itSquare = 0;                    
    tip = ks = "";
    k=0;
    x = y = w = h = 0;
    pos = 0;

    pixelColor = "#000000";
    bgPixel = "white";
    //color-picker
    color = document.getElementById('picker');

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

    parent = document.getElementById('figuri');

    canvasX = drawingCanvas.getBoundingClientRect().left;
    canvasY = drawingCanvas.getBoundingClientRect().top;
    lastMouseX = lastMouseY = 0;
    mouseX = mouseY = 0;
    centerX = centerY = 0;
    drawing = false;

    circles = circlesTemp = [];
    ellipses = ellipsesTemp = [];
    squares = squaresTemp =[];
    rectangles = rectanglesTemp = [];
    triangles = trianglesTemp = [];
    lines = linesTemp = [];
    ids = [];

    buttonEvents();

    console.log(rectangles);
    console.log(squares);
    console.log(circles);
    console.log(ellipses);
    console.log(triangles);

}

document.addEventListener("DOMContentLoaded", aplicatie);
