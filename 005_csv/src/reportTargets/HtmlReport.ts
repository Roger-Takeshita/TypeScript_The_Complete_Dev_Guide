import fs from 'fs';
import { OutputTarget } from '../types/Summary';

export class HtmlReport implements OutputTarget {
    print(report: string): void {
        const html = `
            <div>
                <h1>Analysis Output</h1>
                <h3>${report}</h3>
            </div>
        `;
        fs.writeFileSync('report.html', html);
    }
}
