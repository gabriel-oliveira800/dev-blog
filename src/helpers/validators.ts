abstract class Validators {
  static mimetypes(): string[] {
    return ["jpeg", "jpg", "png", "gif"];
  }

  static validateFileType(mime: string): boolean {
    return this.mimetypes().includes(mime);
  }
}

export default Validators;
