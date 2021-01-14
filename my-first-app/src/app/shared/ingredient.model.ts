export class Ingredient {
    // public name: string;
    // public amount: number;

    // constructor(name: string, amount: number){
    //     this.name = name;
    //     this.amount = amount;
    // }

    // shortcup way to above thing, only declare inside constructor with access specifiers
    constructor(public name: string, public amount: number){}
}