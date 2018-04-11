import * as THREE from 'three';
//import Wheel from './models/wheel';
//import ClockTower from './models/clocktower';
// import orbit from 'three-orbit-controls';
// const OrbitControls = orbit(THREE);
import SwitchController from './models/SwitchController'
import JoyStick from './models/JoyStick'
import TV from './models/TV'
import TrackballControls from 'three-trackballcontrols';
import {Group} from "three";

export default class App {

    constructor() {
        const c = document.getElementById('mycanvas');
        // Enable antialias for smoother lines
        this.renderer = new THREE.WebGLRenderer({canvas: c, antialias: true});
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 4 / 3, 0.5, 500);
        this.camera.position.z = 100;

        const testgeo = new THREE.BoxGeometry(10, 10, 10);
        const testmat = new THREE.MeshPhongMaterial({color: 0xccae6e});
        // const testmesh = new THREE.Mesh(testgeo, testmat);

        this.switchGroup = new Group();
        this.tvGroup = new Group();
        this.myJoystick = new JoyStick();
        this.joyDirection = 0;
        this.joyAngle = 0;
        this.myJoyCon = new SwitchController();
        this.switchGroup.add(this.myJoystick, this.myJoyCon);
        this.myTV = new TV();

        const mariotex = new THREE.TextureLoader().load('app/js/models/mario.jpeg');
        const marioMat = new THREE.MeshPhongMaterial({map: mariotex, ambient:0x37220D, diffuse: 0xc6901c});
        const marioGeo = new THREE.BoxGeometry(10,10,10,10,10,10);
        this.myMario = new THREE.Mesh(marioGeo, marioMat);

        this.tvGroup.add(this.myTV, this.myMario);
        this.scene.add(this.switchGroup, this.tvGroup);

        this.myJoystick.matrixAutoUpdate = false;
        this.myJoyCon.matrixAutoUpdate = false;
        this.myTV.matrixAutoUpdate = false;
        this.myMario.matrixAutoUpdate = false;

        const trans = new THREE.Matrix4().makeTranslation(-10,-10,60);
        const scale = new THREE.Matrix4().makeScale(.125,.125,.125);
        this.myJoyCon.matrix.multiply(scale);
        this.myJoyCon.applyMatrix(trans);
        this.myJoystick.matrix.multiply(scale);
        this.myJoystick.applyMatrix(trans);

        const tvScale = new THREE.Matrix4().makeScale(4,4,4);
        this.myTV.matrix.multiply(tvScale);

        this.direction = 'still';
        this.dist = 0;
        const marioTrans = new THREE.Matrix4().makeTranslation(0,0,16);
        this.myMario.applyMatrix(marioTrans);

        //this.target = testmesh
        this.target = this.camera;


        //Light
        const lightOne = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        lightOne.position.set(10, 40, 100);
        this.scene.add(lightOne);

        //Light
        const lightTwo = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        lightTwo.position.set(10, -40, -100);
        this.scene.add(lightTwo);


        //Event Handler
        window.addEventListener('resize', () => this.resizeHandler());
        this.resizeHandler();
        requestAnimationFrame(() => this.render());


        window.addEventListener('keydown', event => {
            let key = String.fromCharCode(event.keyCode);
            switch (key) {
                //Vim Controls
                case 'I':
                    //Move forward
                    // this.target.translateZ(-2);
                    const transI = new THREE.Matrix4().makeTranslation(0,0,-2);
                    this.target.applyMatrix(transI);
                    // requestAnimationFrame(() => this.render());
                    break;
                case 'K':
                    //Move backward
                    // this.target.translateZ(2);
                    // this.target.translateZ(2);
                    const transK = new THREE.Matrix4().makeTranslation(0,0,2);
                    this.target.applyMatrix(transK);
                    // requestAnimationFrame(() => this.render());
                    break;
                case 'U':
                    //Rise
                    // this.target.translateY(2);
                    const transU = new THREE.Matrix4().makeTranslation(0,2,0);
                    this.target.applyMatrix(transU);
                    // requestAnimationFrame(() => this.render());
                    break;
                case 'O':
                    //Fall
                    // this.target.translateY(-2);
                    const transO = new THREE.Matrix4().makeTranslation(0,-2,0);
                    this.target.applyMatrix(transO);
                    // requestAnimationFrame(() => this.render());
                    break;
                case 'J':
                    //Move Left
                    // this.target.translateX(-2);
                    const transJ = new THREE.Matrix4().makeTranslation(-2,0,0);
                    this.target.applyMatrix(transJ);
                    // requestAnimationFrame(() => this.render());
                    break;
                case 'L':
                    //Move Right
                    // this.target.translateX(2);
                    const transL = new THREE.Matrix4().makeTranslation(2,0,0);
                    this.target.applyMatrix(transL);
                    // requestAnimationFrame(() => this.render());
                    break;
                case 'W':
                    //Pitch Down
                    this.target.rotateX(THREE.Math.degToRad(-2));
                    console.log('W');
                    // requestAnimationFrame(() => this.render());
                    break;
                case 'S':
                    //Pitch Up
                    this.target.rotateX(THREE.Math.degToRad(2));
                    // requestAnimationFrame(() => this.render());
                    break;
                case 'A':
                    //Pan Left
                    this.target.rotateY(THREE.Math.degToRad(2));
                    // requestAnimationFrame(() => this.render());
                    break;
                case 'D':
                    //Pan Right
                    this.target.rotateY(THREE.Math.degToRad(-2));
                    // requestAnimationFrame(() => this.render());
                    break;
                case 'Q':
                    //Tilt Left
                    this.target.rotateZ(THREE.Math.degToRad(2));
                    // requestAnimationFrame(() => this.render());
                    break;
                case 'E':
                    //Tilt Left
                    this.target.rotateZ(THREE.Math.degToRad(-2));
                    // requestAnimationFrame(() => this.render());
                    break;
                case 'B':
                    this.direction = 'up';
                    break;


            }
        });

