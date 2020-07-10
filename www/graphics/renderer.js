var mat4;

class Renderer {
    constructor() {
        this.gl = null;
        this.projectionMatrix = null;
        this.program = null;
        this.programInfo = null;
        this.rotation = 0;

        window.addEventListener('resize', () => {
            this.resize();
        });

    }

    resize() {
        const canvas = document.querySelector("#glCanvas");

        this.gl.canvas.width = canvas.clientWidth;
        this.gl.canvas.height = canvas.clientHeight
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        console.log("Size: " + window.innerWidth + " " + window.innerHeight);
        console.log("Canvas Size: " + this.gl.canvas.width + " " + this.gl.canvas.height);

        this.gl = canvas.getContext("webgl2");
        if (this.gl === null) {
            alert("Unable to initialize WebGL after resizing. Your browser or machine may not support it.");
            return;
        }
        this.projectionMatrix = this.buildProjectionMatrix();
    }

    buildProjectionMatrix() {
        const fieldOfView = 60 * Math.PI / 180;   // in radians
        console.log("Size: " + window.innerWidth + " " + window.innerHeight);
        const aspect = window.innerWidth / window.innerHeight;
        const zNear = 0.1;
        const zFar = 800.0;
        const projectionMatrix = glMatrix.mat4.create();

        // note: glmatrix.js always has the first argument
        // as the destination to receive the result.
        glMatrix.mat4.perspective(projectionMatrix,
            fieldOfView,
            aspect,
            zNear,
            zFar);

        return projectionMatrix;
    }

    clear() {
        this.gl.clearColor(1.0, 1.0, 1.0, 1.0);  // Clear to black, fully opaque
        this.gl.clearDepth(1.0);                 // Clear everything
        this.gl.enable(this.gl.DEPTH_TEST);           // Enable depth testing
        this.gl.depthFunc(this.gl.LEQUAL);            // Near things obscure far things
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    drawScene(entities, camera) {
        this.clear();
        const viewMatrix = glMatrix.mat4.create();

        glMatrix.mat4.translate(viewMatrix, viewMatrix, camera.position);
        glMatrix.mat4.rotate(viewMatrix, viewMatrix, camera.rotation[0] / 1000, [0, 1, 0]);
        glMatrix.mat4.rotate(viewMatrix, viewMatrix, camera.rotation[1] / 1000, [1, 0, 0]);


        var cameraFront = glMatrix.vec3.fromValues(0, 0, -1);
        glMatrix.vec3.add(cameraFront, camera.position, cameraFront);
        glMatrix.vec3.rotateX(cameraFront, cameraFront, camera.position, -(camera.rotation[1]));
        glMatrix.vec3.rotateY(cameraFront, cameraFront, camera.position, -(camera.rotation[0]));

        glMatrix.mat4.lookAt(viewMatrix, camera.position, cameraFront, [0, 1, 0]);


        const type = this.gl.UNSIGNED_SHORT;
        const offset = 0;
        {
            this.gl.cullFace(this.gl.BACK);
            this.testProgram.bind();
            this.testProgram.setUniformMatrix4f("uViewMatrix", viewMatrix);
            this.testProgram.setUniformMatrix4f("uProjectionMatrix", this.projectionMatrix);

            for (var index in entities) {
                var entity = entities[index];

                if (entity.animate) {
                    entity.rotation[1] += 0.01;
                }

                const modelMatrix = glMatrix.mat4.create();
                glMatrix.mat4.translate(modelMatrix, modelMatrix, entity.position);
                glMatrix.mat4.rotate(modelMatrix, modelMatrix, entity.rotation[0], [1, 0, 0]);
                glMatrix.mat4.rotate(modelMatrix, modelMatrix, entity.rotation[1], [0, 1, 0]);
                glMatrix.mat4.rotate(modelMatrix, modelMatrix, entity.rotation[2], [0, 0, 1]);

                const normalMatrix = glMatrix.mat4.create();
                glMatrix.mat4.invert(normalMatrix, modelMatrix);
                glMatrix.mat4.transpose(normalMatrix, normalMatrix);

                if (index == 0 || entity.meshName != entities[index - 1].meshName) {
                    entity.mesh.vao.bind();
                    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, entity.mesh.indexBuffer);
                }


                // Set the shader uniforms
                this.testProgram.setUniformMatrix4f("uModelMatrix", modelMatrix);
                this.testProgram.setUniformMatrix4f("uNormalMatrix", normalMatrix);
                this.testProgram.setUniformVec3f("uColor", entity.color);

                {
                    const vertexCount = entity.mesh.vertexCount;
                    this.gl.drawElements(this.gl.TRIANGLES, vertexCount, type, offset);

                }

            }

            // this.gl.cullFace(this.gl.FRONT);
            // this.toonProgram.bind();
            // this.toonProgram.setUniformMatrix4f("uScaleMatrix", this.scaleMatrix);
            // this.toonProgram.setUniformMatrix4f("uViewMatrix", viewMatrix);
            // this.toonProgram.setUniformMatrix4f("uProjectionMatrix", this.projectionMatrix);

            // for (var index in entities) {
            //     var entity = entities[index];

            //     const modelMatrix = glMatrix.mat4.create();
            //     glMatrix.mat4.translate(modelMatrix, modelMatrix, entity.position);
            //     glMatrix.mat4.rotate(modelMatrix, modelMatrix, entity.rotation[1], [0, 1, 0]);

            //     const normalMatrix = glMatrix.mat4.create();
            //     glMatrix.mat4.invert(normalMatrix, modelMatrix);
            //     glMatrix.mat4.transpose(normalMatrix, normalMatrix);

            //     if(index == 0 || entity.meshName != entities[index-1].meshName) {
            //         entity.mesh.vao.bind();
            //         this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, entity.mesh.indexBuffer);
            //     }
            //     // Set the shader uniforms
            //     this.toonProgram.setUniformMatrix4f("uModelMatrix", modelMatrix);
            //     this.toonProgram.setUniformMatrix4f("uNormalMatrix", normalMatrix);

            //     {
            //         const vertexCount = entity.mesh.vertexCount;

            //         this.gl.drawElements(this.gl.TRIANGLES, vertexCount, type, offset);

            //     }

            // }
        }


    }

