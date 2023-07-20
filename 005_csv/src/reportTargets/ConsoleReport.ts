import { OutputTarget } from '../types/Summary';

export class ConsoleReport implements OutputTarget {
    print(report: string): void {
        console.log(report);
    }
}
