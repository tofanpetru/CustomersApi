import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

export class AddDependencyService {
  private app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  public RegisterMiddlewareFromDirectory(middlewareDirectory: string) {
    const middlewareFiles = fs.readdirSync(middlewareDirectory);

    middlewareFiles.forEach((file) => {
      const middlewarePath = path.join(middlewareDirectory, file);
      const middleware = require(middlewarePath);

      if (typeof middleware === 'function') {
        this.app.use(middleware);
        console.log(`Middleware registered from: ${middlewarePath}`);
      }
    });
  }
}
