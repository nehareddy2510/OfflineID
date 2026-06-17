class LivenessService {

  private left =
    false;

  private right =
    false;

  private blink =
    false;

  reset(){

    this.left=false;
    this.right=false;
    this.blink=false;

  }

  process(
    detection:any,
  ){

    if(
      !this.left &&
      detection.headY < -15
    ){

      this.left=true;

      return "LEFT";

    }

    if(
      this.left &&
      !this.right &&
      detection.headY > 15
    ){

      this.right=true;

      return "RIGHT";

    }

    if(
      this.left &&
      this.right &&
      !this.blink &&
      detection.leftEye < 0.3 &&
      detection.rightEye < 0.3
    ){

      this.blink=true;

      return "BLINK";

    }

    if(
      this.left &&
      this.right &&
      this.blink
    ){

      return "DONE";

    }

    return "WAIT";

  }

}

export default new LivenessService();