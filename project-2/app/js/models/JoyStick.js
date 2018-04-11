import { SphereGeometry, CylinderGeometry, TorusGeometry, MeshPhongMaterial, Mesh, Group} from 'three';
import * as THREE from "three";

export default class JoyStick{
    constructor(){
        /*Composite motion for this could be the joystick rotating and being pressed down*/
        let BIG_CYL_RAD = 20;
        let LITTLE_CYL_RAD = 10;
        let THICKNESS = 10;

        /*Joystick*/
        const joyStickShaftGeo = new CylinderGeometry(3, 3, THICKNESS, 20, 10);
        const texture = new THREE.TextureLoader().load('/app/js/models/rubber.jpg');
        const joyStickShaftMat = new MeshPhongMaterial({map: texture, diffuse: 0x101010, specular: 0x666666});
        const joyStickShaft = new Mesh(joyStickShaftGeo, joyStickShaftMat);

        const joyStickTopGeo = new CylinderGeometry(LITTLE_CYL_RAD-2, LITTLE_CYL_RAD-2, 2, 20, 10);
        const joyStickTop = new Mesh(joyStickTopGeo, joyStickShaftMat);
        joyStickTop.translateY(THICKNESS/2);

        const joyStickTorusGeo = new TorusGeometry(LITTLE_CYL_RAD-2, 1.5, 20, 20);
        const joyStickTorus = new Mesh(joyStickTorusGeo, joyStickShaftMat);
        joyStickTorus.translateY(THICKNESS/2);
        joyStickTorus.rotateX(Math.PI/2);

        const joyStickGroup = new Group();
        joyStickGroup.add(joyStickShaft, joyStickTop, joyStickTorus);

        const joyConGroup = new Group();
        joyStickGroup.translateX(BIG_CYL_RAD*2);
        joyStickGroup.translateY(THICKNESS);

        joyConGroup.add(joyStickGroup);
        return(joyConGroup);
    }
}