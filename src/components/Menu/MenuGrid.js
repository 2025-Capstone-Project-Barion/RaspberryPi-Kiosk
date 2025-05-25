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

    // 선택된 카테고리에 따라 메뉴 아이템 애니메이션 (가볍게 최적화)
    const menuTrail = useTrail(menuItems.length, {
        from: {
            opacity: 0,
            transform: 'translateY(15px)'  // 이동 거리 더 줄임
        },
        to: {
            opacity: 1,
            transform: 'translateY(0)'
        },
        config: {
            tension: 800,  // 더 빠른 시작
            friction: 30,  // 최적화
            mass: 0.6,     // 매우 가볍게
        },
        trail: 3,    // 더 빠르게 연속 등장
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

    // 스크롤 위로 버튼 클릭 핸들러 - 성능 최적화
    const handleScrollUp = () => {
        if (!menuGridRef.current) return;

        const container = menuGridRef.current;
        const rowHeight = calculateRowHeight();

        // 현재 스크롤 위치
        const currentScroll = container.scrollTop;

        // 기존 기능 유지: 2행 위로 이동 (음수 방지)
        const targetScroll = Math.max(0, currentScroll - rowHeight * 2);

        // 부드러운 스크롤 대신 즉시 이동으로 변경 - 성능 최적화
        container.scrollTop = targetScroll;

        // 스크롤 후 버튼 상태 즉시 업데이트
        updateScrollButtonStates();
    };

    // 스크롤 아래로 버튼 클릭 핸들러 - 성능 최적화
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

        // 기존 기능 유지: 2행 아래로 이동 (최대치 초과 방지)
        const targetScroll = Math.min(
            scrollHeight - containerHeight,
            currentScroll + rowHeight * 2
        );

        // 부드러운 스크롤 대신 즉시 이동으로 변경 - 성능 최적화
        container.scrollTop = targetScroll;

        // 스크롤 후 버튼 상태 즉시 업데이트
        updateScrollButtonStates();
    };

    // 스크롤 버튼 상태 업데이트 함수 - 불필요한 계산 제거
    const updateScrollButtonStates = useCallback(() => {
        if (!menuGridRef.current) return;

        const container = menuGridRef.current;
        const scrollTop = container.scrollTop;
        const clientHeight = container.clientHeight;
        const scrollHeight = container.scrollHeight;

        // 더 위로 스크롤 가능한지 여부 - 단순 체크
        setCanScrollUp(scrollTop > 2);

        // 더 아래로 스크롤 가능한지 여부 - 단순 체크
        const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 2;
        setCanScrollDown(!isAtBottom);
    }, []);

    // 카테고리 변경 시 스크롤 맨 위로 이동
    useEffect(() => {
        if (menuGridRef.current) {
            menuGridRef.current.scrollTop = 0;
        }

        // 스크롤 버튼 상태 업데이트
        updateScrollButtonStates();
    }, [menuItems.length, updateScrollButtonStates]);

    // 스크롤 이벤트 리스너 최적화
    useEffect(() => {
        const currentMenuGrid = menuGridRef.current;

        // 스크롤 이벤트 핸들러 - 더 강력한 쓰로틀링
        const handleScroll = () => {
            if (!scrollTimer.current) {
                scrollTimer.current = setTimeout(() => {
                    updateScrollButtonStates();
                    scrollTimer.current = null;
                }, 100); // 더 긴 간격으로 쓰로틀링 적용
            }
        };

        if (currentMenuGrid) {
            currentMenuGrid.addEventListener('scroll', handleScroll, { passive: true });
        }

        return () => {
            if (currentMenuGrid) {
                currentMenuGrid.removeEventListener('scroll', handleScroll);
            }
            if (scrollTimer.current) {
                clearTimeout(scrollTimer.current);
            }
        };
    }, [updateScrollButtonStates]);

    // Hammer.js 터치 이벤트 핸들러 최적화
    useEffect(() => {
        if (menuHammerRef.current) {
            menuHammerRef.current.destroy();
        }

        if (menuGridRef.current) {
            menuHammerRef.current = new Hammer(menuGridRef.current);

            menuHammerRef.current.get('pan').set({
                direction: Hammer.DIRECTION_VERTICAL,
                threshold: 10 // 감도 낮춤 (높을수록 덜 민감)
            });

            // 터치 이벤트 최적화 - 성능 개선
            menuHammerRef.current.on('panup pandown', (ev) => {
                if (!menuGridRef.current) return;

                // 스크롤 속도 계수 - 성능 최적화
                const scrollSpeed = 2.0;

                // 이동 거리에 따라 스크롤 조정 (deltaY가 양수면 아래로, 음수면 위로)
                menuGridRef.current.scrollTop += ev.deltaY * scrollSpeed * -1;

                // 터치 이벤트 중에는 버튼 상태 업데이트 빈도 줄이기
                if (!scrollTimer.current) {
                    scrollTimer.current = setTimeout(() => {
                        updateScrollButtonStates();
                        scrollTimer.current = null;
                    }, 150); // 더 긴 간격
                }
            });
        }

        return () => {
            if (menuHammerRef.current) {
                menuHammerRef.current.destroy();
                menuHammerRef.current = null;
            }
        };
    }, [updateScrollButtonStates]);

    // 컴포넌트 마운트 시 초기 스크롤 상태 설정 - 리사이즈 이벤트 최적화
    useEffect(() => {
        updateScrollButtonStates();

        // 리사이즈 이벤트 핸들러 최적화
        const handleResize = () => {
            if (scrollTimer.current) clearTimeout(scrollTimer.current);
            scrollTimer.current = setTimeout(() => {
                updateScrollButtonStates();
                scrollTimer.current = null;
            }, 200); // 더 긴 지연 시간
        };

        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
            if (scrollTimer.current) {
                clearTimeout(scrollTimer.current);
            }
        };
    }, [updateScrollButtonStates]);

    // 음성 명령 스크롤 이벤트 리스너
    useEffect(() => {
        const handleVoiceScrollUp = () => {
            handleScrollUp();
        };

        const handleVoiceScrollDown = () => {
            handleScrollDown();
        };

        window.addEventListener('voice-scroll-up', handleVoiceScrollUp);
        window.addEventListener('voice-scroll-down', handleVoiceScrollDown);

        return () => {
            window.removeEventListener('voice-scroll-up', handleVoiceScrollUp);
            window.removeEventListener('voice-scroll-down', handleVoiceScrollDown);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  // 컴포넌트 마운트/언마운트 시에만 실행


    return (
        <MenuGridWrapper>
            <MenuGridContainer
                ref={menuGridRef}
                sx={{
                    touchAction: 'none',
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