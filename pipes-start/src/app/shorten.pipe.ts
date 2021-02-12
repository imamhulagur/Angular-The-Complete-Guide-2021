import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
    transform(value: any, limit: number) {
       if(value.length > limit) {
            return value.substr(0, 10)+'...';//build in JS method which return sub string with first 10 character.
       }
       else {
           return value;//return unchanged value
       }
    }
}