    init() {
        const canvas = document.querySelector("#glCanvas");
        this.gl = canvas.getContext("webgl2");
        this.gl.canvas.width = window.innerWidth;
        this.gl.canvas.height = window.innerHeight;
        // Only continue if WebGL is available and working
        if (this.gl === null) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }

        this.gl.enable(this.gl.CULL_FACE);

        // Set clear color to black, fully opaque
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // Clear the color buffer with specified clear color
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.projectionMatrix = this.buildProjectionMatrix();

        this.toonProgram = new ShaderProgram(vsToonSource, fsToonSource);
        this.toonProgram.createUniformMatrix4f('uProjectionMatrix');
        this.toonProgram.createUniformMatrix4f('uModelMatrix');
        this.toonProgram.createUniformMatrix4f('uViewMatrix');
        this.toonProgram.createUniformMatrix4f('uNormalMatrix');
        this.toonProgram.createUniformMatrix4f('uScaleMatrix');
        this.scaleMatrix = glMatrix.mat4.create();
        var scaleFactor = 0.0025;
        glMatrix.mat4.scale(this.scaleMatrix, this.scaleMatrix, [1 + scaleFactor, 1 + scaleFactor, 1 + scaleFactor]);
        // glMatrix.mat4.translate(this.scaleMatrix, this.scaleMatrix, [-0.5, -(1+scaleFactor), -(1+scaleFactor)]);

        this.testProgram = new ShaderProgram(vsSource, fsSource);
        this.testProgram.createUniformMatrix4f('uProjectionMatrix');
        this.testProgram.createUniformMatrix4f('uModelMatrix');
        this.testProgram.createUniformMatrix4f('uViewMatrix');
        this.testProgram.createUniformVec3f('uColor');
        this.testProgram.createUniformMatrix4f('uNormalMatrix');

        this.resize();
    }
}
