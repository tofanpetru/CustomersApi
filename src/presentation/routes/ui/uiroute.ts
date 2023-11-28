import express, { Request, Response, Router } from 'express';

import fs from 'fs';
import path from 'path';
export class HtmlEndpoint {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.get('/', this.getHtml);
    }

    private getHtml(_: express.Request, res: express.Response): void {
        const filePath = path.join(__dirname, 'index.html');

        // Читаем файл асинхронно
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading HTML file:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(data);
            }
        });
    }
}