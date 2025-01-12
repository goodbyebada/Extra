import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ClothesMemberItem from "@components/mocules/company/ClothesMemberItem";
import { dummyUserClothes } from "@api/dummyData";

type ClothesItem = {
  id: number;
  src: string;
  description: string;
};

/**
 * CompanyClothesMemberList : 업체 - 사용자 의상관리
 */

const CompanyClothesMemberList = () => {
  const navigate = useNavigate();

  const handleClick = (userId: string, clothes: ClothesItem[]) => {
    navigate("/company/clothes-approval", {
      state: { userId, clothes },
    });
  };

  return (
    <ClothesMemberList>
      {dummyUserClothes.map((item) => {
        return (
          <ClothesMemberItem
            key={item.userId}
            userId={item.userId}
            name={item.name}
            imageUrl={item.imageUrl}
            clothesNum={item.clothesNum}
            onClick={() => handleClick(item.userId, item.clothes)}
          />
        );
      })}
    </ClothesMemberList>
  );
};

export default CompanyClothesMemberList;

const ClothesMemberList = styled.div`
  width: 100%;
  padding: 20px;
  margin: 20px 0;
  flex: 1;
  overflow-y: auto;
`;
