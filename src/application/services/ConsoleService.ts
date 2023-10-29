import http from 'http';

export class ConsoleService {
    public static printMessage(contentLines: string[], port: number = 3000) {
        let maxLength = 0;
        contentLines.forEach(line => {
            maxLength = Math.max(maxLength, line.length);
        });

        console.log('\nServer is running on http://localhost:' + port);
        console.log('+' + '-'.repeat(maxLength + 2) + '+');
        contentLines.forEach(line => {
            const paddingLength = maxLength - line.length;
            const padding = ' '.repeat(Math.floor(paddingLength / 2));
            console.log(`| ${padding}${line}${padding}${' '.repeat(paddingLength % 2)} |`);
        });
        console.log('+' + '-'.repeat(maxLength + 2) + '+');
    }
    
    public static getAndDisplayRoutes(port: number = 3000) {
        const options = {
            host: 'localhost',
            port: port,
            path: '/',
            method: 'GET'
        };

        const req = http.request(options, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                const routes = JSON.parse(data);
                const contentLines = [
                    'Server is running on http://localhost:' + port,
                    'Available Routes:'
                ];
                routes.forEach((route: string) => {
                    contentLines.push(route);
                });
                ConsoleService.printMessage(contentLines, port);
            });
        });

        req.end();
    }
}