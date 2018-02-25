class ClockTower extends ObjectGroup {
    constructor(gl) {
        super(gl);

        let base = new PolygonalPrism(gl,
            {
                topRadius: 1,
                bottomRadius: 1,
                numSides: 4,
                height: 1,
                topColor: vec3.fromValues(0.5, 0.2, 0),
                bottomColor: vec3.fromValues(0.5, 0.2, 0),
            });
        mat4.scale(base.coordFrame, base.coordFrame, vec3.fromValues(2, 2, 0.5));

        let baseTrimTop = new PolygonalPrism(gl,
            {
                topRadius: 1,
                bottomRadius: 1,
                numSides: 4,
                height: 1,
                topColor: vec3.fromValues(1, 0.8, 0.7),
                bottomColor: vec3.fromValues(1, 0.8, 0.7),
            });
        mat4.translate(baseTrimTop.coordFrame, baseTrimTop.coordFrame, vec3.fromValues(0, 0, 0.5));
        mat4.scale(baseTrimTop.coordFrame, baseTrimTop.coordFrame, vec3.fromValues(2, 2, 0.125));
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

        this.group.push(base);
        this.group.push(baseTrimTop);
        this.group.push(baseTrimBottom);
    }
}