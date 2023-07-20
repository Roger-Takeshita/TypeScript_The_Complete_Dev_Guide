import { Analyzer } from '../types/Summary';
import { MatchData } from '../types/MatchData';
import { MatchResult } from '../types/MatchResult';

export class WinAnalysis implements Analyzer {
    constructor(public team: string) {}

    run(matches: MatchData[]): string {
        let wins = 0;

        for (const match of matches) {
            if (match[1] === 'Man United' && match[5] === MatchResult.HomeWin) wins++;
            if (match[2] === 'Man United' && match[5] === MatchResult.AwayWin) wins++;
        }

        return `Team ${this.team} won ${wins}`;
    }
}
