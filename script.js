let fileInput = document.getElementById("file-upload-input");
let fileSelect = document.getElementsByClassName("file-upload-select")[0];
let canvas = new fabric.Canvas('canvas');

fileInput.addEventListener("change", function (e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function (f) {
        let data = f.target.result;
        console.log(data);
        fabric.Image.fromURL(data, function (img) {
            console.log(img);
            let oImg = img.set({ left: 0, top: 0, angle: 0 }).scale(0.9);
            oImg.scaleToWidth(1150);
            oImg.scaleToHeight(550);
            canvas.clear();
            canvas.add(oImg);
            canvas.centerObject(oImg);
            canvas.setActiveObject(oImg);
            canvas.renderAll();
            canvas.toDataURL({ format: 'png', quality: 0.8 });
            console.log(canvas);
        });
    };
    reader.readAsDataURL(file);
});

canvas.on('mouse:wheel', function (opt) {
    let target = canvas.findTarget(opt);
    console.log(target);
    let delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 1) zoom = 1;
    if (zoom === 1)
        canvas.setViewportTransform([1,0,0,1,0,0]); 
    else
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
});

fileSelect.onclick = function() {
	fileInput.click();
}

fileInput.onchange = function() {
	let filename = fileInput.files[0].name;
	let selectName = document.getElementsByClassName("file-select-name")[0];
	selectName.innerText = filename;
}
