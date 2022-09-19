import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    if(!value)return null;
    if(!args)return value;

    const resultGames = [];
    
    for(const game of value){
      if(game.title.indexOf(args) > -1){
        resultGames.push(game);
      }     
    }
    return resultGames;
  }

}
