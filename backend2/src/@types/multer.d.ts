import "multer";

declare global {
  namespace Express {
    interface AuthRequest {
      file?: Express.Multer.File;
    }
  }
}

export {};
