import React, { useRef, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled';
import OrderCheck from './OrderCheck';
// Hammer.js 추가
import Hammer from 'hammerjs';

// 배리어프리 다이얼로그 스타일 - 터치 최적화
const StyledDialog = styled(Dialog)({
    '& .MuiDialog-paper': {
        // 모서리 둥글게 - 터치 친화적 UI
        borderRadius: '24px',
        overflow: 'hidden',
        // 그림자 강화 - 시각적 분리 명확히
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.18)',
        // 다이얼로그 여백 조정
        margin: '16px',

        // 충분한 크기 확보로 터치 정확도 향상
        width: '96vw',
        maxWidth: '700px',
        minWidth: '320px',

        // 높이 자동 조절
        height: 'auto',
        maxHeight: '88vh',

        // 다이얼로그 등장 애니메이션 - 부드러운 슬라이드 업
        animation: 'dialogSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        '@keyframes dialogSlideUp': {
            '0%': {
                opacity: 0,
                transform: 'translateY(30px)'
            },
            '100%': {
                opacity: 1,
                transform: 'translateY(0)'
            }
        }
    },
    // 배경 어둡게 - 다이얼로그 집중도 향상
    '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(18, 24, 38, 0.75)',
        backdropFilter: 'blur(5px)'
    }
});

/**
 * 주문 확인 다이얼로그 컴포넌트
 * @param {Object} props
 * @param {boolean} props.open - 다이얼로그 열림 상태
 * @param {Array} props.cartItems - 장바구니 항목
 * @param {Function} props.onClose - 닫기 함수
 * @param {Function} props.onPayment - 결제 함수
 */
const OrderCheckDialog = ({ open, cartItems, onClose, onPayment }) => {
    // 다이얼로그 내부 컨텐츠 ref
    const dialogContentRef = useRef(null);
    // Hammer.js 인스턴스 ref
    const hammerRef = useRef(null);

    // Hammer.js 초기화 및 설정
    useEffect(() => {
        // 다이얼로그가 열려있고, 내부 컨텐츠가 존재할 때만 실행
        if (open && dialogContentRef.current) {
            // 기존 Hammer 인스턴스 정리
            if (hammerRef.current) {
                hammerRef.current.destroy();
            }

            // 새로운 Hammer 인스턴스 생성
            hammerRef.current = new Hammer(dialogContentRef.current);

            // 세로 방향 패닝만 감지하도록 설정
            hammerRef.current.get('pan').set({
                direction: Hammer.DIRECTION_VERTICAL,
                threshold: 5 // 감도 조정
            });

            // 패닝 이벤트 핸들러 등록
            hammerRef.current.on('panup pandown', (ev) => {
                if (!dialogContentRef.current) return;

                // 스크롤 영역 찾기
                const scrollableElement = dialogContentRef.current.querySelector('.order-items-list');
                if (!scrollableElement) return;

                // 스크롤 속도 계수
                const scrollSpeed = 2.5;

                // 이동 거리에 따라 스크롤 조정
                scrollableElement.scrollTop += ev.deltaY * scrollSpeed * -1;
            });
        }

        // 클린업 함수
        return () => {
            if (hammerRef.current) {
                hammerRef.current.destroy();
                hammerRef.current = null;
            }
        };
    }, [open]); // open 상태가 변경될 때만 실행

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            fullWidth={false}
            aria-labelledby="order-check-dialog"
            // 어두운 배경 클릭 시 닫기 - 터치 환경 고려
            closeAfterTransition
        >
            <div ref={dialogContentRef} style={{ touchAction: 'none' }}>
                <OrderCheck
                    cartItems={cartItems}
                    onClose={onClose}
                    onPayment={onPayment}
                />
            </div>
        </StyledDialog>
    );
};

export default OrderCheckDialog;