import { useState, useRef, useEffect, useCallback } from 'react';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { useTrail, animated } from '@react-spring/web';
import Hammer from 'hammerjs';
import {
    MenuGridWrapper,
    MenuGridContainer,
    ScrollButtonContainer,
    ScrollButton,
    MenuCard,
    MenuImageContainer,
    MenuInfo,
    MenuName,
    MenuDescription,
    MenuPrice
} from '../../styles/Menu/MenuGridStyle';

/**
 * 메뉴 그리드 컴포넌트
 * @param {Object} props
 * @param {Array} props.menuItems - 표시할 메뉴 아이템 목록
 * @param {Function} props.onAddToCart - 장바구니 추가 함수
 * @param {boolean} props.isEntering - 페이지 입장 애니메이션 상태
 */
const MenuGrid = ({ menuItems, onAddToCart, isEntering }) => {
    // 카드 활성화 상태 추적 - 터치 피드백 개선
    const [activeCardId, setActiveCardId] = useState(null);
    // 카드 터치로 시작된 드래그 여부
    const [draggingFromCard, setDraggingFromCard] = useState(false);

    // 스크롤 관련 상태 추가
    const menuGridRef = useRef(null);
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(true);

    // Hammer.js 인스턴스 저장용 ref
    const menuHammerRef = useRef(null);

    // 스크롤 타이머 ref 추가 (스크롤 이벤트 성능 최적화용)
    const scrollTimer = useRef(null);

    // 선택된 카테고리에 따라 메뉴 아이템 애니메이션
    const menuTrail = useTrail(menuItems.length, {
        from: {
            opacity: 0,
            transform: 'translateY(5px)'  // 이동 거리 더 줄임
        },
        to: {
            opacity: 1,
            transform: 'translateY(0)'
        },
        config: {
            tension: 500,  // 매우 빠른 시작
            friction: 25,  // 최적화
            mass: 0.4,     // 매우 가볍게
        },
        delay: 30,   // 딜레이 최소화
        trail: 5,    // 더 빠르게 연속 등장
    });

    // 카드 터치 시작 시 활성화 상태 설정
    const handleCardTouchStart = (id, e) => {
        // 애니메이션 진행 중에는 상호작용 방지
        if (isEntering) return;

        if (e) {
            // 드래그 시작 위치 저장
            setDraggingFromCard(true);
        }
        setActiveCardId(id);
    };

    // 카드 터치 종료 시 활성화 상태 해제 및 장바구니 추가
    const handleCardTouchEnd = (item, e) => {
        if (e) {
            // 매우 짧은 시간의 터치만 클릭으로 간주
            if (!draggingFromCard) {
                onAddToCart(item);
            }
            setDraggingFromCard(false);
        }
        setActiveCardId(null);
    };

    // 다른 이벤트 핸들러에도 적용
    const handleCardClick = (item, e) => {
        // 애니메이션 진행 중에는 상호작용 방지
        if (isEntering) return;

        if (e) {
            // 모바일에서 터치 이벤트와 클릭 이벤트 중복 방지
            if ('ontouchstart' in window) {
                return;
            }
            onAddToCart(item);
        }
    };

    // 카드 터치 이동 핸들러
    const handleCardTouchMove = () => {
        // 드래그 상태로 설정
        setDraggingFromCard(true);
    };

    // 행의 높이를 계산하는 함수 - useCallback으로 메모이제이션
    const calculateRowHeight = useCallback(() => {
        // 카드 높이 (CSS와 동일하게 맞춤)
        const cardHeight = (window.innerHeight - 230) / 2;
        // 그리드 간격 (MenuGridContainer의 gap과 동일하게 32px 설정)
        const rowGap = 32;
        // 전체 행 높이 = 카드 높이 + 간격
        return cardHeight + rowGap;
    }, []);

    // 스크롤 위로 버튼 클릭 핸들러 - 정확한 행 단위 이동 보장
    const handleScrollUp = () => {
        if (!menuGridRef.current) return;

        const container = menuGridRef.current;
        const rowHeight = calculateRowHeight();

        // 현재 스크롤 위치
        const currentScroll = container.scrollTop;

        // 항상 정확히 2행 위로 이동 (음수 방지)
        const targetScroll = Math.max(0, currentScroll - (rowHeight * 2));

        container.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });

        // 스크롤 후 버튼 상태 업데이트 (애니메이션 완료 후)
        setTimeout(updateScrollButtonStates, 300);
    };

    // 스크롤 아래로 버튼 클릭 핸들러
    const handleScrollDown = () => {
        if (!menuGridRef.current) return;

        const container = menuGridRef.current;
        const rowHeight = calculateRowHeight();

        // 현재 스크롤 위치
        const currentScroll = container.scrollTop;

        // 컨테이너 내용물 전체 높이
        const scrollHeight = container.scrollHeight;
        // 컨테이너 높이
        const containerHeight = container.clientHeight;

        // 항상 정확히 2행 아래로 이동 (최대치 초과 방지)
        const targetScroll = Math.min(
            scrollHeight - containerHeight,
            currentScroll + (rowHeight * 2)
        );

        container.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });

        // 스크롤 후 버튼 상태 업데이트 (애니메이션 완료 후)
        setTimeout(updateScrollButtonStates, 300);
    };

    // 스크롤 버튼 상태 업데이트 함수 개선 - useCallback으로 메모이제이션
    const updateScrollButtonStates = useCallback(() => {
        if (!menuGridRef.current) return;

        const container = menuGridRef.current;
        const scrollTop = container.scrollTop;
        const clientHeight = container.clientHeight;
        const scrollHeight = container.scrollHeight;
        const rowHeight = calculateRowHeight();

        // 현재 행 위치 (소수점 자리까지 정확히 계산)
        const currentRowExact = scrollTop / rowHeight;

        // 더 위로 스크롤 가능한지 여부 - 정밀 계산
        // 현재 스크롤 위치가 아주 약간이라도 0보다 크면 위로 스크롤 가능
        setCanScrollUp(scrollTop > 2); // 매우 작은 오차 허용 (2px)

        // 더 아래로 스크롤 가능한지 여부 개선 - 정확한 바닥 감지
        // 스크롤 바닥 감지를 위한 정확한 계산
        const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 2; // 작은 오차 허용

        // 첫 번째 검사: 일반적인 행 기반 계산
        const visibleRows = Math.floor(clientHeight / rowHeight);
        const totalRows = Math.ceil(scrollHeight / rowHeight);
        let canScrollMore = currentRowExact + visibleRows < totalRows - 0.1; // 오차 허용

        // 두 번째 검사: 실제로 스크롤 바닥에 도달했는지 확인
        if (isAtBottom) canScrollMore = false;

        setCanScrollDown(canScrollMore);
    }, [calculateRowHeight]); // calculateRowHeight를 의존성 배열에 추가

    // 1. 카테고리 변경 시에만 스크롤을 맨 위로 이동하는 useEffect
    useEffect(() => {
        if (menuGridRef.current) {
            menuGridRef.current.scrollTop = 0;
        }

        // 약간의 지연 후 스크롤 버튼 상태 업데이트
        setTimeout(updateScrollButtonStates, 100);

        // 이미지 로드 완료 후 다시 체크
        setTimeout(updateScrollButtonStates, 500);
    }, [menuItems.length, updateScrollButtonStates]); // menuItems.length만 의존성으로 추가 - 카테고리 변경 시에만 실행

    // 2. 스크롤 이벤트 리스너 설정을 위한 useEffect
    useEffect(() => {
        // 현재 ref 값을 변수에 저장
        const currentMenuGrid = menuGridRef.current;

        // 스크롤 이벤트 핸들러 - 성능 개선
        const handleScroll = () => {
            // 쓰로틀링으로 성능 최적화
            if (!scrollTimer.current) {
                scrollTimer.current = setTimeout(() => {
                    updateScrollButtonStates();
                    scrollTimer.current = null;
                }, 50);
            }
        };

        if (currentMenuGrid) {
            currentMenuGrid.addEventListener('scroll', handleScroll, { passive: true });
            currentMenuGrid.addEventListener('touchmove', handleScroll, { passive: true });
        }

        return () => {
            if (currentMenuGrid) {
                currentMenuGrid.removeEventListener('scroll', handleScroll);
                currentMenuGrid.removeEventListener('touchmove', handleScroll);
            }
            // 타이머 정리
            if (scrollTimer.current) {
                clearTimeout(scrollTimer.current);
                scrollTimer.current = null;
            }
        };
    }, [updateScrollButtonStates]); // updateScrollButtonStates만 의존성으로 추가

    // Hammer.js를 이용한 터치 스크롤 구현
    useEffect(() => {
        // 기존 Hammer 인스턴스 정리
        if (menuHammerRef.current) {
            menuHammerRef.current.destroy();
        }

        // 메뉴 그리드에 Hammer.js 적용
        if (menuGridRef.current) {
            menuHammerRef.current = new Hammer(menuGridRef.current);

            // 세로 방향 패닝(swipe) 이벤트만 감지하도록 설정
            menuHammerRef.current.get('pan').set({
                direction: Hammer.DIRECTION_VERTICAL,
                threshold: 5 // 감도 조정 (낮을수록 민감)
            });

            // 패닝 이벤트 핸들러 등록
            menuHammerRef.current.on('panup pandown', (ev) => {
                if (!menuGridRef.current) return;

                // 스크롤 속도 계수 - 라즈베리파이 환경에 맞게 조정
                const scrollSpeed = 3.0;

                // 이동 거리에 따라 스크롤 조정 (deltaY가 양수면 아래로, 음수면 위로)
                menuGridRef.current.scrollTop += ev.deltaY * scrollSpeed * -1;

                // 수동 스크롤 위치 변경 후 버튼 상태 업데이트
                if (!scrollTimer.current) {
                    scrollTimer.current = setTimeout(() => {
                        updateScrollButtonStates();
                        scrollTimer.current = null;
                    }, 50);
                }
            });
        }

        // 클린업 함수
        return () => {
            if (menuHammerRef.current) {
                menuHammerRef.current.destroy();
                menuHammerRef.current = null;
            }
        };
    }, [updateScrollButtonStates]); // updateScrollButtonStates 의존성 추가

    // 컴포넌트 마운트 시 초기 스크롤 상태 설정
    useEffect(() => {
        // 컴포넌트 마운트 시 초기화
        updateScrollButtonStates();

        // 창 크기 변경 시 다시 계산
        const handleResize = () => {
            if (scrollTimer.current) clearTimeout(scrollTimer.current);
            scrollTimer.current = setTimeout(() => {
                updateScrollButtonStates();
                scrollTimer.current = null;
            }, 100);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (scrollTimer.current) {
                clearTimeout(scrollTimer.current);
            }
        };
    }, [updateScrollButtonStates]); // updateScrollButtonStates 추가

    return (
        <MenuGridWrapper>
            <MenuGridContainer
                ref={menuGridRef}
                sx={{
                    touchAction: 'none', // Hammer.js 사용 시 기본 터치 동작 비활성화
                }}
            >
                {menuTrail.map((style, index) => {
                    const item = menuItems[index];
                    return (
                        <animated.div key={item.menuId} style={style}>
                            <MenuCard
                                className="menu-card"
                                onTouchStart={(e) => handleCardTouchStart(item.menuId, e)}
                                onTouchMove={handleCardTouchMove}
                                onTouchEnd={(e) => handleCardTouchEnd(item, e)}
                                onClick={(e) => handleCardClick(item, e)}
                                sx={{
                                    transform: activeCardId === item.menuId ? 'scale(0.98)' : 'scale(1)',
                                    borderColor: activeCardId === item.menuId ? '#2142FF' : '#f0f2fa',
                                    transition: 'transform 0.15s ease-out, border-color 0.15s ease-out',
                                }}
                            >
                                <MenuImageContainer>
                                    {item.menuImage && (
                                        <img
                                            src={item.menuImage}
                                            alt={item.menuName}
                                            className="menu-image"
                                        />
                                    )}
                                </MenuImageContainer>
                                <MenuInfo>
                                    <div>
                                        <MenuName>{item.menuName}</MenuName>
                                        <MenuDescription>{item.description}</MenuDescription>
                                    </div>
                                    <MenuPrice>{item.price.toLocaleString()}원</MenuPrice>
                                </MenuInfo>
                            </MenuCard>
                        </animated.div>
                    );
                })}
            </MenuGridContainer>

            <ScrollButtonContainer>
                <ScrollButton
                    direction="up"
                    disabled={!canScrollUp}
                    onClick={handleScrollUp}
                    aria-label="위로 스크롤"
                >
                    <KeyboardArrowUp />
                </ScrollButton>
                <ScrollButton
                    direction="down"
                    disabled={!canScrollDown}
                    onClick={handleScrollDown}
                    aria-label="아래로 스크롤"
                >
                    <KeyboardArrowDown />
                </ScrollButton>
            </ScrollButtonContainer>
        </MenuGridWrapper>
    );
};

export default MenuGrid;