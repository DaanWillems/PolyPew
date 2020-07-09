class ShaderProgram {
  constructor(vsSource, fsSource) {
    const canvas = document.querySelector("#glCanvas");
    this.gl = canvas.getContext("webgl2");

    const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fsSource);

    this.shaderProgramID = this.gl.createProgram();
    this.gl.attachShader(this.shaderProgramID, vertexShader);
    this.gl.attachShader(this.shaderProgramID, fragmentShader);
    this.gl.linkProgram(this.shaderProgramID);

    // If creating the shader program failed, alert

    if (!this.gl.getProgramParameter(this.shaderProgramID, this.gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(this.shaderProgramID));
      return null;
    }

    this.uniforms = {}
  }

  bind() {
    this.gl.useProgram(this.shaderProgramID);
  }

  getLocation(name) {
    return this.gl.getAttribLocation(this.shaderProgramID, name);
  }

  createUniformVec3f(name) {
    this.uniforms[name] = this.gl.getUniformLocation(this.shaderProgramID, name);
  }

  setUniformVec3f(name, value) {
    this.gl.uniform3fv(
      this.uniforms[name],
      value);
  }

  createUniformMatrix4f(name) {
    this.uniforms[name] = this.gl.getUniformLocation(this.shaderProgramID, name);
  }

  setUniformMatrix4f(name, value) {
    this.gl.uniformMatrix4fv(
      this.uniforms[name],
      false,
      value);
  }


  loadShader(type, source) {
    const shader = this.gl.createShader(type);

    // Send the source to the shader object
    this.gl.shaderSource(shader, source);

    // Compile the shader program
    this.gl.compileShader(shader);

    // See if it compiled successfully
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }
}
