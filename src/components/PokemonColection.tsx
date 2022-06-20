import React from "react";
import { Pokemon, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";
import { Detail } from "../App";

interface Props {  // dữ liệu truyền vào 
  pokemons: PokemonDetail[];    // mảng gồm các đối tượng chứa thông tin chi tiết của các pokemon 
  // loại data này kế thừa thằng Pokemon có thêm hoặc không có ability cũng k sao
  viewDetail: Detail;  // phần tử xác định xem phần tử có đang được view hay không 
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;  // khai báo global state, với kiểu giá trị đầu vào là Detail  
  // thằng useState này đã đc khai báo trong app.tsx 
}
const PokemonColection: React.FC<Props> = (props) => {  // khai báo set style cho thằng props 
    const { pokemons, viewDetail, setDetail } = props;  // khai báo biến props truyền vào 
    const selectPokemon = (id: number) => {  // hàm chọn pokemon khi user click vào pokemon thì sẽ truyền vào id của nó 
      if (!viewDetail.isOpened) {  // set để chuyển cho thằng PokemonList 
        setDetail({  // setState cho giá trị viewDetail,   global state  from app.tsx 
          id: id,
          isOpened: true,
        });
      }
    };
    return (
      <>
      {/*nếu thằng viewDetail.isOpen= true thì thằng section sẽ có kiểu hiển thị active còn không thì thôi*/}
        <section
          className={
            viewDetail.isOpened
              ? "collection-container-active"
              : "collection-container"
          }
        >

          {viewDetail.isOpened ? (
            <div className="overlay"></div>
          ) : (
            <div className=""></div>
          )}
          
          {/*hiển thị danh sách pokemon key theo id 
            Pokemonlist là từng thẻ một 
            truyền vào viewDetail -xác định trangj thái hoạt động 
            các thuộc tính để hiển thị 
          */}
          {pokemons.map((pokemon) => {
            return (
              <div onClick={() => selectPokemon(pokemon.id)}> 
                <PokemonList
                  viewDetail={viewDetail}
                  setDetail={setDetail}
                  key={pokemon.id}
                  name={pokemon.name}
                  id={pokemon.id}
                  abilities={pokemon.abilities}
                  image={pokemon.sprites.front_default}
                />
              </div>
            );
          })}
        </section>
      </>
    );
  };
  
  export default PokemonColection;