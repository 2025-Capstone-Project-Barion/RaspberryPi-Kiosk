import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

// 주문 확인 컨테이너 - 반응형 설정 + 배리어프리 개선
export const OrderCheckContainer = styled(Box)({
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    // 모서리 둥글게 - 터치 친화적 UI
    borderRadius: '20px',
    // 그림자 효과로 깊이감 추가
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
});

// 주문 확인 헤더 - 배리어프리 UI 개선
export const OrderCheckHeader = styled(Box)({
    padding: '28px 24px',
    backgroundColor: 'white',
    borderBottom: '1px solid #eff2f5',
    textAlign: 'center',
    // 내부 여백 증가로 가독성 향상
    '& h5': {
        margin: '0 0 6px 0',
    }
});

// 주문 항목 리스트 - 터치 스크롤 최적화
export const OrderItemsList = styled(Box)({
    // 높이 조정으로 충분한 스크롤 공간 확보
    height: 'clamp(250px, 40vh, 350px)',
    overflowY: 'auto',
    padding: '0',

    // 터치 스크롤 최적화
    WebkitOverflowScrolling: 'touch',
    scrollBehavior: 'smooth',

    // 스크롤바 스타일 개선
    '&::-webkit-scrollbar': {
        width: '8px'
    },
    '&::-webkit-scrollbar-track': {
        background: '#f9f9ff',
        borderRadius: '4px'
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#d0d7ff',
        borderRadius: '4px'
    }
});

// 각 주문 항목 - 불필요한 터치 효과 제거
export const OrderItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    // 충분한 영역 확보를 위해 패딩 유지
    padding: '18px 24px',
    borderBottom: '1px solid #f7f8fc',
    '&:last-child': {
        borderBottom: 'none'
    }
});

// 주문 요약 영역
export const OrderSummary = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // 여백 확대로 시각적 구분 강화
    padding: '22px 24px',
    // 섹션 구분을 위한 배경색 적용
    backgroundColor: '#f9faff',
    borderTop: '1px solid #eef1ff'
});

// 버튼 영역 - 터치 환경에 맞게 여백 확대
export const OrderFooter = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    // 버튼 간 여백 확대 및 하단 여백 충분히
    padding: '24px',
    borderTop: '1px solid #eff2f5'
});

// 돌아가기 버튼 - 터치 최적화
export const BackButton = styled(Button)({
    color: '#555',
    backgroundColor: 'white',
    // 충분한 터치 영역
    minWidth: '130px',
    // 터치 피드백 애니메이션
    transition: 'all 0.2s ease',
    // 불필요한 호버 제거, 클릭/터치 시에만 피드백
    '&:hover': {
        backgroundColor: 'white'
    }
});

// 결제 버튼 - 터치 최적화 및 강조
export const PaymentButton = styled(Button)({
    color: 'white',
    backgroundColor: '#2142FF',
    // 충분한 터치 영역
    minWidth: '150px',
    // 터치 피드백 애니메이션
    transition: 'all 0.2s ease',
    // 불필요한 호버 제거, 클릭/터치 시에만 피드백
    '&:hover': {
        backgroundColor: '#2142FF'
    }
});