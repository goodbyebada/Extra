import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { RoleBodyType, Tattoo, TattooNames, Costume } from "@api/interface";
import Modal from "@components/atoms/Modal";
import { MainButton, BoxButton, SubButton } from "@components/atoms/Button";
import Text from "@components/atoms/Text";
import TypeSelector from "@components/mocules/company/TypeSelectorButton";
import CompanyClothesModal from "./CompanyClothesModal";

interface CompanyRoleModalProps {
  onSubmit: (role: RoleBodyType) => void;
  closeModal: () => void;
  isVisible: boolean;
  role?: RoleBodyType | null;
}

/**
 * 관리자 공고 화면 역할 상세 프로필(역할 등록) 모달
 *
 * role: 역할 정보(RoleBodyType)
 */

function CompanyRoleModal({
  onSubmit,
  closeModal,
  isVisible,
  role,
}: CompanyRoleModalProps) {
  const initialState: RoleBodyType = {
    id: role?.id || Date.now(),
    roleName: role?.roleName || "",
    costume: role?.costume || {
      roleName: "",
      season: "",
      etc: "",
      imageSrc: [],
    },
    sex: role?.sex || true,
    minAge: role?.minAge || "",
    maxAge: role?.maxAge || "",
    limitPersonnel: role?.limitPersonnel || 0,
    currentPersonnel: role?.currentPersonnel || 0,
    tattoo: role?.tattoo || {
      face: false,
      chest: false,
      arm: false,
      leg: false,
      shoulder: false,
      back: false,
      hand: false,
      feet: false,
    },
  };
  const [formState, setFormState] = useState<RoleBodyType>(initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isClothesModalVisible, setIsClothesModalVisible] = useState(false);

  const handleClothesSubmit = (costume: Costume) => {
    setFormState((prev) => ({
      ...prev,
      costume,
    }));
    setIsClothesModalVisible(false);
  };

  useEffect(() => {
    setFormState(role || initialState);
  }, [role]);

  useEffect(() => {
    const { roleName, minAge, maxAge, limitPersonnel, costume } = formState;
    setIsFormValid(
      roleName.trim() !== "" &&
        minAge.trim() !== "" &&
        maxAge.trim() !== "" &&
        limitPersonnel > 0 &&
        costume.season.trim() !== "" &&
        costume.etc.trim() !== "",
    );
  }, [formState]);

  const handleGenderSelect = (value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      sex: value === "남",
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTattooClick = (part: keyof Tattoo) => {
    setFormState((prevState) => ({
      ...prevState,
      tattoo: {
        ...prevState.tattoo,
        [part]: !prevState.tattoo[part],
      },
    }));
  };

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(formState);
      console.log(formState);
    }
  };

  const renderTattooRow = (startIndex: number, endIndex: number) => {
    return (
      <TattooRow>
        {Object.keys(TattooNames)
          .slice(startIndex, endIndex)
          .map((part, index) => (
            <BoxButton
              key={index}
              onClick={() => handleTattooClick(part as keyof Tattoo)}
              isActive={formState.tattoo[part as keyof Tattoo]}
            >
              {TattooNames[part as keyof Tattoo]}
            </BoxButton>
          ))}
      </TattooRow>
    );
  };

  return (
    <>
      <Modal isVisible={isVisible} onClose={closeModal}>
        <RoleBoxWrapper>
          <Row>
            <Text size={20} weight={900} color="#fff">
              1.성별 :
            </Text>
            <TypeSelector
              options={["남", "여"]}
              selected={formState.sex ? "남" : "여"}
              onSelect={handleGenderSelect}
            />
          </Row>
          <Row>
            <Text size={20} weight={900} color="#fff">
              2.나이 :
            </Text>
            <NumInput
              type="number"
              name="minAge"
              value={formState.minAge}
              onChange={handleChange}
            />
            <AgeSeparator>~</AgeSeparator>
            <NumInput
              type="number"
              name="maxAge"
              value={formState.maxAge}
              onChange={handleChange}
            />
          </Row>
          <Row>
            <Text size={20} weight={900} color="#fff">
              3.의상 :
            </Text>
            <SubButton
              width="140px"
              onClick={() => setIsClothesModalVisible(true)}
            >
              {formState.costume.season && formState.costume.etc
                ? "의상 등록 완료"
                : "의상 등록"}
            </SubButton>
          </Row>
          <Row>
            <Text size={20} weight={900} color="#fff">
              4.문신여부 :
            </Text>
            <TattooContainer>
              {renderTattooRow(0, 4)}
              {renderTattooRow(4, 8)}
            </TattooContainer>
          </Row>
          <Row>
            <Text size={20} weight={900} color="#fff">
              5.인원 :
            </Text>
            <NumInput
              type="number"
              name="limitPersonnel"
              value={formState.limitPersonnel}
              onChange={handleChange}
            />
          </Row>
        </RoleBoxWrapper>
        <MainButton isActive={isFormValid} onClick={handleSubmit}>
          확인
        </MainButton>
      </Modal>
      {isClothesModalVisible && (
        <CompanyClothesModal
          isVisible={isClothesModalVisible}
          closeModal={() => setIsClothesModalVisible(false)}
          onSubmit={handleClothesSubmit}
          roleName={formState.roleName}
          initialCostume={formState.costume}
        />
      )}
    </>
  );
}

export default CompanyRoleModal;

const RoleBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const NumInput = styled.input`
  width: 60px;
  height: 35px;
  text-align: center;
  background: transparent;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  border: none;
  outline: none;
  padding: 5px;
  margin: 5px 0;
`;

const AgeSeparator = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 900;
`;

const TattooContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 20px;
`;

const TattooRow = styled.div`
  display: flex;
  gap: 8px;
`;
