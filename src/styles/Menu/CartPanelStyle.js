import styled from '@emotion/styled';
import { Box, Button, List } from '@mui/material';

// 장바구니 컨테이너 - 너비 증가 및 배리어프리 개선
export const CartContainer = styled(Box)({
    width: '400px', // 너비 증가
    minWidth: '400px',
    height: '100%', // 전체 높이로 변경
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    // 브랜드 컬러 액센트 추가
    borderTop: '4px solid #2142FF'
});

// 장바구니 헤더 - 배리어프리 개선
export const CartHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid #eef1fa',

    // 헤더 제목 스타일 개선
    '& h6': {
        fontSize: '1.3rem',
        fontWeight: 700,
        color: '#1A1A1A',
        // 이모지 삭제하고 텍스트만 중앙 정렬
        textAlign: 'center'
    }
});

// 장바구니 목록 - 배리어프리 개선
export const CartList = styled(List)({
    overflowY: 'auto',
    overflowX: 'hidden',
    flex: 1,
    // 터치 스크롤 최적화
    WebkitOverflowScrolling: 'touch',
    scrollBehavior: 'smooth',
    padding: '4px 0',

    // 스크롤바 스타일링 개선
    '&::-webkit-scrollbar': {
        width: '8px'
    },

    '&::-webkit-scrollbar-track': {
        background: '#f5f7ff',
        borderRadius: '4px'
    },

    '&::-webkit-scrollbar-thumb': {
        background: '#d0d7ff',
        borderRadius: '4px'
    }
});

// 장바구니 푸터 - 배리어프리 개선
export const CartFooter = styled(Box)({
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '2px solid #eef1fa',

    // 총 금액 표시 스타일 개선
    '& h6': {
        fontSize: '1.15rem',
        fontWeight: 600,
        color: '#333',
        marginBottom: '16px',

        // 금액 부분만 강조
        '& span': {
            color: '#2142FF',
            fontWeight: 700,
            fontSize: '1.25rem'
        }
    }
});

// 구매 버튼 - 배리어프리 개선
export const PurchaseButton = styled(Button)({
    width: '100%',
    marginTop: '16px !important',
    // 충분한 터치 영역 확보
    padding: '16px !important',
    fontSize: '1.2rem !important',
    fontWeight: '700 !important',
    letterSpacing: '-0.5px !important',
    // 현대적인 모서리 둥글기
    borderRadius: '14px !important',
    backgroundColor: '#2142FF !important',
    // 그림자 효과로 입체감 강화
    boxShadow: '0 4px 12px rgba(33, 66, 255, 0.25) !important',

    // 터치 피드백 애니메이션
    '&:active': {
        transform: 'scale(0.98) !important',
        boxShadow: '0 2px 8px rgba(33, 66, 255, 0.15) !important',
        transition: 'all 0.15s ease !important'
    },

    // 호버 효과 제거 - 터치 환경 최적화
    '&:hover': {
        backgroundColor: '#2142FF !important'
    }
});