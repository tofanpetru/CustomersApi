export class ConsoleService {
    public static printMessage(contentLines: string[], port: number = 3000) {
        const maxLength = Math.max(...contentLines.map(line => line.length));
        console.log('\nServer is running on port ' + port);
        console.log('+' + '-'.repeat(maxLength + 2) + '+');
        for (const line of contentLines) {
            const paddingLength = maxLength - line.length;
            const padding = ' '.repeat(Math.floor(paddingLength / 2));
            console.log(`| ${padding}${line}${padding}${' '.repeat(paddingLength % 2)} |`);
        }
        console.log('+' + '-'.repeat(maxLength + 2) + '+');
    }
}
