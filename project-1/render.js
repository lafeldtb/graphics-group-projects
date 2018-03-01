/**
 * Created by Hans Dulimarta.
 * Edited by Benjamin LaFeldt
 */

let canvas;
let gl;
let allObjs = [];

let projUnif;
let projMat, viewMat, tower, library, target;

function main() {
  canvas = document.getElementById("my-canvas");

  /* setup window resize listener */
  window.addEventListener('resize', resizeWindow);

  setupHandlers();

  gl = WebGLUtils.create3DContext(canvas, null);
  ShaderUtils.loadFromFile(gl, "vshader.glsl", "fshader.glsl")
  .then (prog => {

    /* put all one-time initialization logic here */
    gl.useProgram (prog);
    gl.clearColor (0, 0, 0, 1);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.cullFace(gl.BACK);

    /* the vertex shader defines TWO attribute vars and ONE uniform var */
    let posAttr = gl.getAttribLocation (prog, "vertexPos");
    let colAttr = gl.getAttribLocation (prog, "vertexCol");
    Object3D.linkShaderAttrib({
      positionAttr: posAttr,
      colorAttr: colAttr
    });
    let modelUnif = gl.getUniformLocation (prog, "modelCF");
    projUnif = gl.getUniformLocation (prog, "projection");
    viewUnif = gl.getUniformLocation (prog, "view");
    Object3D.linkShaderUniform({
      projection: projUnif,
      view: viewUnif,
      model: modelUnif
    });
    gl.enableVertexAttribArray (posAttr);
    gl.enableVertexAttribArray (colAttr);
    projMat = mat4.create();
    gl.uniformMatrix4fv (projUnif, false, projMat);
      viewMat = mat4.lookAt(mat4.create(),
          vec3.fromValues (0, 2.15, 1.75),  // eye coord
          vec3.fromValues (-1, 0, 1),  // gaze point
          vec3.fromValues (0, 0, 1)   // Z is up
      );
      gl.uniformMatrix4fv (viewUnif, false, viewMat);

      target = viewMat;
    /* recalculate new viewport */
    resizeWindow();

    createObject();

    /* initiate the render request */
    window.requestAnimFrame(drawScene);
  });
}

function drawScene() {
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    gl.uniformMatrix4fv (viewUnif, false, viewMat);

    /* in the following three cases we rotate the coordinate frame by 1 degree */
    for (let k = 0; k < allObjs.length; k++)
        allObjs[k].draw(gl);
}

function createObject() {
    tower = new ClockTower(gl);
    library = new GVLibrary(gl);
    let ax = new Axes(gl);
    allObjs.push(ax);
    allObjs.push(tower);
    allObjs.push(library);

    mat4.scale(tower.coordFrame, tower.coordFrame, vec3.fromValues(0.15, 0.15, 0.15));
    mat4.translate(tower.coordFrame, tower.coordFrame, vec3.fromValues(5, -7, -3));
    mat4.translate(library.coordFrame, library.coordFrame, vec3.fromValues(-6, 0, 0));
    mat4.rotateZ(library.coordFrame, library.coordFrame, glMatrix.toRadian(225));

}

function resizeWindow() {
  let w = window.innerWidth - 16;
  let h = 0.75 * window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  mat4.perspective (projMat, glMatrix.toRadian(60), w/h, 0.05, 20);
  gl.uniformMatrix4fv (projUnif, false, projMat);
  gl.viewport(0, 0, w, h);
}

function setupHandlers() {
    window.addEventListener('keydown', event => {
        let key = String.fromCharCode(event.keyCode);
        let position = mat4.create();
        switch(key) {
            case 'W':
                //Move forward
                //Translate along the Z axis of viewMat
                mat4.fromTranslation(position, vec3.fromValues(0, 0, 0.1));
                mat4.multiply(target, position, target);
                window.requestAnimationFrame(drawScene);
                break;
            case 'S':
                //Move backward
                //Translate along the Z axis of viewMat
                mat4.fromTranslation(position, vec3.fromValues(0, 0, -0.1));
                mat4.multiply(target, position, target);
                window.requestAnimationFrame(drawScene);
                break;
            case 'I':
                //Pitch +
                //Rotate along X axis of viewMat
                mat4.fromXRotation(position, 2*Math.PI/100);
                mat4.multiply(target, position, target);
                window.requestAnimFrame(drawScene);
                break;
            case 'K':
                //Pitch -
                //Rotate along X axis of viewMat
                mat4.fromXRotation(position, -(2*Math.PI/100));
                mat4.multiply(target, position, target);
                window.requestAnimFrame(drawScene);
                break;
            case 'A':
                //Roll Left
                //Rotate along z axis of viewMat
                mat4.fromZRotation(position, -(2*Math.PI/100));
                mat4.multiply(target, position, target);
                window.requestAnimFrame(drawScene);
                break;
            case 'D':
                //Roll Right
                //Rotate along z axis of viewMat
                mat4.fromZRotation(position, 2*Math.PI/100);
                mat4.multiply(target, position, target);
                window.requestAnimFrame(drawScene);
                break;
            case 'J':
                //Yaw Left
                //Rotate along y axis of viewMat
                mat4.fromYRotation(position, -(2*Math.PI/100));
                mat4.multiply(target, position, target);
                window.requestAnimFrame(drawScene);
                break;
            case 'L':
                //Yaw Right
                //Rotate along y axis of viewMat
                mat4.fromYRotation(position, 2*Math.PI/100);
                mat4.multiply(target, position, target);
                window.requestAnimFrame(drawScene);
                break;
            case '1':
                //Interesting point 1
                viewMat = mat4.lookAt(mat4.create(),
                    vec3.fromValues (0, 2.15, 1.75),  // eye coord
                    vec3.fromValues (-1, 0, 1),  // gaze point
                    vec3.fromValues (0, 0, 1)   // Z is up
                );
                gl.uniformMatrix4fv (viewUnif, false, viewMat);
                window.requestAnimationFrame(drawScene);
                break;
            case '2':
                //Interesting point 2
                viewMat = mat4.lookAt(mat4.create(),
                    vec3.fromValues (-2.5, -6, 1.75),  // eye coord
                    vec3.fromValues (-1, 0, -0.75),  // gaze point
                    vec3.fromValues (0, 0, 1)   // Z is up
                );
                gl.uniformMatrix4fv (viewUnif, false, viewMat);
                window.requestAnimationFrame(drawScene);
                break;
            case '3':
                //Interesting point 3
                viewMat = mat4.lookAt(mat4.create(),
                    vec3.fromValues (1.5, -1.5, 1),  // eye coord
                    vec3.fromValues (0, -1, 0.85),  // gaze point
                    vec3.fromValues (0, 0, 1)   // Z is up
                );
                gl.uniformMatrix4fv (viewUnif, false, viewMat);
                window.requestAnimationFrame(drawScene);
                break;


        }
    });
    let objSelect = document.getElementById('objSelect');
    objSelect.addEventListener('change', event => {
        switch(event.target.value) {
            case 'camera':
                console.log("camera selected");
                target = viewMat;
                break;
            case 'clock':
                console.log("clock selected");
                target = tower.coordFrame;
                break;
            case 'lib':
                console.log("lib selected");
                target = library.coordFrame;
                break;
        }

    })
}
