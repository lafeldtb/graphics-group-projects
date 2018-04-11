import { BoxGeometry, CylinderGeometry, TorusGeometry, MeshPhongMaterial, Mesh, Group} from 'three';
import * as THREE from "three";

export default class TV{
    constructor(){
        const tvMainBodyGeo = new BoxGeometry(20,15,10,10,10,10);
        const texture = new THREE.TextureLoader().load('/app/js/models/wood5.png');
        const woodTexture = new MeshPhongMaterial({map: texture, ambient:0x37220D, diffuse: 0xc6901c});
        const tvMainBody = new Mesh(tvMainBodyGeo, woodTexture);

        const screenTex = new THREE.TextureLoader().load('/app/js/models/Battlefield_SSBB.jpg');
        const tvScreenMat = new MeshPhongMaterial({map: screenTex,ambient: 0x0d0c10, diffuse: 0x2e2b39, specular: 0x545358, shininess: 10});
        const tvScreenGeo = new BoxGeometry(15,12,8,10,10,10);
        const tvScreen = new Mesh(tvScreenGeo, tvScreenMat);
        tvScreen.translateZ(1.25);
        tvScreen.translateX(-2);

        const antennae = new Group();
        const annGeo = new CylinderGeometry(.1,.1,10,10,10);
        const annMat = new MeshPhongMaterial({color: 0xC0C0C0, ambient: 0x3f3f3f, diffuse: 0x666666, specular: 0xc5c5c5});
        const ann = new Mesh(annGeo, annMat);
        const ann2 = new Mesh(annGeo, annMat);
        ann.rotateY(Math.PI/2);
        ann2.rotateY(-Math.PI/2);
        ann.rotateZ(Math.PI/6);
        ann2.rotateZ(Math.PI/6);
        antennae.add(ann, ann2);
        antennae.rotateY(Math.PI/2);
        antennae.translateY(7);

        const knobMat = new MeshPhongMaterial({color: 0x383838, ambient: 0x1a0f1c, diffuse: 0x6d7789, specular: 0x545485});
        const knobGeo = new CylinderGeometry(1,1,2,10,10);
        const knob = new Mesh(knobGeo, knobMat);
        const knob2 = new Mesh(knobGeo, knobMat);
        knob.translateZ(5);
        knob.translateX(8);
        knob.rotateX(Math.PI/2);
        knob2.translateZ(5);
        knob2.translateX(8);
        knob2.translateY(-3);
        knob2.rotateX(Math.PI/2);


        const tvGroup = new Group();
        tvGroup.add(tvScreen, tvMainBody, antennae,knob, knob2);
        return tvGroup;
    }
}