import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Slogans {

    public getRandomSlogan() {
        let slogan = this.slogans[Math.floor(Math.random() * this.slogans.length)];
        return slogan

    }

    slogans: string[] = [
        'A Storm is Coming',
        'Keep Ocean City Windmill Free',
        'We also hate Nuclear',
        'Clean Coal',
        'Save the Whales',
        'Protect Ocean City from Industrialization',
        'Windmills? More like Dragons',
        'Our Sunrise is in Danger',
        'Windmills are 3x the Height of the Sears Tower',
        'Defend our Beaches',
        '#NoWindmillsOnMyBeach',
        '#DestroyOceanCity',
        'I want a Crabcake',
        'Join me at the Coal Bar',
        'My Car runs on Coal',
        'Only the Facts we like',
        'Protect Fishermen',
        'Not On My Beach',
        'Everything you Read on the Internet is True',
        'What the fuck is a Kilometer'

    ];

}