import { provide } from 'inversify-binding-decorators';
import * as names from 'starwars-names';
import * as matchSorter from 'match-sorter';

@provide(StarwarsNamesService)
export default class StarwarsNamesService {

    public getNames(): Array<string> {
        return names.all;
    }

    public getRandomNames(count?: number): Array<string> {
        if (!count) { count = 1; }
        return names.random(count);
    }

    public searchNames(term?: string): Array<string> {
        return matchSorter(this.getNames(), term);
    }
}
