class Tree extends ObjectGroup {
    constructor(gl) {
        super(gl);

        let TreeAx = new Axes(gl);
        mat4.translate(TreeAx.coordFrame, TreeAx.coordFrame, vec3.fromValues(0, -1.25, 0));


        let trunk = new PolygonalPrism(gl,{
            topRadius: .1,
            bottomRadius: .1,
            numSides: 8,
            height: 1,
            topColor: vec3.fromValues(.274,.176,.086),
            bottomColor: vec3.fromValues(.274,.176,.086),
        });

        let rootArray = [];
        for(let i = 0; i < 4; i++){
            rootArray.push(new PolygonalPrism(gl,{
                topRadius: 0,
                bottomRadius: .1,
                numSides: 8,
                height: .3,
                topColor: vec3.fromValues(.274,.176,.086),
                bottomColor: vec3.fromValues(.274,.176,.086),
            }));
            // mat4.translate(rootArray[i].coordFrame, rootArray[i].coordFrame, vec3.fromValues(0, 0, 0));
            this.group.push(rootArray[i]);
        }
        mat4.rotateX(rootArray[0].coordFrame, rootArray[0].coordFrame, glMatrix.toRadian(+90));
        mat4.rotateX(rootArray[1].coordFrame, rootArray[1].coordFrame, glMatrix.toRadian(-90));
        mat4.rotateY(rootArray[2].coordFrame, rootArray[2].coordFrame, glMatrix.toRadian(+90));
        mat4.rotateY(rootArray[3].coordFrame, rootArray[3].coordFrame, glMatrix.toRadian(-90));
        for(let i = 0; i < 4; i++){
            mat4.translate(rootArray[i].coordFrame, rootArray[i].coordFrame, vec3.fromValues(0, 0, .05));
        }

        let leaves = [];
        for(let i = 0; i < 6; i++){
            leaves.push(new Sphere(gl,{
                radius: .25,
                splitDepth: 5,
                northColor: vec3.fromValues(.117,.567,.176),
                equatorColor: vec3.fromValues(.117,.567,.176),
                southColor: vec3.fromValues(.117,.567,.176),
            }));
            this.group.push(leaves[i]);
        }
        mat4.translate(leaves[0].coordFrame, leaves[0].coordFrame, vec3.fromValues(0, 0, 1));
        mat4.translate(leaves[1].coordFrame, leaves[1].coordFrame, vec3.fromValues(0, .25, 1));
        mat4.translate(leaves[2].coordFrame, leaves[2].coordFrame, vec3.fromValues(0, -.25, 1));
        mat4.translate(leaves[3].coordFrame, leaves[3].coordFrame, vec3.fromValues(.25, 0, 1));
        mat4.translate(leaves[4].coordFrame, leaves[4].coordFrame, vec3.fromValues(-.25, 0, 1));
        mat4.translate(leaves[5].coordFrame, leaves[5].coordFrame, vec3.fromValues(0, 0, 1.25));

        this.group.push(trunk);
    }
}