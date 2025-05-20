// API 기본 URL
const API_BASE_URL = "http://13.209.99.95:8080";

// 카테고리 데이터
export const categories = [
    {
        categoryId: 0,
        categoryName: 'Coffee'
    },
    {
        categoryId: 1,
        categoryName: 'Non Coffee'
    },
    {
        categoryId: 2,
        categoryName: 'Dessert'
    },
    {
        categoryId: 3,
        categoryName: 'Bakery'
    }
];

// 초기 상태 - fetchMenuItems에 의해 업데이트될 수 있으나, getMenuItems는 로컬 스토리지를 우선 참조
export let menuItems = {
    content: []
};

// 백엔드 API에서 메뉴 데이터를 가져오는 함수
export const fetchMenuItems = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/menus`);

        if (!response.ok) {
            throw new Error(`API 요청 실패: ${response.status}`);
        }

        const data = await response.json();

        // API 응답 구조가 원래 구조와 호환되도록 필요한 필드 매핑
        data.content = data.content.map(item => ({
            ...item,
            description: item.menuPresent // menuPresent를 description으로 매핑
        }));

        // 전역 메뉴 데이터 업데이트 (다른 곳에서 참조할 경우를 위해 유지)
        menuItems = data;

        // 로컬 스토리지에 저장 - 이 부분을 추가
        localStorage.setItem('menuData', JSON.stringify(data));

        console.log("메뉴 데이터 API 통해 로드 완료:", menuItems.content.length);
    } catch (error) {
        console.error("메뉴 데이터 API 통해 로드 실패:", error);
        // 로드 실패 시 빈 객체 반환하여 content 접근 시 오류 방지
        return { content: [] };
    }
};

// 카테고리별 메뉴 아이템 가져오기 (로컬 스토리지 우선)
export const getMenuItems = (categoryId) => {
    const storedMenuData = localStorage.getItem('menuData');
    let itemsToFilter = [];

    if (storedMenuData) {
        try {
            const parsedMenuData = JSON.parse(storedMenuData);
            // parsedMenuData와 parsedMenuData.content가 유효한지 확인
            if (parsedMenuData && Array.isArray(parsedMenuData.content)) {
                itemsToFilter = parsedMenuData.content;
            } else {
                console.warn("로컬 스토리지의 메뉴 데이터 형식이 올바르지 않습니다. (content 배열 부재 또는 잘못된 형식). 빈 메뉴가 표시될 수 있습니다.");
            }
        } catch (error) {
            console.error("로컬 스토리지 메뉴 데이터 파싱 실패:", error, "빈 메뉴가 표시될 수 있습니다.");
        }
    } else {
        console.warn("로컬 스토리지에 메뉴 데이터가 없습니다. FrontPage에서 로고를 클릭하여 데이터를 로드해주세요. 빈 메뉴가 표시될 수 있습니다.");
    }

    return itemsToFilter.filter(item => item.category === categoryId);
};

// 전체 카테고리 가져오기
export const getAllCategories = () => {
    return categories;
};

// // 이미지 import (WebP 형식)
// import 아메리카노Img from '../assets/Image/MenuImages/coffee/아메리카노.jpg';
// import 에스프레소Img from '../assets/Image/MenuImages/coffee/에스프레소.jpg';
// import 아이스커피Img from '../assets/Image/MenuImages/coffee/아이스커피.jpg';
// import 콜드브루Img from '../assets/Image/MenuImages/coffee/콜드브루.jpg';
// import 핸드드립Img from '../assets/Image/MenuImages/coffee/핸드드립.jpg';
// import 카페라떼Img from '../assets/Image/MenuImages/coffee/카페라떼.jpg';
// import 바닐라라떼Img from '../assets/Image/MenuImages/coffee/바닐라라떼.jpg';
// import 카푸치노Img from '../assets/Image/MenuImages/coffee/카푸치노.jpg';
// import 돌체라떼Img from '../assets/Image/MenuImages/coffee/돌체라떼.jpg';
// import 플랫화이트Img from '../assets/Image/MenuImages/coffee/플랫화이트.jpg';
// import 연유라떼Img from '../assets/Image/MenuImages/coffee/연유라떼.jpg';
// import 코코넛라떼Img from '../assets/Image/MenuImages/coffee/코코넛라떼.jpg';
// import 카페모카Img from '../assets/Image/MenuImages/coffee/카페모카.jpg';
// import 민트모카Img from '../assets/Image/MenuImages/coffee/민트모카.jpg';
// import 화이트모카Img from '../assets/Image/MenuImages/coffee/화이트모카.jpg';

// import 밀크티Img from '../assets/Image/MenuImages/nonCoffee/밀크티.jpg';
// import 버블티Img from '../assets/Image/MenuImages/nonCoffee/버블티.jpg';
// import 핫초코Img from '../assets/Image/MenuImages/nonCoffee/핫초코.jpg';
// import 생강차Img from '../assets/Image/MenuImages/nonCoffee/생강차.jpg';
// import 라벤더티Img from '../assets/Image/MenuImages/nonCoffee/라벤더티.jpg';
// import 유자차Img from '../assets/Image/MenuImages/nonCoffee/유자차.jpg';
// import 녹차라떼Img from '../assets/Image/MenuImages/nonCoffee/녹차라떼.jpg';
// import 고구마라떼Img from '../assets/Image/MenuImages/nonCoffee/고구마라떼.jpg';
// import 곡물라떼Img from '../assets/Image/MenuImages/nonCoffee/곡물라떼.jpg';
// import 아이스티Img from '../assets/Image/MenuImages/nonCoffee/아이스티.jpg';
// import 프라페Img from '../assets/Image/MenuImages/nonCoffee/프라페.jpg';
// import 미숫가루Img from '../assets/Image/MenuImages/nonCoffee/미숫가루.jpg';
// import 딸기스무디Img from '../assets/Image/MenuImages/nonCoffee/딸기스무디.jpg';
// import 망고스무디Img from '../assets/Image/MenuImages/nonCoffee/망고스무디.jpg';
// import 자몽에이드Img from '../assets/Image/MenuImages/nonCoffee/자몽에이드.jpg';
// import 레몬에이드Img from '../assets/Image/MenuImages/nonCoffee/레몬에이드.jpg';
// import 청포도에이드Img from '../assets/Image/MenuImages/nonCoffee/청포도에이드.jpg';

// import 마카롱Img from '../assets/Image/MenuImages/dessert/마카롱.jpg';
// import 푸딩Img from '../assets/Image/MenuImages/dessert/푸딩.jpg';
// import 약과Img from '../assets/Image/MenuImages/dessert/약과.jpg';
// import 크로플Img from '../assets/Image/MenuImages/dessert/크로플.jpg';
// import 치즈케이크Img from '../assets/Image/MenuImages/dessert/치즈케이크.jpg';
// import 브라우니Img from '../assets/Image/MenuImages/dessert/브라우니.jpg';
// import 마들렌Img from '../assets/Image/MenuImages/dessert/마들렌.jpg';
// import 티라미수Img from '../assets/Image/MenuImages/dessert/티라미수.jpg';

// import 베이글Img from '../assets/Image/MenuImages/bakery/베이글.jpg';
// import 소금빵Img from '../assets/Image/MenuImages/bakery/소금빵.jpg';
// import 모카번Img from '../assets/Image/MenuImages/bakery/모카번.jpg';
// import 바게트Img from '../assets/Image/MenuImages/bakery/바게트.jpg';
// import 크로아상Img from '../assets/Image/MenuImages/bakery/크로아상.jpg';
// import 초코머핀Img from '../assets/Image/MenuImages/bakery/초코머핀.jpg';
// import 단팥빵Img from '../assets/Image/MenuImages/bakery/단팥빵.jpg';
// import 크림빵Img from '../assets/Image/MenuImages/bakery/크림빵.jpg';
// import 샌드위치Img from '../assets/Image/MenuImages/bakery/샌드위치.jpg';
// import 꽈배기Img from '../assets/Image/MenuImages/bakery/꽈배기.jpg';
// import 소보로빵Img from '../assets/Image/MenuImages/bakery/소보로빵.jpg';
// import 피자빵Img from '../assets/Image/MenuImages/bakery/피자빵.jpg';

// /**
//  * API 명세에 맞춘 카테고리 데이터
//  */
// // ... (주석 처리된 기존 categories 데이터는 상단 정의와 중복되므로 생략 가능) ...

// /**
//  * API 명세에 맞춘 메뉴 데이터
//  */
// // ... (주석 처리된 기존 menuItems 데이터 예시) ...

// // 추후 API 연동을 위한 함수들
// // ... (주석 처리된 기존 getMenuItems, getAllCategories 함수는 상단 정의와 중복) ...