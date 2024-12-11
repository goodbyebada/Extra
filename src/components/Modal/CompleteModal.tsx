import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import multiply from "@assets/Multiply.png";
import approval from "@assets/Approval.png";
import { sendMessage } from "@api/utils";
// import { useNavigate } from "react-router-dom";

interface ModalContent {
  prefix: string;
}

const modalContent: Record<string, ModalContent> = {
  supportComplete: {
    prefix: "지원이",
  },
  supportCancel: {
    prefix: "지원 취소가",
  },
};

interface CompleteModalProps {
  type: keyof typeof modalContent;
  closeModal: () => void;
}

// RN 라우팅
const navigate = (type: string) => {
  sendMessage({
    type,
    version: "1.0",
  });
};

const CompleteModal: React.FC<CompleteModalProps> = ({
  type,
  closeModal,
}: CompleteModalProps) => {
  const content = modalContent[type];
  // const navigate = useNavigate();

  // web에서는 정상작동
  // RN 구현 따로 해야함
  // const homePath = "/";
  // const mySupportStatusPath = "/member/manage";

  return (
    <ModalContainer>
      <MultiplyIcon src={multiply} onClick={closeModal} />
      <ModalText>
        {content.prefix} <br /> 완료되었어요!
      </ModalText>
      <ApprovalIcon src={approval} />
      <ButtonContainer>
        <Btn
          onClick={() => {
            navigate("NAVIGATION_HOME");
          }}
        >
          홈 화면 가기
        </Btn>
        <Btn
          onClick={() => {
            navigate("NAVIGATION_MANAGE");
          }}
        >
          내 지원 현황 보기
        </Btn>
      </ButtonContainer>
    </ModalContainer>
  );
};

CompleteModal.propTypes = {
  type: PropTypes.oneOf(Object.keys(modalContent)).isRequired,
};

export default CompleteModal;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 345px;
  height: 537px;
  flex-shrink: 0;
  border-radius: 18px;
  z-index: 10;
  background:
    linear-gradient(#000, #000) padding-box,
    linear-gradient(180deg, #666666 0%, #f5c001 100%) border-box;
  border: 4px solid transparent;
`;

const MultiplyIcon = styled.img`
  position: absolute;
  top: 18px;
  right: 23px;
`;

const ModalText = styled.div`
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 33px;
  font-style: normal;
  font-weight: 700;
  line-height: 45px;
  margin-top: 105px;
`;

const ApprovalIcon = styled.img`
  display: block;
  margin: 0px auto;
  padding-top: 24px;
  padding-bottom: 68px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Btn = styled.button`
  width: 299px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 18px;
  background: #f5c001;
  color: #000;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  display: block;
  margin: 0px auto;
`;
