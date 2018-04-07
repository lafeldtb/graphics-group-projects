import * as THREE from 'three';
//import Wheel from './models/wheel';
//import ClockTower from './models/clocktower';
// import orbit from 'three-orbit-controls';
// const OrbitControls = orbit(THREE);
import TrackballControls from 'three-trackballcontrols';

export default class App {

  constructor() {
    const c = document.getElementById('mycanvas');
    // Enable antialias for smoother lines
    this.renderer = new THREE.WebGLRenderer({canvas: c, antialias: true});
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 4/3, 0.5, 500);
    this.camera.position.z = 100;

    const testgeo = new THREE.BoxGeometry(10, 10, 10);
    const testmat = new THREE.MeshPhongMaterial({color: 0xccae6e});
    const testmesh = new THREE.Mesh(testgeo, testmat)
    this.scene.add(testmesh);

    //this.target = testmesh
    this.target = this.camera


    //Light
    const lightOne = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    lightOne.position.set(10, 40, 100)
    this.scene.add(lightOne)

    //Light
    const lightTwo = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    lightTwo.position.set(10, -40, -100)
    this.scene.add(lightTwo)


    //Event Handler
    window.addEventListener('resize', () => this.resizeHandler());
    this.resizeHandler();
    requestAnimationFrame(() => this.render());


    window.addEventListener('keydown', event => {
        let key = String.fromCharCode(event.keyCode);
        switch(key) {
            //Vim Controls
            case 'I':
                //Move forward
                this.target.translateZ(-2);
                requestAnimationFrame(() => this.render());
                break;
            case 'K':
                //Move backward
                this.target.translateZ(2);
                requestAnimationFrame(() => this.render());
                break;
            case 'U':
                //Rise
                this.target.translateY(2);
                requestAnimationFrame(() => this.render());
                break;
            case 'O':
                //Fall
                this.target.translateY(-2);
                requestAnimationFrame(() => this.render());
                break;
            case 'J':
                //Move Left
                this.target.translateX(-2);
                requestAnimationFrame(() => this.render());
                break;
            case 'L':
                //Move Right
                this.target.translateX(2);
                requestAnimationFrame(() => this.render());
                break;
            case 'W':
                //Pitch Down
                this.target.rotateX(THREE.Math.degToRad(-2));
                requestAnimationFrame(() => this.render());
                break;
            case 'S':
                //Pitch Up
                this.target.rotateX(THREE.Math.degToRad(2));
                requestAnimationFrame(() => this.render());
                break;
            case 'A':
                //Pan Left
                this.target.rotateY(THREE.Math.degToRad(2));
                requestAnimationFrame(() => this.render());
                break;
            case 'D':
                //Pan Right
                this.target.rotateY(THREE.Math.degToRad(-2));
                requestAnimationFrame(() => this.render());
                break;
            case 'Q':
                //Tilt Left
                this.target.rotateZ(THREE.Math.degToRad(2));
                requestAnimationFrame(() => this.render());
                break;
            case 'E':
                //Tilt Left
                this.target.rotateZ(THREE.Math.degToRad(-2));
                requestAnimationFrame(() => this.render());
                break;


        }
    });

    let objSelect = document.getElementById('objSelect');
    objSelect.addEventListener('change', event => {
        switch(event.target.value) {
            case 'camera':
                this.target = this.camera;
                break;
            case 'testbox':
                this.target = testmesh;
                break;
            case 'light1':
                this.target = lightOne;
                break;
            case 'light2':
                this.target = lightTwo;
                break;
        }

    });

    let light1 = document.getElementById('light1');
    let light2 = document.getElementById('light2');
    light1.addEventListener('change', event => {
        if(event.target.checked) {
            this.scene.add(lightOne);
            requestAnimationFrame(() => this.render());
        } else {
            this.scene.remove(lightOne);
            requestAnimationFrame(() => this.render());
        }
    });
    light2.addEventListener('change', event => {
        console.log(event);
        if(event.target.checked) {
            this.scene.add(lightTwo);
            requestAnimationFrame(() => this.render());
        } else {
            this.scene.remove(lightTwo);
            requestAnimationFrame(() => this.render());
        }
    });


  }

  render() {
    this.renderer.render(this.scene, this.camera);
    //this.tracker.update();
    //this.myWheel.matrix.multiply(this.rotZ1);
    requestAnimationFrame(() => this.render());
  }

  resizeHandler() {
    const canvas = document.getElementById("mycanvas");
    let w = window.innerWidth - 16;
    let h = 0.75 * w;  /* maintain 4:3 ratio */
    if (canvas.offsetTop + h > window.innerHeight) {
      h = window.innerHeight - canvas.offsetTop - 16;
      w = 4/3 * h;
    }
    canvas.width = w;
    canvas.height = h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    //this.tracker.handleResize();
  }
}