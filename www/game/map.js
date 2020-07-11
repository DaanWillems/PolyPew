//The map is nothing but a collection of collidable meshes
class Map {
    constructor() {
        this.objects = [];
        var x = 0;
        var y = 0;

        for(var i = -9; i < 11; i++) {
            for(var j = -9; j < 11; j++) {
                for(var z = -9; z < 11; z++) {
                    var entity = loadModel('cube1x1x1.obj');
                    entity.position[0] = j*4;
                    entity.position[1] = 0;
                    entity.position[2] = z*4;
                    entity.animate = true;
                    this.objects.push(entity);
                }
            }
        }
        // var x = -10;
        // for(var i = -9; i < 100; i++) {
        //     entity = loadModel('cube20x1x20.obj');
        //     entity.position[0] = x;
        //     entity.position[1] = i*2;
        //     entity.position[2] = 0;
        //     x = -x;
        //     entity.animate = true;
        //     this.objects.push(entity);
        // }

        // var x = -10;
        // for(var i = -9; i < 100; i++) {
        //     entity = loadModel('cube20x1x20.obj');
        //     entity.position[0] = x+50;
        //     entity.position[1] = i*2;
        //     entity.position[2] = 0;
        //     x = -x;
        //     entity.animate = true;
        //     this.objects.push(entity);
        // }
    }
}