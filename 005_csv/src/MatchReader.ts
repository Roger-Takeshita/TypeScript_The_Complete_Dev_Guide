import { dateStringToDate } from './utils/utils';
import { MatchResult } from './types/MatchResult';

type MatchData = [Date, string, string, number, number, MatchResult, string];

interface DataReader {
    read(): void;
    data: string[][];
}

export class MatchReader {
    matches: MatchData[] = [];

    constructor(public reader: DataReader) {}

    load(): void {
        this.reader.read();
        this.matches = this.reader.data.map((item): MatchData => {
            return [
                dateStringToDate(item[0]),
                item[1],
                item[2],
                parseInt(item[3]),
                parseInt(item[4]),
                item[5] as MatchResult,
                item[6],
            ];
        });
    }
}
