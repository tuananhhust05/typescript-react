
import './App.css';
import { Pokemon } from "./interface";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonColection from "./components/PokemonColection";
interface Pokemons { // thằng này để xử lý vấn đề gọi api lần đầu chỉ ra tên và link 
  name: string;
  url: string;
}

export interface Detail {  // xét xem thằng pokemon nào được chọn để hiển thị thông tin 
  id: number;         // id pokemon 
  isOpened: boolean;  // xác định trạng thái 
}
  // react function component 
  const App:React.FC = ()=> {  // chuyển thành arow function, Khai báo kiểu cho thăngf app
  
   
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);  // khởi tạo 1 biến là 1 mảng chứa các ob pokemon 
  // để đảm bảo load hết dữ liệu của phiên cũ mới load tiếp 
  // nếu là true thì hiển thị loading, nếu false thì hiển thị load more( dòng cuối cùng)
  const [loading, setLoading] = useState<boolean>(true);
  const [nextUrl, setNextUrl] = useState<string>("");  // set link cho trang kế tiếp 
  
  // khai báo thằng state phục vụ việc xem thông tin chi tiết của pokemon 
  // thằng setDetail sẽ được dùng đến trong component PokemonColection 
  // Thằng này là 1 global state 
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  });  // set giá trị đầu vào cho state 


  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );

      // trong đối tượng call api về có 1 trường dữ liệu next(url tiếp theo)
      setNextUrl(res.data.next);  // set link cho trang kế tiếp 
      // thằng res.result trả về 1 object, trong nó chứa 1 mảng 20 pokemon 
      res.data.results.forEach(async (pokemon: Pokemons) => { // set kiểu dữ liêụ cho biến đầu vào 
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((p) => [...p, poke.data]);  // set state mảng thông tin các pokemon bao gồm giá trị trc đó của nó 
                                             // và loại data tiếp theo 
      });
       
      setLoading(false);  // sau khi load xong 1 phiên=> set giá trị là false=> hiển thị load more 
    };
    getPokemon();
  }, []);
  console.log(pokemons)
  

  // hàm load đến trang tiếp theo 
  const nextPage = async () => {
    // khi user click vào hàm next page thì set true để hiển thị loading
    setLoading(true);
    let res = await axios.get(nextUrl);  // lấy data từ url đã setState bên trên 
    setNextUrl(res.data.next);  // set cho thằng tiếp theo 
    // lại call api và set lại mảng gồm data Pokemon để truyền vào Pokemon colection
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemons((p) => [...p, poke.data]);
      setLoading(false);// sau khi load xong thì hiển thị false

    });
  };

  return (      // thằng app là react function component
  //truyền đối số cho pokemon Colection thông qua prop và global state cũng vậy 
  <div className="App">
      <div className="container">
        <header className="pokemon-header"> Pokemon</header>
        <PokemonColection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setDetail={setDetail}
        />
        {!viewDetail.isOpened && (
          <div className="btn">
            <button onClick={nextPage}>
              {loading ? "Loading..." : "Load more"}{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
