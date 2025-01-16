import { useState } from "react";
import styled from "styled-components";
import Text from "@components/atoms/Text";
import { MainButton } from "@components/atoms/Button";
import PostFormCard from "@components/mocules/company/PostFormCard";
import CompanyTitleCategoryModal from "@components/Modal/CompanyTitleCategoryModal";
import CompanyDateTimePlaceModal from "@components/Modal/CompanyDateTimePlaceModal";
import { type CategoryEnum } from "@api/interface";
import { useNavigate } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";
import NoticeRole from "@components/mocules/company/NoticeRole";
import { RoleBodyType } from "@api/interface";

/**
 * AddNotice : 업체 - 공고 등록 화면
 **/

function AddNotice() {
  const navigate = useNavigate();
  const [modals, setModals] = useState({
    title: false,
    date: false,
    roleName: false,
    role: false,
  });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<
    [keyof typeof CategoryEnum | null, string]
  >([null, ""]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [roleList, setRoleList] = useState<
    { roleName: string; details: RoleBodyType[] }[]
  >([]);

  const toggleModal = (modalName: keyof typeof modals, isOpen: boolean) => {
    setModals((prev) => ({ ...prev, [modalName]: isOpen }));
  };

  const goBackManager = () => {
    navigate("/manager-dashboard");
  };

  const submitTitleCategoryModal = (
    title: string,
    category: [keyof typeof CategoryEnum | null, string],
  ) => {
    setTitle(title);
    setCategory(category);
  };

  const submitDateTimePlaceModal = (
    date: string,
    time: string,
    place: string,
  ) => {
    setDate(date);
    setTime(time);
    setPlace(place);
  };

  const handleRoleListChange = (
    newRoleList: { roleName: string; details: RoleBodyType[] }[],
  ) => {
    setRoleList(newRoleList);
  };

  const handleRoleClick = () => {
    if (!title || category[0] === null) {
      alert("제목 및 카테고리를 먼저 입력해주세요.");
    } else if (!date || !time || !place) {
      alert("날짜, 시간, 장소를 먼저 입력해주세요.");
    } else {
      toggleModal("role", true);
    }
  };

  const handleDateClick = () => {
    if (!title || category[0] === null) {
      alert("제목 및 카테고리를 먼저 입력해주세요.");
    } else {
      toggleModal("date", true);
    }
  };

  const handleSubmit = () => {
    console.log({
      title,
      category,
      date,
      time,
      place,
      roleList,
    });
  };

  return (
    <>
      <Header>
        <IoCaretBackOutline size={40} onClick={goBackManager} />
        <Text size={25} color="#fff" weight={900}>
          공고 등록
        </Text>
      </Header>

      <Column>
        {/* 제목 및 카테고리 */}
        {title.length > 0 && category[0] !== null ? (
          <div>
            <Text size={32} color="#F5C001" weight={600}>
              {title}
            </Text>
            <Text size={16} color="#fff" weight={600}>
              {category[1]}
            </Text>
          </div>
        ) : (
          <PostFormCard
            title="제목, 카테고리"
            onClick={() => toggleModal("title", true)}
          />
        )}

        {/* 날짜, 시간, 장소 */}
        {date.length > 0 && time.length > 0 && place.length > 0 ? (
          <div>
            <Line />
            <Row>
              <Text size={16} weight={700} align="left">
                {time} 예정
              </Text>
              <Text size={16} weight={700} align="right">
                {date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$3")}
              </Text>
            </Row>
            <Text size={16} weight={700} align="left">
              {place}
            </Text>
            <Line />
          </div>
        ) : (
          <PostFormCard title="날짜, 시간, 장소" onClick={handleDateClick} />
        )}

        {/* 역할 */}
        {title && category[0] !== null && date && time && place ? (
          <NoticeRole
            roleList={roleList}
            onRoleListChange={handleRoleListChange}
          />
        ) : (
          <PostFormCard title="역할 추가" onClick={handleRoleClick} />
        )}

        <MainButton onClick={handleSubmit}>확인</MainButton>
      </Column>

      <CompanyTitleCategoryModal
        isVisible={modals.title}
        onSubmit={submitTitleCategoryModal}
        closeModal={() => toggleModal("title", false)}
      />
      <CompanyDateTimePlaceModal
        isVisible={modals.date}
        onSubmit={submitDateTimePlaceModal}
        closeModal={() => toggleModal("date", false)}
      />
    </>
  );
}

export default AddNotice;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;

const Line = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: #fff;
  margin: 18px 0;
`;
