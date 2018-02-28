class ClockTower extends ObjectGroup {
    constructor(gl) {
        super(gl);

        let baseGroup = new ObjectGroup(gl);
        this.group.push(baseGroup);

        let base = new PolygonalPrism(gl,
            {
                topRadius: 1,
                bottomRadius: 1,
                numSides: 4,
                height: 1,
                topColor: vec3.fromValues(0.5, 0.2, 0),
                bottomColor: vec3.fromValues(0.5, 0.2, 0),
            });
        mat4.scale(base.coordFrame, base.coordFrame, vec3.fromValues(2, 2, 1));

        let baseTrimTop = new PolygonalPrism(gl,
            {
                topRadius: 1,
                bottomRadius: 1,
                numSides: 4,
                height: 1,
                topColor: vec3.fromValues(1, 0.8, 0.7),
                bottomColor: vec3.fromValues(1, 0.8, 0.7),
            });
        mat4.translate(baseTrimTop.coordFrame, baseTrimTop.coordFrame, vec3.fromValues(0, 0, 1));
        mat4.scale(baseTrimTop.coordFrame, baseTrimTop.coordFrame, vec3.fromValues(2, 2, 0.125));

        let baseTrimTopSlant = new Cone(gl,
            {
                radius: 1,
                height: 1,
                tipColor: vec3.fromValues(0.9, 0.7, 0.6),
                baseColor: vec3.fromValues(0.9, 0.7, 0.6),
                radialDiv: 4,
            });
        mat4.translate(baseTrimTopSlant.coordFrame, baseTrimTopSlant.coordFrame, vec3.fromValues(0, 0, 1.125));
        mat4.scale(baseTrimTopSlant.coordFrame, baseTrimTopSlant.coordFrame, vec3.fromValues(2, 2, 1));

        let baseTrimBottom = new PolygonalPrism(gl,
            {
                topRadius: 1,
                bottomRadius: 1,
                numSides: 4,
                height: 1,
                topColor: vec3.fromValues(1, 0.8, 0.7),
                bottomColor: vec3.fromValues(1, 0.8, 0.7),
            });
        mat4.translate(baseTrimBottom.coordFrame, baseTrimBottom.coordFrame, vec3.fromValues(0, 0, -0.125));
        mat4.scale(baseTrimBottom.coordFrame, baseTrimBottom.coordFrame, vec3.fromValues(2, 2, 0.125));

        baseGroup.group.push(base);
        baseGroup.group.push(baseTrimTop);
        baseGroup.group.push(baseTrimTopSlant);
        baseGroup.group.push(baseTrimBottom);

        /*Middle of tower*/
        let midGroup = new ObjectGroup(gl);
        this.group.push(midGroup);

        /* Individual Columns */
        let columns = new ObjectGroup(gl);
        midGroup.group.push(columns);

        /* coordinates truth table
        i   |   x   |   y
        ==================
        0   |   0   |   1
        1   |   0   |   -1
        2   |   1   |   0
        3   |   -1  |   0

        x = (((i - ( i % 2 )) * Math.pow(-1, i)) / 2)
        y = ((((3-i) - ( (3-i) % 2 )) * Math.pow(-1, (3-i))) / 2)
         */
        for (let i = 0; i < 12; i++) {
            for(let c = 0; c < 4; c++) {
                let x = (((c - ( c % 2 )) * Math.pow(-1, c)) / 2);
                let y = ((((3-c) - ( (3-c) % 2 )) * Math.pow(-1, (3-c))) / 2);
                //Column block
                let columnBlock = new PolygonalPrism(gl,
                    {
                        topRadius: 1,
                        bottomRadius: 1,
                        numSides: 4,
                        height: 1,
                        topColor: vec3.fromValues(0.5, 0.2, 0),
                        bottomColor: vec3.fromValues(0.5, 0.2, 0),
                    });
                mat4.translate(columnBlock.coordFrame, columnBlock.coordFrame,
                    vec3.fromValues(
                        x * 1.375,
                        y * 1.375,
                        (i * (0.75 + (0.75 * (1 / 6))))));
                mat4.scale(columnBlock.coordFrame, columnBlock.coordFrame, vec3.fromValues(0.375, 0.375, 0.75));

                //Column block trim
                let columnBlockTrim = new PolygonalPrism(gl,
                    {
                        topRadius: 1,
                        bottomRadius: 1,
                        numSides: 4,
                        height: 1,
                        topColor: vec3.fromValues(0.05, 0.02, 0),
                        bottomColor: vec3.fromValues(0.05, 0.02, 0),
                    });
                mat4.translate(columnBlockTrim.coordFrame, columnBlockTrim.coordFrame,
                    vec3.fromValues(
                        x * 1.375,
                        y * 1.375,
                        0.75 + (i * (0.75 + (0.75 * (1 / 6))))));
                mat4.scale(columnBlockTrim.coordFrame, columnBlockTrim.coordFrame, vec3.fromValues(0.375, 0.375, (0.75 * (1 / 6))));

                columns.group.push(columnBlock);
                columns.group.push(columnBlockTrim);

            }
        }

        /* Middle of tower filler */

        let midFill = new PolygonalPrism(gl,
            {
                topRadius: 1,
                bottomRadius: 1,
                numSides: 4,
                height: 1,
                topColor: vec3.fromValues(0.49, 0.19, 0),
                bottomColor: vec3.fromValues(0.49, 0.19, 0),
            });
        mat4.scale(midFill.coordFrame, midFill.coordFrame, vec3.fromValues(1.65, 1.65, 7));

        midGroup.group.push(midFill);

        /* Bell area frame */

        let bellSection = new ObjectGroup(gl);
        midGroup.group.push(bellSection);

        for(let h = 0; h < 4; h++) {
            for (let itr = 0; itr < 4; itr++) {
                //Mid circle
                let ring = new Torus(gl,
                    {
                        majorRadius: 1,
                        minorRadius: 0.05,
                        topColor: vec3.fromValues(1, 0.8, 0.7),
                        bottomColor: vec3.fromValues(1, 0.8, 0.7),
                    });
                mat4.rotateX(ring.coordFrame, ring.coordFrame, glMatrix.toRadian(90));
                mat4.rotateY(ring.coordFrame, ring.coordFrame, glMatrix.toRadian(135 + (90 * itr)));
                mat4.translate(ring.coordFrame, ring.coordFrame, vec3.fromValues(0, 0, 1.25));
                mat4.scale(ring.coordFrame, ring.coordFrame, vec3.fromValues(0.25, 0.25, 0.5));
                mat4.translate(ring.coordFrame, ring.coordFrame, vec3.fromValues(0, 1.85 + (4.5 * h), 0));

                bellSection.group.push(ring);

                //Vertical Bars
                for (let i = -0.5; i < 0.75; i += 0.25) {
                    let vertbar = new PolygonalPrism(gl,
                        {
                            topRadius: 0.025,
                            bottomRadius: 0.025,
                            height: 2,
                            numSides: 20,
                            topColor: vec3.fromValues(1, 0.8, 0.7),
                            bottomColor: vec3.fromValues(1, 0.8, 0.7),
                        });
                    mat4.rotateZ(vertbar.coordFrame, vertbar.coordFrame, glMatrix.toRadian(45 + (90 * itr)));
                    mat4.translate(vertbar.coordFrame, vertbar.coordFrame, vec3.fromValues(1.25, 0, 0));
                    mat4.translate(vertbar.coordFrame, vertbar.coordFrame, vec3.fromValues(0, i, h));
                    mat4.scale(vertbar.coordFrame, vertbar.coordFrame, vec3.fromValues(1, 1.5, 1));

                    bellSection.group.push(vertbar);
                }

                //Horizontal bars
                for (let i = 0; i < 3; i++) {
                    let horizBar = new PolygonalPrism(gl,
                        {
                            topRadius: 0.025,
                            bottomRadius: 0.025,
                            height: 2,
                            numSides: 20,
                            topColor: vec3.fromValues(1, 0.8, 0.7),
                            bottomColor: vec3.fromValues(1, 0.8, 0.7),
                        });
                    mat4.rotateZ(horizBar.coordFrame, horizBar.coordFrame, glMatrix.toRadian(45 + (90 * itr)));
                    mat4.translate(horizBar.coordFrame, horizBar.coordFrame, vec3.fromValues(1.25, 0, 0));
                    mat4.scale(horizBar.coordFrame, horizBar.coordFrame, vec3.fromValues(1, 1, 0.5));
                    mat4.rotateX(horizBar.coordFrame, horizBar.coordFrame, glMatrix.toRadian(90));
                    mat4.translate(horizBar.coordFrame, horizBar.coordFrame, vec3.fromValues(0, i + (h * 2.25), -1));
                    mat4.scale(horizBar.coordFrame, horizBar.coordFrame, vec3.fromValues(1, 1.5, 1));

                    bellSection.group.push(horizBar);
                }
            }
        }
        //mat4.fromZRotation(bellSection.coordFrame, glMatrix.toRadian(90));
        mat4.translate(bellSection.coordFrame, bellSection.coordFrame, vec3.fromValues(0, 0, 7));
        mat4.scale(bellSection.coordFrame, bellSection.coordFrame, vec3.fromValues(0.75, 0.75, 0.75));


        /* Mid section cap */

        let midCap = new PolygonalPrism(gl,
            {
                topRadius: 1,
                bottomRadius: 1,
                numSides: 4,
                height: 1,
                topColor: vec3.fromValues(0.5, 0.2, 0),
                bottomColor: vec3.fromValues(0.5, 0.2, 0),
            });
        mat4.scale(midCap.coordFrame, midCap.coordFrame, vec3.fromValues(1.75, 1.75, 1));
        mat4.translate(midCap.coordFrame, midCap.coordFrame, vec3.fromValues(0, 0, 10.5));
        midGroup.group.push(midCap);


        mat4.translate(midGroup.coordFrame, midGroup.coordFrame, vec3.fromValues(0, 0, 1.125));


        /* Clock section */
        let clockGroup = new ObjectGroup(gl);
        this.group.push(clockGroup);

        let clockSide = new PolygonalPrism(gl,
            {
                topRadius: 1,
                bottomRadius: 1,
                numSides: 4,
                height: 1,
                topColor: vec3.fromValues(1, 0.8, 0.7),
                bottomColor: vec3.fromValues(1, 0.8, 0.7),
            });
        mat4.scale(clockSide.coordFrame, clockSide.coordFrame, vec3.fromValues(1.65, 1.65, 2.25));
        clockGroup.group.push(clockSide);

        for(let itr = 0; itr < 4; itr++) {
            let clockFaceOuter = new Torus(gl,
                {
                    majorRadius: 1,
                    minorRadius: 0.02,
                    topColor: vec3.fromValues(0, 0, 0),
                    bottomColor: vec3.fromValues(0, 0, 0),
                });
            mat4.rotateX(clockFaceOuter.coordFrame, clockFaceOuter.coordFrame, glMatrix.toRadian(90));
            mat4.rotateY(clockFaceOuter.coordFrame, clockFaceOuter.coordFrame, glMatrix.toRadian(135 + (90 * itr)));
            mat4.translate(clockFaceOuter.coordFrame, clockFaceOuter.coordFrame, vec3.fromValues(0, 0, 1.25));
            mat4.scale(clockFaceOuter.coordFrame, clockFaceOuter.coordFrame, vec3.fromValues(0.75, 0.75, 0.75));
            mat4.translate(clockFaceOuter.coordFrame, clockFaceOuter.coordFrame, vec3.fromValues(0, 1.5, 0));

            clockGroup.group.push(clockFaceOuter);

            let clockFaceInner = new Torus(gl,
                {
                    majorRadius: 1,
                    minorRadius: 0.02,
                    topColor: vec3.fromValues(0, 0, 0),
                    bottomColor: vec3.fromValues(0, 0, 0),
                });
            mat4.rotateX(clockFaceInner.coordFrame, clockFaceInner.coordFrame, glMatrix.toRadian(90));
            mat4.rotateY(clockFaceInner.coordFrame, clockFaceInner.coordFrame, glMatrix.toRadian(135 + (90 * itr)));
            mat4.translate(clockFaceInner.coordFrame, clockFaceInner.coordFrame, vec3.fromValues(0, 0, 1.25));
            mat4.scale(clockFaceInner.coordFrame, clockFaceInner.coordFrame, vec3.fromValues(0.75, 0.75, 0.75));
            mat4.translate(clockFaceInner.coordFrame, clockFaceInner.coordFrame, vec3.fromValues(0, 1.5, 0));
            mat4.scale(clockFaceInner.coordFrame, clockFaceInner.coordFrame, vec3.fromValues(0.75, 0.75, 0.75));

            clockGroup.group.push(clockFaceInner);

            let clockBigHand = new Arrow(gl,
                {
                    length: 1,
                    color: vec3.fromValues(0, 0, 0),
                });
            mat4.rotateZ(clockBigHand.coordFrame, clockBigHand.coordFrame, glMatrix.toRadian(45 + (90 * itr)));
            mat4.translate(clockBigHand.coordFrame, clockBigHand.coordFrame, vec3.fromValues(1.25, 0, 1.15));
            mat4.scale(clockBigHand.coordFrame, clockBigHand.coordFrame, vec3.fromValues(0.25, 0.45, 0.90));
            clockGroup.group.push(clockBigHand);

            let clockSmallHand = new Arrow(gl,
                {
                    length: 1,
                    color: vec3.fromValues(0, 0, 0),
                });
            mat4.rotateZ(clockSmallHand.coordFrame, clockSmallHand.coordFrame, glMatrix.toRadian(45 + (90 * itr)));
            mat4.translate(clockSmallHand.coordFrame, clockSmallHand.coordFrame, vec3.fromValues(1.25, 0, 1.15));
            mat4.rotateX(clockSmallHand.coordFrame, clockSmallHand.coordFrame, glMatrix.toRadian(-135));
            mat4.scale(clockSmallHand.coordFrame, clockSmallHand.coordFrame, vec3.fromValues(0.25, 0.45, 0.65));
            clockGroup.group.push(clockSmallHand);

        }
        let clockTrimTop = new PolygonalPrism(gl,
            {
                topRadius: 1,
                bottomRadius: 1,
                numSides: 4,
                height: 1,
                topColor: vec3.fromValues(1, 0.8, 0.7),
                bottomColor: vec3.fromValues(1, 0.8, 0.7),
            });
        mat4.scale(clockTrimTop.coordFrame, clockTrimTop.coordFrame, vec3.fromValues(1.75, 1.75, 0.125));
        clockGroup.group.push(clockTrimTop);

        let clockTrimTopSlant = new Cone(gl,
            {
                radius: 1,
                height: 1,
                tipColor: vec3.fromValues(0.9, 0.7, 0.6),
                baseColor: vec3.fromValues(0.9, 0.7, 0.6),
                radialDiv: 4,
            });
        mat4.translate(clockTrimTopSlant.coordFrame, clockTrimTopSlant.coordFrame, vec3.fromValues(0, 0, 0.125));
        mat4.scale(clockTrimTopSlant.coordFrame, clockTrimTopSlant.coordFrame, vec3.fromValues(1.75, 1.75, 1));
        clockGroup.group.push(clockTrimTopSlant);

        mat4.translate(clockGroup.coordFrame, clockGroup.coordFrame, vec3.fromValues(0, 0, 12.625));

        /* Top of clock */
        let crownGroup = new ObjectGroup(gl);
        this.group.push(crownGroup);

        let crownBase = new PolygonalPrism(gl,
            {
                topRadius: 1,
                bottomRadius: 1,
                numSides: 4,
                height: 1,
                topColor: vec3.fromValues(0, 0.3, 0.2),
                bottomColor: vec3.fromValues(0, 0.3, 0.2),
            });
        mat4.scale(crownBase.coordFrame, crownBase.coordFrame, vec3.fromValues(1.65, 1.65, 0.75));
        crownGroup.group.push(crownBase);

        let crownCurve1 = new PolygonalPrism(gl,
            {
                topRadius: 1,
                bottomRadius: 1,
                numSides: 20,
                height: 1,
                topColor: vec3.fromValues(0, 0.28, 0.18),
                bottomColor: vec3.fromValues(0, 0.28, 0.18),
                semiCircle: Math.PI,
            });
        mat4.translate(crownCurve1.coordFrame, crownCurve1.coordFrame, vec3.fromValues(0, 0, 0.50))
        mat4.rotateX(crownCurve1.coordFrame, crownCurve1.coordFrame, glMatrix.toRadian(90));
        mat4.rotateY(crownCurve1.coordFrame, crownCurve1.coordFrame, glMatrix.toRadian(135));
        mat4.rotateZ(crownCurve1.coordFrame, crownCurve1.coordFrame, glMatrix.toRadian(5));
        mat4.scale(crownCurve1.coordFrame, crownCurve1.coordFrame, vec3.fromValues(1.25, 1.25, 2.5));
        mat4.translate(crownCurve1.coordFrame, crownCurve1.coordFrame, vec3.fromValues(0, 0, -0.5))
        crownGroup.group.push(crownCurve1);

        let crownCurve2 = new PolygonalPrism(gl,
            {
                topRadius: 1,
                bottomRadius: 1,
                numSides: 20,
                height: 1,
                topColor: vec3.fromValues(0, 0.28, 0.18),
                bottomColor: vec3.fromValues(0, 0.28, 0.18),
                semiCircle: Math.PI,
            });
        mat4.translate(crownCurve2.coordFrame, crownCurve2.coordFrame, vec3.fromValues(0, 0, 0.50))
        mat4.rotateX(crownCurve2.coordFrame, crownCurve2.coordFrame, glMatrix.toRadian(90));
        mat4.rotateY(crownCurve2.coordFrame, crownCurve2.coordFrame, glMatrix.toRadian(45));
        mat4.rotateZ(crownCurve2.coordFrame, crownCurve2.coordFrame, glMatrix.toRadian(5));
        mat4.scale(crownCurve2.coordFrame, crownCurve2.coordFrame, vec3.fromValues(1.25, 1.25, 2.5));
        mat4.translate(crownCurve2.coordFrame, crownCurve2.coordFrame, vec3.fromValues(0, 0, -0.5))
        crownGroup.group.push(crownCurve2);


        mat4.translate(crownGroup.coordFrame, crownGroup.coordFrame, vec3.fromValues(0, 0, 14.875));
    }
}