var meshes = {}

function loadModel(name) {
    const canvas = document.querySelector("#glCanvas");
    let gl = canvas.getContext("webgl2");

    var mesh = null;

    if(meshes[name] != null) {
        mesh = meshes[name];
    } else {
        var objStr = loadFile('models/'+name)
        mesh = new OBJ.Mesh(objStr);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array(mesh.vertices),
            gl.STATIC_DRAW);

        const normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertexNormals),
            gl.STATIC_DRAW);

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(mesh.indices), gl.STATIC_DRAW);

        var vao = new VertexArrayObject();
        vao.addVertexBuffer(positionBuffer, 3, gl.FLOAT, false, 0, 0, 0)
        vao.addVertexBuffer(normalBuffer, 3, gl.FLOAT, false, 0, 0, 1)
        
        mesh = new Mesh(vao, indexBuffer, positionBuffer, normalBuffer, mesh.indices.length, mesh.vertices);
        meshes[name] = mesh;
    }

    var model = new Entity(mesh);
    model.delta = glMatrix.vec3.fromValues(0, 0, 0);
    model.mesh = mesh;
    model.position = glMatrix.vec3.fromValues(0, 0, 0);
    model.rotation = glMatrix.vec3.fromValues(0, 0, 0);
    model.components = ['render', 'position', 'velocity']
    model.boundingBox = BoundingBox.fromVertices(mesh.vertices);
    model.needsUpdate = true;

    var r = Math.floor(Math.random() * Math.floor(100))/100;
    var g = Math.floor(Math.random() * Math.floor(100))/100;
    var b = Math.floor(Math.random() * Math.floor(100))/100;
    
    model.color = [r, g, b];
    model.meshName = name;
    return model;
}

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = xmlhttp.responseText;
    }
    return result;
  }
