import React, { useEffect, useState } from "react";
import { Detail } from "../App";
import "./pokemon.css";


// trung tâm của thằng này là thằng IsSelected 
interface Props {  // config thuộc tính truyền vào 
  viewDetail: Detail;  // global state 
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;  // global setState
  abilities:  // có hoặc không 
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
  name: string;
  id: number;
  image: string;
}

const PokemonList: React.FC<Props> = (props) => { // Props config biến truyền vào 
  const { name, id, image, abilities, viewDetail, setDetail } = props;  // khai báo biến nhận vào 
  const [isSelected, setSelected] = useState(false);  // thằng này là giá trị thể hiện tình trạng có đc chọn hay không 
  useEffect(() => {
    setSelected(id === viewDetail?.id);  // nếu id(trong props) == id(viewDetail) thì trả về true khi đó đối tượng này được chọn
    // thằng viewDeatail có thể không tồn taij vì người dùng có thể k chọn => Khi đó mặc định là false và đối tượng không đc chọn 
  }, [viewDetail]);
  // một ý rất hay của react hook là thằng này chỉ setSelected khi viewDetail thay đổi 
  const closeDetail = () => {  // config hàm đóng 
    setDetail({  // set lại state về không chọn thằng nào => về danh sách như ban đầu 
      id: 0,
      isOpened: false,
    });
  };
  return (
    <div className="">
        {/*Nếu được chọn thì hiển thị kiểu này , Không được chọn thì hiển thị tên và ảnh */}
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={closeDetail}> {/*set phím đong*/}
              X
            </p>
            <div className="detail-info">
              <img src={image} alt="pokemon" className="detail-img" />
              <p className="detail-name"> {name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability"> Ablities: </p>
              {/*hiển thị ability có thể có hoặc không*/}
              {abilities?.map((ab: any) => {
                return <div className=""> {ab.ability.name}</div>;
              })}  

            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name"> {name} </p>
          <img src={image} alt="pokemon" />
        </section>
      )}
    </div>
  );
};

export default PokemonList;