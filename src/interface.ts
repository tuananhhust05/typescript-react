export interface Pokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
  }

export interface PokemonDetail extends Pokemon {  // kế thừa từ thằng pokemon và có thể thêm hoặc không một số thuộc tính 
  abilities?: {
    ability:string;
    name:string;
  }[];
}  