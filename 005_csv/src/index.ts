import { MatchReader } from './MatchReader';
import { CsvFileReader } from './CsvFileReader';
import { MatchResult } from './types/MatchResult';

const csvFilleReader = new CsvFileReader('football.csv');
const matchReader = new MatchReader(csvFilleReader);
matchReader.load();
let manUnitedWins = 0;

for (let match of matchReader.matches) {
    const [date, homeTeam, otherTeam, homeScore, otherScore, winner, other] = match;

    if (homeTeam === 'Man United' && winner === MatchResult.HomeWin) manUnitedWins += 1;

    switch (true) {
        case homeTeam === 'Man United' && (winner === MatchResult.HomeWin || winner === MatchResult.AwayWin):
            manUnitedWins += 1;
            break;
        default:
            break;
    }
}

console.log(`Man United won ${manUnitedWins} games`);
