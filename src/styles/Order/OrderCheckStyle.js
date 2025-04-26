import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

// 주문 확인 컨테이너 - 반응형 설정
export const OrderCheckContainer = styled(Box)({
    width: '100%',  // 부모 요소 (다이얼로그)의 너비에 맞춤
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
});

// 주문 확인 헤더
export const OrderCheckHeader = styled(Box)({
    padding: '3vh 5%',  // 비율 단위 사용
    backgroundColor: '#f9f9f9',
    borderBottom: '1px solid #eee',
    '& h6': {
        fontWeight: 'bold',
        color: '#333',
        // ✅ 폰트 크기를 키울 수 있음
        fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',  // 반응형 폰트 크기
        textAlign: 'center'  // 텍스트 중앙 정렬 추가
    }
});

// 주문 항목 리스트 - 반응형 높이 설정
export const OrderItemsList = styled(Box)({
    // ✅ 이 값을 수정하여 항목 리스트 영역 크기를 키울 수 있음
    height: 'clamp(200px, 40vh, 350px)',  // 최소 200px, 화면 높이의 40%, 최대 350px
    overflowY: 'auto',
    padding: '0',
    '&::-webkit-scrollbar': {
        width: '8px'  // 터치에 적합하게 스크롤바 크기 증가
    },
    '&::-webkit-scrollbar-track': {
        background: '#f5f5f5',
        borderRadius: '4px'
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#c1c1c1',
        borderRadius: '4px'
    }
});

// 각 주문 항목 - 반응형 여백
export const OrderItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    padding: 'clamp(10px, 2vh, 15px) clamp(15px, 5%, 25px)',
    // 주문내역 각 항목의 경계선 밑줄 색상
    borderBottom: '1px solid #f5f5f5',
    '&:last-child': {
        borderBottom: 'none'
    }
});

// 주문 요약 - 반응형 여백
export const OrderSummary = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'clamp(12px, 2vh, 20px) clamp(15px, 5%, 25px)',
    borderTop: '2px solid #eee',
    backgroundColor: '#f9f9f9',
    '& .total-text': {
        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
        fontWeight: 'bold'
    }
});

// 버튼 영역 - 반응형 여백 및 버튼 크기
export const OrderFooter = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: 'clamp(12px, 2vh, 20px) clamp(15px, 5%, 25px)',
    borderTop: '1px solid #eee'
});

// 버튼 공통 스타일 - 반응형
const buttonStyle = {
    // ✅ 버튼 크기와 패딩을 키울 수 있음
    padding: 'clamp(10px, 2vh, 16px) clamp(20px, 5vw, 40px)',  // 패딩 증가
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',  // 폰트 크기 증가
    fontWeight: 'bold',
    borderRadius: '8px',
    minWidth: 'clamp(100px, 25%, 180px)',  // 최소 터치 영역 확보
    transition: 'transform 0.1s ease',
    '&:active': {
        transform: 'scale(0.95)'  // 터치 피드백
    }
};

// 돌아가기 버튼
export const BackButton = styled(Button)({
    ...buttonStyle,
    color: '#666',
    backgroundColor: '#eee',
    '&:hover': {
        backgroundColor: '#ddd'
    }
});

// 결제 버튼
export const PaymentButton = styled(Button)({
    ...buttonStyle,
    color: 'white',
    backgroundColor: '#2142FF',
    '&:hover': {
        backgroundColor: '#1935DB'
    }
});