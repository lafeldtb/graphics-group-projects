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
                tipColor: vec3.fromValues(1, 0.8, 0.7),
                baseColor: vec3.fromValues(1, 0.8, 0.7),
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
                        0 + (i * (0.75 + (0.75 * (1 / 6))))));
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

        mat4.translate(midGroup.coordFrame, midGroup.coordFrame, vec3.fromValues(0, 0, 1.125));




    }
}