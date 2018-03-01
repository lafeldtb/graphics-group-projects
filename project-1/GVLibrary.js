class GVLibrary extends ObjectGroup {
    constructor(gl) {
        super(gl);

        let MBax = new Axes(gl);

        let mainBodyGroup = new ObjectGroup(gl);

        /**
         * The following is the main structural body of the Library
         */

        let mainBodyLong = new PolygonalPrism(gl,
            {
                topRadius: 1,
                bottomRadius: 1,
                numSides: 4,
                height: 2.5,
                topColor: vec3.fromValues(0.73, 0.694, 0.686),
                bottomColor: vec3.fromValues(0.674, 0.607, 0.549),
            });
        let mainBodyShort = new PolygonalPrism(gl, {
            topRadius: 1,
            bottomRadius: 1,
            numSides: 4,
            height: 1.5,
            topColor: vec3.fromValues(0.73, 0.694, 0.686),
            bottomColor: vec3.fromValues(0.674, 0.607, 0.549),
        });
        mat4.translate(mainBodyShort.coordFrame, mainBodyShort.coordFrame, vec3.fromValues(0, 0, 3));

        //Pieces that bridge the gap between the main body long and short
        let mainBodyConnecter = new ObjectGroup(gl);
        let mainBodyCon = new PolygonalPrism(gl, {
            topRadius: .5,
            bottomRadius: .5,
            numSides: 4,
            height: .5,
            topColor: vec3.fromValues(0.054, 0.239, 0.329),
            bottomColor: vec3.fromValues(0.09, 0.415, .572),
        });
        let mainBodyCon1 = new PolygonalPrism(gl, {
            topRadius: .5,
            bottomRadius: .5,
            numSides: 4,
            height: .5,
            topColor: vec3.fromValues(0.054, 0.239, 0.329),
            bottomColor: vec3.fromValues(0.09, 0.415, .572),
        });
        let mainBodyCon2 = new PolygonalPrism(gl, {
            topRadius: .5,
            bottomRadius: .5,
            numSides: 4,
            height: .5,
            topColor: vec3.fromValues(0.73, 0.694, 0.686),
            bottomColor: vec3.fromValues(0.674, 0.607, 0.549),
        });
        let mainBodyCon3 = new PolygonalPrism(gl, {
            topRadius: .5,
            bottomRadius: .5,
            numSides: 4,
            height: .5,
            topColor: vec3.fromValues(0.73, 0.694, 0.686),
            bottomColor: vec3.fromValues(0.674, 0.607, 0.549),
        });
        mat4.translate(mainBodyCon.coordFrame, mainBodyCon.coordFrame, vec3.fromValues(-.25, -.25, 0));
        mat4.translate(mainBodyCon1.coordFrame, mainBodyCon1.coordFrame, vec3.fromValues(.25, .25, 0));
        mat4.translate(mainBodyCon2.coordFrame, mainBodyCon2.coordFrame, vec3.fromValues(0, .5, 0));
        mat4.translate(mainBodyCon3.coordFrame, mainBodyCon3.coordFrame, vec3.fromValues(-.5, 0, 0));

        mainBodyConnecter.group.push(mainBodyCon, mainBodyCon1, mainBodyCon2, mainBodyCon3);
        mat4.translate(mainBodyConnecter.coordFrame, mainBodyConnecter.coordFrame, vec3.fromValues(0, 0, 2.5));

        //Push all pieces of the main body into the group
        mainBodyGroup.group.push(mainBodyLong, mainBodyShort, mainBodyConnecter);

        //Rotation to make the main body of the library laying correctly
        mat4.rotateX(mainBodyGroup.coordFrame, mainBodyGroup.coordFrame, glMatrix.toRadian(-90));
        mat4.rotateZ(mainBodyGroup.coordFrame, mainBodyGroup.coordFrame, glMatrix.toRadian(+45));


        /**
         * The following is window logic
         */

        //THIS IS THE BUS LOOP PATIO WINDOW LOGIC
        let busPatioWindow = new PolygonalPrism(gl, {
                topRadius: .25,
                bottomRadius: .25,
                numSides: 4,
                height: 2.502,
                topColor: vec3.fromValues(0.054, 0.239, 0.329),
                bottomColor: vec3.fromValues(0.09, 0.415, .572),
            });
        mat4.translate(busPatioWindow.coordFrame, busPatioWindow.coordFrame, vec3.fromValues(.531, -.001, -.5325));
        mat4.rotateX(busPatioWindow.coordFrame, busPatioWindow.coordFrame, glMatrix.toRadian(-90));
        mat4.rotateZ(busPatioWindow.coordFrame, busPatioWindow.coordFrame, glMatrix.toRadian(+45));


        //THIS IS THE BUS LOOP LARGE WINDOW
        let busLargeWindow = new PolygonalPrism(gl, {
            topRadius: .5,
            bottomRadius: .5,
            numSides: 4,
            height: 1.5,
            topColor: vec3.fromValues(0.054, 0.239, 0.329),
            bottomColor: vec3.fromValues(0.09, 0.415, .572),
        });
        mat4.translate(busLargeWindow.coordFrame, busLargeWindow.coordFrame, vec3.fromValues(.354, .75, .125));
        mat4.rotateX(busLargeWindow.coordFrame, busLargeWindow.coordFrame, glMatrix.toRadian(-90));
        mat4.rotateZ(busLargeWindow.coordFrame, busLargeWindow.coordFrame, glMatrix.toRadian(+45));


        //THESE ARE THE BUS LOOP SMALL WINDOWS
        let smallWindowGroup = new ObjectGroup(gl);
        let smallWindowArray = [];
        for(let i = 0; i < 7; i++){
            if(i < 2){
                smallWindowArray.push(new PolygonalPrism(gl, {
                    topRadius: .0626,
                    bottomRadius: .0626,
                    numSides: 4,
                    height: 1,
                    topColor: vec3.fromValues(0.054, 0.239, 0.329),
                    bottomColor: vec3.fromValues(0.09, 0.415, .572),
                }));
            }
            else if(i < 5){
                smallWindowArray.push(new PolygonalPrism(gl, {
                    topRadius: .0625,
                    bottomRadius: .0626,
                    numSides: 4,
                    height: .705,
                    topColor: vec3.fromValues(0.054, 0.239, 0.329),
                    bottomColor: vec3.fromValues(0.09, 0.415, .572),
                }));
            }
            else{
                smallWindowArray.push(new PolygonalPrism(gl, {
                    topRadius: .0626,
                    bottomRadius: .0626,
                    numSides: 4,
                    height: .3525,
                    topColor: vec3.fromValues(0.054, 0.239, 0.329),
                    bottomColor: vec3.fromValues(0.09, 0.415, .572),
                }));
            }
        }

        //POSITION ALL OF THE SMALL WINDOWS AT THE STARTING POINT
        let smallWindowY = 3.25;
        for(let i = 0; i < smallWindowArray.length; i++){
            mat4.translate(smallWindowArray[i].coordFrame, smallWindowArray[i].coordFrame, vec3.fromValues(.663, smallWindowY, 0));
        }
        //POSITION ALL OF THE SMALL WINDOWS AT THEIR FINAL POINT
        mat4.translate(smallWindowArray[0].coordFrame, smallWindowArray[0].coordFrame, vec3.fromValues(0, 0, -0.7));
        mat4.translate(smallWindowArray[2].coordFrame, smallWindowArray[2].coordFrame, vec3.fromValues(0, .25, -0.7));
        mat4.translate(smallWindowArray[5].coordFrame, smallWindowArray[5].coordFrame, vec3.fromValues(0, .25, 0.25));
        mat4.translate(smallWindowArray[1].coordFrame, smallWindowArray[1].coordFrame, vec3.fromValues(0, .5, -.3975));
        mat4.translate(smallWindowArray[3].coordFrame, smallWindowArray[3].coordFrame, vec3.fromValues(0, .75, -.1025));
        mat4.translate(smallWindowArray[6].coordFrame, smallWindowArray[6].coordFrame, vec3.fromValues(0, .75, -.7));
        mat4.translate(smallWindowArray[4].coordFrame, smallWindowArray[4].coordFrame, vec3.fromValues(0, 1, -.3525));

        //ROTATE ALL SMALL WINDOWS AND PUSH THEM TO THE GROUP
        for(let i = 0; i < smallWindowArray.length; i++){
            mat4.rotateZ(smallWindowArray[i].coordFrame, smallWindowArray[i].coordFrame, glMatrix.toRadian(+45));
            smallWindowGroup.group.push(smallWindowArray[i]);
        }


        /**
         * This is the window extras
         */

        //LARGE WINDOW BARS
        let largeWindowBarGroup = new ObjectGroup(gl);

        //two sets of 8 vertical and 4 horizontal bars
        let verticalBarsArray = [];
        let dist = 0;
        let dist2 = 0;
        //CREATE ALL VERTICAL BARS
        for(let i = 0; i < 18; i++){
            if(i < 9){
                verticalBarsArray.push(new PolygonalPrism(gl, {
                    topRadius: .02,
                    bottomRadius: .02,
                    numSides: 8,
                    height: .1414,
                    topColor: vec3.fromValues(0.224, 0.282, 0.345),
                    bottomColor: vec3.fromValues(0.224, 0.282, 0.345),
                }));
                mat4.translate(verticalBarsArray[i].coordFrame, verticalBarsArray[i].coordFrame, vec3.fromValues(0, dist, 0));
                largeWindowBarGroup.group.push(verticalBarsArray[i]);
                dist += .1875;
            }
            else{
                verticalBarsArray.push(new PolygonalPrism(gl, {
                    topRadius: .02,
                    bottomRadius: .02,
                    numSides: 8,
                    height: .1414,
                    topColor: vec3.fromValues(0.224, 0.282, 0.345),
                    bottomColor: vec3.fromValues(0.224, 0.282, 0.345),
                }));
                mat4.translate(verticalBarsArray[i].coordFrame, verticalBarsArray[i].coordFrame, vec3.fromValues(0, dist2, -.2828));
                largeWindowBarGroup.group.push(verticalBarsArray[i]);
                dist2 += .1875;
            }
        }

        //CREATE ALL HORIZONTAL BARS
        let horizBarsArray = [];
        dist = 0;
        dist2 = 0;
        for(let i = 0; i < 8; i++){
            if(i < 4){
                horizBarsArray.push(new PolygonalPrism(gl, {
                    topRadius: .01,
                    bottomRadius: .01,
                    numSides: 8,
                    height: 1.5,
                    topColor: vec3.fromValues(0.224, 0.282, 0.345),
                    bottomColor: vec3.fromValues(0.224, 0.282, 0.345),
                }));
                mat4.translate(horizBarsArray[i].coordFrame, horizBarsArray[i].coordFrame, vec3.fromValues(0, 0, .1414+dist));
                mat4.rotateX(horizBarsArray[i].coordFrame, horizBarsArray[i].coordFrame, glMatrix.toRadian(-90));
                largeWindowBarGroup.group.push(horizBarsArray[i]);
                dist = dist - .03535;
            }
            else{
                horizBarsArray.push(new PolygonalPrism(gl, {
                    topRadius: .01,
                    bottomRadius: .01,
                    numSides: 8,
                    height: 1.5,
                    topColor: vec3.fromValues(0.224, 0.282, 0.345),
                    bottomColor: vec3.fromValues(0.224, 0.282, 0.345),
                }));
                mat4.translate(horizBarsArray[i].coordFrame, horizBarsArray[i].coordFrame, vec3.fromValues(0, 0, -.1414+dist2));
                mat4.rotateX(horizBarsArray[i].coordFrame, horizBarsArray[i].coordFrame, glMatrix.toRadian(-90));
                largeWindowBarGroup.group.push(horizBarsArray[i]);
                dist2 = dist2 - .03535;
            }
        }
        mat4.translate(largeWindowBarGroup.coordFrame, largeWindowBarGroup.coordFrame, vec3.fromValues(.705, .75, 0.125));

        //CONNECTOR BARS
        let connectorBarsGroup = new ObjectGroup(gl);

        //CREATE VERTICAL BARS
        let conVertBarsArray = [];
        dist = 0;
        for(let i = 0; i < 7; i++){
            conVertBarsArray.push(new PolygonalPrism(gl, {
                topRadius: .01,
                bottomRadius: .01,
                numSides: 8,
                height: 1,
                topColor: vec3.fromValues(0.224, 0.282, 0.345),
                bottomColor: vec3.fromValues(0.224, 0.282, 0.345),
            }));
            mat4.translate(conVertBarsArray[i].coordFrame, conVertBarsArray[i].coordFrame, vec3.fromValues(0, dist, 0));
            connectorBarsGroup.group.push(conVertBarsArray[i]);
            dist += .0833;
        }
        //CREATE HORIZONTAL BARS
        dist = 0;
        let conHorizBarsArray = [];
        for(let i = 0; i < 41; i++){
            conHorizBarsArray.push(new PolygonalPrism(gl, {
                topRadius: .005,
                bottomRadius: .005,
                numSides: 8,
                height: .5,
                topColor: vec3.fromValues(0.224, 0.282, 0.345),
                bottomColor: vec3.fromValues(0.224, 0.282, 0.345),
            }));
            mat4.translate(conHorizBarsArray[i].coordFrame, conHorizBarsArray[i].coordFrame, vec3.fromValues(0, 0, dist));
            mat4.rotateX(conHorizBarsArray[i].coordFrame, conHorizBarsArray[i].coordFrame, glMatrix.toRadian(-90));
            connectorBarsGroup.group.push(conHorizBarsArray[i]);
            dist += .025;
        }
        mat4.translate(connectorBarsGroup.coordFrame, connectorBarsGroup.coordFrame, vec3.fromValues(.353, 2.5, -.295));


        //CAMPUS SIDE WINDOW
        let campusSideWindow = new PolygonalPrism(gl, {
            topRadius: .9,
            bottomRadius: .9,
            numSides: 4,
            height: 4,
            topColor: vec3.fromValues(0.054, 0.239, 0.329),
            bottomColor: vec3.fromValues(0.09, 0.415, .572),
        });
        mat4.translate(campusSideWindow.coordFrame, campusSideWindow.coordFrame, vec3.fromValues(-.471, .25, -.069));
        mat4.rotateX(campusSideWindow.coordFrame, campusSideWindow.coordFrame, glMatrix.toRadian(-90));
        mat4.rotateZ(campusSideWindow.coordFrame, campusSideWindow.coordFrame, glMatrix.toRadian(+45));

        //CAMPUS SIDE BARS
        let campusSideBarGroup = new ObjectGroup(gl);
        let campusSideBarArray = [];
        dist = 0;
        for(let i = 0; i < 31; i++){
            campusSideBarArray.push(new PolygonalPrism(gl, {
                topRadius: .02,
                bottomRadius: .02,
                numSides: 8,
                height: 1.41,
                topColor: vec3.fromValues(0.224, 0.282, 0.345),
                bottomColor: vec3.fromValues(0.224, 0.282, 0.345),
            }));
            mat4.translate(campusSideBarArray[i].coordFrame, campusSideBarArray[i].coordFrame, vec3.fromValues(0, dist, 0));
            campusSideBarGroup.group.push(campusSideBarArray[i]);
            dist += .15;
        }
        dist = 0;
        for(let i = 0; i < 6; i++){
            campusSideBarArray.push(new PolygonalPrism(gl, {
                topRadius: .02,
                bottomRadius: .02,
                numSides: 8,
                height: 4.5,
                topColor: vec3.fromValues(0.224, 0.282, 0.345),
                bottomColor: vec3.fromValues(0.224, 0.282, 0.345),
            }));
            mat4.translate(campusSideBarArray[31+i].coordFrame, campusSideBarArray[31+i].coordFrame, vec3.fromValues(0, 0, dist));
            mat4.rotateX(campusSideBarArray[31+i].coordFrame, campusSideBarArray[31+i].coordFrame, glMatrix.toRadian(-90));
            campusSideBarGroup.group.push(campusSideBarArray[31+i]);
            dist += .28;
        }
        mat4.translate(campusSideBarGroup.coordFrame, campusSideBarGroup.coordFrame, vec3.fromValues(-1.1, 0, -.705));

        //READING ROOM
        let readingRoom = new PolygonalPrism(gl, {
            topRadius: .5,
            bottomRadius: .5,
            numSides: 4,
            height: 1.5,
            topColor: vec3.fromValues(0.73, 0.694, 0.686),
            bottomColor: vec3.fromValues(0.674, 0.607, 0.549),
        });
        mat4.translate(readingRoom.coordFrame, readingRoom.coordFrame, vec3.fromValues(-.753, 3.25, .5));
        mat4.rotateX(readingRoom.coordFrame, readingRoom.coordFrame, glMatrix.toRadian(-90));
        mat4.rotateZ(readingRoom.coordFrame, readingRoom.coordFrame, glMatrix.toRadian(+45));

        //TOP PATIO
        let topPatio = new PolygonalPrism(gl, {
            topRadius: .5,
            bottomRadius: .5,
            numSides: 4,
            height: 3,
            topColor: vec3.fromValues(0.224, 0.282, 0.345),
            bottomColor: vec3.fromValues(0.224, 0.282, 0.345),
        });
        mat4.translate(topPatio.coordFrame, topPatio.coordFrame, vec3.fromValues(-.35, 1, .75));
        mat4.rotateX(topPatio.coordFrame, topPatio.coordFrame, glMatrix.toRadian(-90));
        mat4.rotateZ(topPatio.coordFrame, topPatio.coordFrame, glMatrix.toRadian(+45));

        //MAIN ENTRANCE WINDOW
        let mainEntranceWindow = new PolygonalPrism(gl, {
            topRadius: .5,
            bottomRadius: .5,
            numSides: 4,
            height: 1,
            topColor: vec3.fromValues(0.054, 0.239, 0.329),
            bottomColor: vec3.fromValues(0.09, 0.415, .572),
        });
        mat4.translate(mainEntranceWindow.coordFrame, mainEntranceWindow.coordFrame, vec3.fromValues(.6, 4.1465, 0));
        mat4.rotateY(mainEntranceWindow.coordFrame, mainEntranceWindow.coordFrame, glMatrix.toRadian(-90));
        mat4.rotateZ(mainEntranceWindow.coordFrame, mainEntranceWindow.coordFrame, glMatrix.toRadian(+45));


        //THESE ARE THE BUS LOOP SMALL WINDOWS
        let sideWindowGroup = new ObjectGroup(gl);
        let sideWindowArray = [];
        for(let i = 0; i < 7; i++){
            if(i < 2){
                sideWindowArray.push(new PolygonalPrism(gl, {
                    topRadius: .0626,
                    bottomRadius: .0626,
                    numSides: 4,
                    height: 1,
                    topColor: vec3.fromValues(0.054, 0.239, 0.329),
                    bottomColor: vec3.fromValues(0.09, 0.415, .572),
                }));
            }
            else if(i < 5){
                sideWindowArray.push(new PolygonalPrism(gl, {
                    topRadius: .0625,
                    bottomRadius: .0626,
                    numSides: 4,
                    height: .705,
                    topColor: vec3.fromValues(0.054, 0.239, 0.329),
                    bottomColor: vec3.fromValues(0.09, 0.415, .572),
                }));
            }
            else{
                sideWindowArray.push(new PolygonalPrism(gl, {
                    topRadius: .0626,
                    bottomRadius: .0626,
                    numSides: 4,
                    height: .3525,
                    topColor: vec3.fromValues(0.054, 0.239, 0.329),
                    bottomColor: vec3.fromValues(0.09, 0.415, .572),
                }));
            }
        }

        //POSITION ALL OF THE SMALL WINDOWS AT THE STARTING POINT
        let sideWindowPos = 3.25;
        for(let i = 0; i < sideWindowArray.length; i++){
            mat4.translate(sideWindowArray[i].coordFrame, sideWindowArray[i].coordFrame, vec3.fromValues(0, 0, 0));
        }
        //POSITION ALL OF THE SMALL WINDOWS AT THEIR FINAL POINT
        mat4.translate(sideWindowArray[0].coordFrame, sideWindowArray[0].coordFrame, vec3.fromValues(0, 0, -0.7));
        mat4.translate(sideWindowArray[2].coordFrame, sideWindowArray[2].coordFrame, vec3.fromValues(0, .25, -0.7));
        mat4.translate(sideWindowArray[5].coordFrame, sideWindowArray[5].coordFrame, vec3.fromValues(0, .25, 0.25));
        mat4.translate(sideWindowArray[1].coordFrame, sideWindowArray[1].coordFrame, vec3.fromValues(0, .5, -.3975));
        mat4.translate(sideWindowArray[3].coordFrame, sideWindowArray[3].coordFrame, vec3.fromValues(0, .75, -.1025));
        mat4.translate(sideWindowArray[6].coordFrame, sideWindowArray[6].coordFrame, vec3.fromValues(0, .75, -.7));
        mat4.translate(sideWindowArray[4].coordFrame, sideWindowArray[4].coordFrame, vec3.fromValues(0, 1, -.3525));

        //ROTATE ALL SMALL WINDOWS AND PUSH THEM TO THE GROUP
        for(let i = 0; i < sideWindowArray.length; i++){
            mat4.rotateZ(sideWindowArray[i].coordFrame, sideWindowArray[i].coordFrame, glMatrix.toRadian(+45));
            sideWindowGroup.group.push(sideWindowArray[i]);
        }

        mat4.rotateZ(sideWindowGroup.coordFrame, sideWindowGroup.coordFrame, glMatrix.toRadian(-90));
        mat4.translate(sideWindowGroup.coordFrame, sideWindowGroup.coordFrame, vec3.fromValues(-.036, -.5, .05));



        this.group.push(sideWindowGroup);
        this.group.push(mainEntranceWindow);
        this.group.push(topPatio);
        this.group.push(readingRoom);
        this.group.push(campusSideBarGroup);
        this.group.push(campusSideWindow);
        this.group.push(mainBodyGroup);
        this.group.push(busPatioWindow);
        this.group.push(busLargeWindow);
        this.group.push(smallWindowGroup);
        this.group.push(largeWindowBarGroup);
        this.group.push(connectorBarsGroup);
    }
}