        let objSelect = document.getElementById('objSelect');
        objSelect.addEventListener('change', event => {
            switch (event.target.value) {
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
                case 'JoyCon':
                    this.target = this.switchGroup;
                    break;
                case 'TV':
                    this.target = this.tvGroup;
                    break;
                case 'Mario':
                    this.target = this.myMario;
                    console.log('mario');
                    break;
            }

        });

        let light1 = document.getElementById('light1');
        let light2 = document.getElementById('light2');
        light1.addEventListener('change', event => {
            if (event.target.checked) {
                this.scene.add(lightOne);
                // requestAnimationFrame(() => this.render());
            } else {
                this.scene.remove(lightOne);
                // requestAnimationFrame(() => this.render());
            }
        });
        light2.addEventListener('change', event => {
            console.log(event);
            if (event.target.checked) {
                this.scene.add(lightTwo);
                // requestAnimationFrame(() => this.render());
            } else {
                this.scene.remove(lightTwo);
                // requestAnimationFrame(() => this.render());
            }
        });
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        this.moveJoystick();
        this.moveJoycon();

        if(this.direction ==='up'){
            this.marioJumpUp();
        }
        else if(this.direction === 'down'){
            this.marioJumpDown();
        }
        else if(this.direction === 'still'){

        }
        requestAnimationFrame(() => this.render());
    }

    resizeHandler() {
        const canvas = document.getElementById("mycanvas");
        let w = window.innerWidth - 16;
        let h = 0.75 * w;
        /* maintain 4:3 ratio */
        if (canvas.offsetTop + h > window.innerHeight) {
            h = window.innerHeight - canvas.offsetTop - 16;
            w = 4 / 3 * h;
        }
        canvas.width = w;
        canvas.height = h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
        //this.tracker.handleResize();
    }

    marioJumpUp(){
        if(this.dist === 5){
            this.direction = 'down'
        }
        const movement = new THREE.Matrix4().makeTranslation(0,1,0);
        this.myMario.applyMatrix(movement);
        this.dist++;
        console.log(this.dist);
    }
    marioJumpDown(){
        if(this.dist === 0){
            this.direction = 'still'
        }
        const movement = new THREE.Matrix4().makeTranslation(0,-1,0);
        this.myMario.applyMatrix(movement);
        this.dist--;
        console.log(this.dist);
    }

    moveJoystick(){
        if(this.joyDirection === 0){
            if(this.joyAngle === 45){
                this.joyDirection = 1;
            }
            else{
                this.joyAngle += .5;
                const rotation = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(.5));
                this.myJoystick.matrix.multiply(rotation);
                this.joyAngle += .0625;
                const sideRot = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(.0625));
                this.myJoystick.matrix.multiply(sideRot);
            }
        }
        else{
            if(this.joyAngle === -45){
                this.joyDirection = 0;
            }
            else{
                this.joyAngle -= .5;
                const rotation = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-.5));
                this.myJoystick.matrix.multiply(rotation);
                this.joyAngle -= .0625;
                const sideRot = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-.0625));
                this.myJoystick.matrix.multiply(sideRot);
            }
        }
    }
    moveJoycon(){
        if(this.joyDirection === 0){
            if(this.joyAngle === 45){
                this.joyDirection = 1;
            }
            else{
                const rotation = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(.0625));
                this.myJoyCon.matrix.multiply(rotation);
                const sideRot = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(.0625));
                this.myJoyCon.matrix.multiply(sideRot);
            }
        }
        else{
            if(this.joyAngle === -45){
                this.joyDirection = 0;
            }
            else{
                const rotation = new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-.0625));
                this.myJoyCon.matrix.multiply(rotation);
                const sideRot = new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(-.0625));
                this.myJoyCon.matrix.multiply(sideRot);
            }
        }
    }
}