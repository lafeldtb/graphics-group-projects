import { BoxGeometry, CylinderGeometry, TorusGeometry, MeshPhongMaterial, Mesh, Group} from 'three';
import * as THREE from "three";

export default class SwitchController{
    constructor(){
        /*Composite motion for this could be the joystick rotating and being pressed down*/
        let BIG_CYL_RAD = 20;
        let LITTLE_CYL_RAD = 10;
        let THICKNESS = 10;

        /*Red Body*/
        const topCylGeo = new CylinderGeometry(BIG_CYL_RAD, BIG_CYL_RAD, THICKNESS, 20, 10);
        const redPlastic = new MeshPhongMaterial({color: 0xef5e52});
        const topCyl = new Mesh(topCylGeo, redPlastic);

        const bottomCyl = new Mesh(topCylGeo, redPlastic);
        bottomCyl.translateX(3*BIG_CYL_RAD);

        const cylConnectorGeo = new BoxGeometry(BIG_CYL_RAD*3, THICKNESS, BIG_CYL_RAD*2, 10, 10, 10);
        const cylConnector = new Mesh(cylConnectorGeo, redPlastic);
        cylConnector.translateX(BIG_CYL_RAD*1.5);

        const redBlackConnectorGeo = new BoxGeometry(BIG_CYL_RAD*5, THICKNESS, BIG_CYL_RAD);
        const redBlackConnector = new Mesh(redBlackConnectorGeo, redPlastic);
        redBlackConnector.translateX(BIG_CYL_RAD*1.5);
        redBlackConnector.translateZ(BIG_CYL_RAD/2);

        /*Black Body*/
        const topSmallCylGeo = new CylinderGeometry(LITTLE_CYL_RAD, LITTLE_CYL_RAD, THICKNESS-.01, 20, 10);
        const blackPlastic = new MeshPhongMaterial({color: 0x5b5e63});
        const topSmallCyl = new Mesh(topSmallCylGeo, blackPlastic);
        topSmallCyl.translateX(-LITTLE_CYL_RAD);
        topSmallCyl.translateZ(BIG_CYL_RAD);

        const bottomSmallCyl = new Mesh(topSmallCylGeo, blackPlastic);
        bottomSmallCyl.translateX(LITTLE_CYL_RAD*7);
        bottomSmallCyl.translateZ(BIG_CYL_RAD);

        const smallCylConnectorGeo = new BoxGeometry(LITTLE_CYL_RAD*8, THICKNESS, LITTLE_CYL_RAD, 10, 10, 10);
        const smallCylConnector = new Mesh(smallCylConnectorGeo, blackPlastic);
        smallCylConnector.translateX(LITTLE_CYL_RAD*3);
        smallCylConnector.translateZ(BIG_CYL_RAD + LITTLE_CYL_RAD/2);

        const joyConBodyGroup = new Group();
        joyConBodyGroup.add(topCyl, bottomCyl, cylConnector, topSmallCyl, bottomSmallCyl, redBlackConnector, smallCylConnector);

        // /*Joystick*/
        // const joyStickShaftGeo = new CylinderGeometry(3, 3, THICKNESS, 20, 10);
        const texture = new THREE.TextureLoader().load('/app/js/models/rubber.jpg');
        const joyStickShaftMat = new MeshPhongMaterial({map: texture, diffuse: 0x101010, specular: 0x666666});
        // const joyStickShaft = new Mesh(joyStickShaftGeo, joyStickShaftMat);
        //
        // const joyStickTopGeo = new CylinderGeometry(LITTLE_CYL_RAD-2, LITTLE_CYL_RAD-2, 2, 20, 10);
        // const joyStickTop = new Mesh(joyStickTopGeo, joyStickShaftMat);
        // joyStickTop.translateY(THICKNESS/2);
        //
        // const joyStickTorusGeo = new TorusGeometry(LITTLE_CYL_RAD-2, 1.5, 20, 20);
        // const joyStickTorus = new Mesh(joyStickTorusGeo, joyStickShaftMat);
        // joyStickTorus.translateY(THICKNESS/2);
        // joyStickTorus.rotateX(Math.PI/2);
        //
        // const joyStickGroup = new Group();
        // joyStickGroup.add(joyStickShaft, joyStickTop, joyStickTorus);

        /*Buttons*/
        const buttonGroup = new Group();
        for(let i = 0; i < 4; i ++){
            const buttonGeo = new CylinderGeometry(5, 5, 3, 20, 20);
            const joyButton = new Mesh(buttonGeo, joyStickShaftMat);
            joyButton.rotateY(i*2*Math.PI/4);
            joyButton.translateX(LITTLE_CYL_RAD);
            buttonGroup.add(joyButton);
        }
        buttonGroup.translateY(THICKNESS/2);
        buttonGroup.translateX(BIG_CYL_RAD/2);

        const plusButton = new Group();
        for(let i = 0; i < 2; i ++){
            const plusHalfGeo = new BoxGeometry(6, 2, 2, 10, 10, 10);
            const plusHalf = new Mesh(plusHalfGeo, joyStickShaftMat);
            plusHalf.rotateY(i*Math.PI/2);
            plusButton.add(plusHalf);
        }
        plusButton.translateY(THICKNESS/2);
        plusButton.translateZ(LITTLE_CYL_RAD);
        plusButton.translateX(-LITTLE_CYL_RAD);

        const homeButtonGeo = new CylinderGeometry(3, 3, 3, 20, 10);
        const homeButtonMat = new MeshPhongMaterial({color: 0x3c4043});
        const homeButton = new Mesh(homeButtonGeo, homeButtonMat);
        homeButton.translateY(THICKNESS/2);
        homeButton.translateX(BIG_CYL_RAD*3);
        homeButton.translateZ(LITTLE_CYL_RAD);

        const homeButtonTorusGeo = new TorusGeometry(3, 1.5, 20, 20);
        const homeButtonTorusMat = new MeshPhongMaterial({color: 0x848080});
        const homeButtonTorus = new Mesh(homeButtonTorusGeo, homeButtonTorusMat);
        homeButtonTorus.translateY(THICKNESS/2);
        homeButtonTorus.translateX(BIG_CYL_RAD*3);
        homeButtonTorus.translateZ(LITTLE_CYL_RAD);
        homeButtonTorus.rotateX(Math.PI/2);

        const joyConGroup = new Group();
        // joyStickGroup.translateX(BIG_CYL_RAD*2);
        // joyStickGroup.translateY(THICKNESS);

        joyConGroup.add(/*joyStickGroup,*/ joyConBodyGroup, buttonGroup, plusButton, homeButton, homeButtonTorus);
        // joyConGroup.add(homeButton);
        return(joyConGroup);
    }
}