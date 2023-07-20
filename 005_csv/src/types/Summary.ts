import { MatchData } from './MatchData';
import { WinAnalysis } from '../analyzers/WinAnalysis';
import { HtmlReport } from '../reportTargets/HtmlReport';

export interface Analyzer {
    run(maches: MatchData[]): string;
}

export interface OutputTarget {
    print(report: string): void;
}

export class Summary {
    static winAnalysisWithHtmlReport(team: string): Summary {
        return new Summary(new WinAnalysis(team), new HtmlReport());
    }

    constructor(
        public analyzer: Analyzer,
        public outputTarget: OutputTarget
    ) {}

    buildAndPrintReport(matches: MatchData[]): void {
        const output = this.analyzer.run(matches);
        this.outputTarget.print(output);
    }
}
