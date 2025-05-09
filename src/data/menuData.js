// 이미지 import (WebP 형식)
import 아메리카노Img from '../assets/Image/MenuImages/coffee/아메리카노.jpg';
import 에스프레소Img from '../assets/Image/MenuImages/coffee/에스프레소.jpg';
import 아이스커피Img from '../assets/Image/MenuImages/coffee/아이스커피.jpg';
import 콜드브루Img from '../assets/Image/MenuImages/coffee/콜드브루.jpg';
import 핸드드립Img from '../assets/Image/MenuImages/coffee/핸드드립.jpg';
import 카페라떼Img from '../assets/Image/MenuImages/coffee/카페라떼.jpg';
import 바닐라라떼Img from '../assets/Image/MenuImages/coffee/바닐라라떼.jpg';
import 카푸치노Img from '../assets/Image/MenuImages/coffee/카푸치노.jpg';
import 돌체라떼Img from '../assets/Image/MenuImages/coffee/돌체라떼.jpg';
import 플랫화이트Img from '../assets/Image/MenuImages/coffee/플랫화이트.jpg';
import 연유라떼Img from '../assets/Image/MenuImages/coffee/연유라떼.jpg';
import 코코넛라떼Img from '../assets/Image/MenuImages/coffee/코코넛라떼.jpg';
import 카페모카Img from '../assets/Image/MenuImages/coffee/카페모카.jpg';
import 민트모카Img from '../assets/Image/MenuImages/coffee/민트모카.jpg';
import 화이트모카Img from '../assets/Image/MenuImages/coffee/화이트모카.jpg';

import 밀크티Img from '../assets/Image/MenuImages/nonCoffee/밀크티.jpg';
import 버블티Img from '../assets/Image/MenuImages/nonCoffee/버블티.jpg';
import 핫초코Img from '../assets/Image/MenuImages/nonCoffee/핫초코.jpg';
import 생강차Img from '../assets/Image/MenuImages/nonCoffee/생강차.jpg';
import 라벤더티Img from '../assets/Image/MenuImages/nonCoffee/라벤더티.jpg';
import 유자차Img from '../assets/Image/MenuImages/nonCoffee/유자차.jpg';
import 녹차라떼Img from '../assets/Image/MenuImages/nonCoffee/녹차라떼.jpg';
import 고구마라떼Img from '../assets/Image/MenuImages/nonCoffee/고구마라떼.jpg';
import 곡물라떼Img from '../assets/Image/MenuImages/nonCoffee/곡물라떼.jpg';
import 아이스티Img from '../assets/Image/MenuImages/nonCoffee/아이스티.jpg';
import 프라페Img from '../assets/Image/MenuImages/nonCoffee/프라페.jpg';
import 미숫가루Img from '../assets/Image/MenuImages/nonCoffee/미숫가루.jpg';
import 딸기스무디Img from '../assets/Image/MenuImages/nonCoffee/딸기스무디.jpg';
import 망고스무디Img from '../assets/Image/MenuImages/nonCoffee/망고스무디.jpg';
import 자몽에이드Img from '../assets/Image/MenuImages/nonCoffee/자몽에이드.jpg';
import 레몬에이드Img from '../assets/Image/MenuImages/nonCoffee/레몬에이드.jpg';
import 청포도에이드Img from '../assets/Image/MenuImages/nonCoffee/청포도에이드.jpg';

import 마카롱Img from '../assets/Image/MenuImages/dessert/마카롱.jpg';
import 푸딩Img from '../assets/Image/MenuImages/dessert/푸딩.jpg';
import 약과Img from '../assets/Image/MenuImages/dessert/약과.jpg';
import 크로플Img from '../assets/Image/MenuImages/dessert/크로플.jpg';
import 치즈케이크Img from '../assets/Image/MenuImages/dessert/치즈케이크.jpg';
import 브라우니Img from '../assets/Image/MenuImages/dessert/브라우니.jpg';
import 마들렌Img from '../assets/Image/MenuImages/dessert/마들렌.jpg';
import 티라미수Img from '../assets/Image/MenuImages/dessert/티라미수.jpg';

import 베이글Img from '../assets/Image/MenuImages/bakery/베이글.jpg';
import 소금빵Img from '../assets/Image/MenuImages/bakery/소금빵.jpg';
import 모카번Img from '../assets/Image/MenuImages/bakery/모카번.jpg';
import 바게트Img from '../assets/Image/MenuImages/bakery/바게트.jpg';
import 크로아상Img from '../assets/Image/MenuImages/bakery/크로아상.jpg';
import 초코머핀Img from '../assets/Image/MenuImages/bakery/초코머핀.jpg';
import 단팥빵Img from '../assets/Image/MenuImages/bakery/단팥빵.jpg';
import 크림빵Img from '../assets/Image/MenuImages/bakery/크림빵.jpg';
import 샌드위치Img from '../assets/Image/MenuImages/bakery/샌드위치.jpg';
import 꽈배기Img from '../assets/Image/MenuImages/bakery/꽈배기.jpg';
import 소보로빵Img from '../assets/Image/MenuImages/bakery/소보로빵.jpg';
import 피자빵Img from '../assets/Image/MenuImages/bakery/피자빵.jpg';

/**
 * API 명세에 맞춘 카테고리 데이터
 */
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

/**
 * API 명세에 맞춘 메뉴 데이터
 */
export const menuItems = {

    content: [
        // Coffee (category: 0)
        // menuId: 0 ~ 18 까지가 커피 카테고리 메뉴
        // menuId: 0 ~ 14 까지가 고정 디폴트 메뉴(추가, 삭제, 수정 불가)
        // menuId: 15 ~ 18 까지가 유동 메뉴(추가, 삭제, 수정 가능) 수정은 가격, 설명, 이미지만 가능.
        {
            menuId: 0,
            category: 0,
            menuName: "아메리카노",
            price: 3500,
            description: "깊은 풍미의 에스프레소와 물의 조화",
            menuImage: 아메리카노Img
        },
        {
            menuId: 1,
            category: 0,
            menuName: "에스프레소",
            price: 3000,
            description: "진하고 강렬한 커피의 기본",
            menuImage: 에스프레소Img
        },
        {
            menuId: 2,
            category: 0,
            menuName: "아이스커피",
            price: 4000,
            description: "시원하고 깔끔한 맛의 아이스커피",
            menuImage: 아이스커피Img
        },
        {
            menuId: 3,
            category: 0,
            menuName: "콜드브루",
            price: 4800,
            description: "차가운 물로 오랫동안 추출한 깔끔한 커피",
            menuImage: 콜드브루Img
        },
        {
            menuId: 4,
            category: 0,
            menuName: "핸드드립",
            price: 5500,
            description: "정성스럽게 한 잔씩 내린 프리미엄 커피",
            menuImage: 핸드드립Img
        },
        {
            menuId: 5,
            category: 0,
            menuName: "카페라떼",
            price: 4000,
            description: "진한 에스프레소와 부드러운 우유의 만남",
            menuImage: 카페라떼Img
        },
        {
            menuId: 6,
            category: 0,
            menuName: "바닐라라떼",
            price: 4300,
            description: "부드러운 바닐라의 향과 에스프레소의 조화",
            menuImage: 바닐라라떼Img
        },
        {
            menuId: 7,
            category: 0,
            menuName: "카푸치노",
            price: 4700,
            description: "풍성한 우유 거품이 특징인 부드러운 커피",
            menuImage: 카푸치노Img
        },
        {
            menuId: 8,
            category: 0,
            menuName: "돌체라떼",
            price: 5000,
            description: "연유의 달콤함과 에스프레소의 풍미",
            menuImage: 돌체라떼Img
        },
        {
            menuId: 9,
            category: 0,
            menuName: "플랫화이트",
            price: 4200,
            description: "진한 에스프레소와 실키한 우유의 조화",
            menuImage: 플랫화이트Img
        },
        {
            menuId: 10,
            category: 0,
            menuName: "연유라떼",
            price: 4500,
            description: "달콤한 연유가 들어간 부드러운 라떼",
            menuImage: 연유라떼Img
        },
        {
            menuId: 11,
            category: 0,
            menuName: "코코넛라떼",
            price: 4700,
            description: "상큼한 코코넛 맛이 어우러진 라떼",
            menuImage: 코코넛라떼Img
        },
        {
            menuId: 12,
            category: 0,
            menuName: "카페모카",
            price: 4500,
            description: "달콤한 초콜릿과 에스프레소의 환상적인 조합",
            menuImage: 카페모카Img
        },
        {
            menuId: 13,
            category: 0,
            menuName: "민트모카",
            price: 4900,
            description: "상쾌한 민트와 초콜릿의 조화",
            menuImage: 민트모카Img
        },
        {
            menuId: 14,
            category: 0,
            menuName: "화이트모카",
            price: 5000,
            description: "부드러운 화이트 초콜릿과 에스프레소의 만남",
            menuImage: 화이트모카Img
        },

        // 유동 메뉴 - Coffee 카테고리
        /*
        {
            menuId: 15,
            category: 0,
            menuName: "아포가토",
            price: 5800,
            description: "바닐라 아이스크림에 에스프레소를 부은 디저트 커피",
            menuImage: 아포가토Img
        },
        {
            menuId: 16,
            category: 0,
            menuName: "마키아토",
            price: 5000,
            description: "달콤한 카라멜과 에스프레소의 조화",
            menuImage: 마키아토Img
        },
        {
            menuId: 17,
            category: 0,
            menuName: "아인슈페너",
            price: 5200,
            description: "빈티지한 독일식 커피 음료",
            menuImage: 아인슈페너Img
        },
        {
            menuId: 18,
            category: 0,
            menuName: "비엔나커피",
            price: 4800,
            description: "휘핑크림이 올라간 고급스러운 커피",
            menuImage: 비엔나커피Img
        },
        */

        // Non Coffee (category: 1)
        // menuId: 19 ~ 39 까지가 논커피 카테고리 메뉴
        // menuId: 19 ~ 35 까지가 고정 디폴트 메뉴(추가, 삭제, 수정 불가)
        // menuId: 36 ~ 39 까지가 유동 메뉴(추가, 삭제, 수정 가능) 수정은 가격, 설명, 이미지만 가능.
        {
            menuId: 19,
            category: 1,
            menuName: "밀크티",
            price: 4300,
            description: "홍차와 우유의 클래식한 조합",
            menuImage: 밀크티Img
        },
        {
            menuId: 20,
            category: 1,
            menuName: "버블티",
            price: 5000,
            description: "부드러운 밀크티와 쫄깃한 타피오카 펄의 조화",
            menuImage: 버블티Img
        },
        {
            menuId: 21,
            category: 1,
            menuName: "핫초코",
            price: 4500,
            description: "부드럽고 달콤한 진한 초콜릿 음료",
            menuImage: 핫초코Img
        },
        {
            menuId: 22,
            category: 1,
            menuName: "생강차",
            price: 4500,
            description: "따뜻하고 건강한 생강 향의 차",
            menuImage: 생강차Img
        },
        {
            menuId: 23,
            category: 1,
            menuName: "라벤더 티",
            price: 4500,
            description: "은은한 라벤더 향이 가득한 허브차",
            menuImage: 라벤더티Img
        },
        {
            menuId: 24,
            category: 1,
            menuName: "유자차",
            price: 5000,
            description: "상큼한 유자 맛이 가득한 따뜻한 차",
            menuImage: 유자차Img
        },
        {
            menuId: 25,
            category: 1,
            menuName: "녹차 라떼",
            price: 4800,
            description: "진한 녹차와 부드러운 우유의 조합",
            menuImage: 녹차라떼Img
        },
        {
            menuId: 26,
            category: 1,
            menuName: "고구마 라떼",
            price: 4700,
            description: "달콤한 고구마 맛이 듬뿍 들어간 라떼",
            menuImage: 고구마라떼Img
        },
        {
            menuId: 27,
            category: 1,
            menuName: "곡물 라떼",
            price: 4500,
            description: "고소한 곡물 향이 가득한 라떼",
            menuImage: 곡물라떼Img
        },
        {
            menuId: 28,
            category: 1,
            menuName: "아이스티",
            price: 4500,
            description: "향긋한 복숭아향의 시원한 아이스티",
            menuImage: 아이스티Img
        },
        {
            menuId: 29,
            category: 1,
            menuName: "프라페",
            price: 5500,
            description: "달콤하고 시원한 초콜릿 블렌디드 음료",
            menuImage: 프라페Img
        },
        {
            menuId: 30,
            category: 1,
            menuName: "미숫가루",
            price: 4500,
            description: "고소한 곡물 맛이 가득한 전통 음료",
            menuImage: 미숫가루Img
        },
        {
            menuId: 31,
            category: 1,
            menuName: "딸기 스무디",
            price: 5500,
            description: "신선한 딸기의 상큼함이 가득한 스무디",
            menuImage: 딸기스무디Img
        },
        {
            menuId: 32,
            category: 1,
            menuName: "망고 스무디",
            price: 5500,
            description: "달콤한 망고의 풍미가 가득한 스무디",
            menuImage: 망고스무디Img
        },
        {
            menuId: 33,
            category: 1,
            menuName: "자몽 에이드",
            price: 4800,
            description: "상큼한 자몽의 맛이 가득한 시원한 에이드",
            menuImage: 자몽에이드Img
        },
        {
            menuId: 34,
            category: 1,
            menuName: "레몬 에이드",
            price: 4800,
            description: "상큼한 레몬의 맛이 가득한 시원한 에이드",
            menuImage: 레몬에이드Img
        },
        {
            menuId: 35,
            category: 1,
            menuName: "청포도 에이드",
            price: 4800,
            description: "상큼한 청포도의 맛이 가득한 에이드",
            menuImage: 청포도에이드Img
        },

        // 유동 메뉴 - Non Coffee 카테고리
        /*
        {
            menuId: 36,
            category: 1,
            menuName: "유자 에이드",
            price: 4800,
            description: "상큼한 유자 맛이 가득한 에이드",
            menuImage: 유자에이드Img
        },
        {
            menuId: 37,
            category: 1,
            menuName: "포도 주스",
            price: 4000,
            description: "신선한 포도의 달콤함이 가득한 주스",
            menuImage: 포도주스Img
        },
        {
            menuId: 38,
            category: 1,
            menuName: "토마토 주스",
            price: 4000,
            description: "신선한 토마토의 건강한 맛",
            menuImage: 토마토주스Img
        },
        {
            menuId: 39,
            category: 1,
            menuName: "사과 주스",
            price: 4000,
            description: "상큼한 사과의 자연스러운 달콤함",
            menuImage: 사과주스Img
        },
        */

        // Dessert (category: 2)
        // menuId: 40 ~ 51 까지가 디저트 카테고리 메뉴
        // menuId: 40 ~ 47 까지가 고정 디폴트 메뉴(추가, 삭제, 수정 불가)
        // menuId: 48 ~ 51 까지가 유동 메뉴(추가, 삭제, 수정 가능) 수정은 가격, 설명, 이미지만 가능.
        {
            menuId: 40,
            category: 2,
            menuName: "마카롱",
            price: 4500,
            description: "다양한 맛의 부드럽고 달콤한 마카롱 5종 세트",
            menuImage: 마카롱Img
        },
        {
            menuId: 41,
            category: 2,
            menuName: "푸딩",
            price: 3800,
            description: "부드럽고 달콤한 커스터드 푸딩",
            menuImage: 푸딩Img
        },
        {
            menuId: 42,
            category: 2,
            menuName: "약과",
            price: 4000,
            description: "달콤하고 쫀득한 전통 한국 디저트",
            menuImage: 약과Img
        },
        {
            menuId: 43,
            category: 2,
            menuName: "크로플",
            price: 4500,
            description: "크로와상과 와플의 만남, 바삭하고 달콤한 크로플",
            menuImage: 크로플Img
        },
        {
            menuId: 44,
            category: 2,
            menuName: "치즈케이크",
            price: 5200,
            description: "부드럽고 진한 치즈의 풍미가 일품인 클래식 디저트",
            menuImage: 치즈케이크Img
        },
        {
            menuId: 45,
            category: 2,
            menuName: "브라우니",
            price: 4800,
            description: "진한 초콜릿 맛이 가득한 달콤한 브라우니",
            menuImage: 브라우니Img
        },
        {
            menuId: 46,
            category: 2,
            menuName: "마들렌",
            price: 3500,
            description: "버터 향이 풍부한 프랑스식 마들렌",
            menuImage: 마들렌Img
        },
        {
            menuId: 47,
            category: 2,
            menuName: "티라미수",
            price: 5800,
            description: "커피 향이 가득한 이탈리안 클래식 디저트",
            menuImage: 티라미수Img
        },

        // 유동 메뉴 - Dessert 카테고리
        /*
        {
            menuId: 48,
            category: 2,
            menuName: "스콘",
            price: 3800,
            description: "버터의 풍미가 가득한 영국식 스콘",
            menuImage: 스콘Img
        },
        {
            menuId: 49,
            category: 2,
            menuName: "와플",
            price: 6000,
            description: "겉은 바삭하고 속은 촉촉한 수제 와플",
            menuImage: 와플Img
        },
        {
            menuId: 50,
            category: 2,
            menuName: "에그타르트",
            price: 5000,
            description: "바삭한 페이스트리 속 촉촉한 커스터드 크림이 들어간 타르트",
            menuImage: 에그타르트Img
        },
        {
            menuId: 51,
            category: 2,
            menuName: "애플 파이",
            price: 4800,
            description: "달콤한 사과 필링이 가득한 파이",
            menuImage: 애플파이Img
        },
        */

        // Bakery (category: 3)
        // menuId: 52 ~ 67 까지가 베이커리 카테고리 메뉴
        // menuId: 52 ~ 63 까지가 고정 디폴트 메뉴(추가, 삭제, 수정 불가)
        // menuId: 64 ~ 67 까지가 유동 메뉴(추가, 삭제, 수정 가능) 수정은 가격, 설명, 이미지만 가능.
        {
            menuId: 52,
            category: 3,
            menuName: "베이글",
            price: 3500,
            description: "쫄깃한 식감이 특징인 도넛 모양의 빵",
            menuImage: 베이글Img
        },
        {
            menuId: 53,
            category: 3,
            menuName: "소금빵",
            price: 3800,
            description: "겉은 바삭하고 속은 부드러운 짭짤한 빵",
            menuImage: 소금빵Img
        },
        {
            menuId: 54,
            category: 3,
            menuName: "모카번",
            price: 4000,
            description: "달콤한 커피 향이 가득한 부드러운 빵",
            menuImage: 모카번Img
        },
        {
            menuId: 55,
            category: 3,
            menuName: "바게트",
            price: 3500,
            description: "겉은 바삭하고 속은 쫄깃한 프랑스식 빵",
            menuImage: 바게트Img
        },
        {
            menuId: 56,
            category: 3,
            menuName: "크로아상",
            price: 3800,
            description: "바삭한 겉과 부드러운 속의 조화가 일품인 프랑스 빵",
            menuImage: 크로아상Img
        },
        {
            menuId: 57,
            category: 3,
            menuName: "초코머핀",
            price: 4000,
            description: "진한 초콜릿 맛이 가득한 머핀",
            menuImage: 초코머핀Img
        },
        {
            menuId: 58,
            category: 3,
            menuName: "단팥빵",
            price: 3500,
            description: "달콤한 팥앙금이 들어간 부드러운 빵",
            menuImage: 단팥빵Img
        },
        {
            menuId: 59,
            category: 3,
            menuName: "크림빵",
            price: 4500,
            description: "부드러운 크림이 가득한 빵",
            menuImage: 크림빵Img
        },
        {
            menuId: 60,
            category: 3,
            menuName: "샌드위치",
            price: 5800,
            description: "신선한 야채와 햄을 넣은 샌드위치",
            menuImage: 샌드위치Img
        },
        {
            menuId: 61,
            category: 3,
            menuName: "꽈배기",
            price: 3800,
            description: "달콤한 맛이 일품인 꼬인 모양의 빵",
            menuImage: 꽈배기Img
        },
        {
            menuId: 62,
            category: 3,
            menuName: "소보로빵",
            price: 3800,
            description: "달콤한 소보로 토핑이 올라간 부드러운 빵",
            menuImage: 소보로빵Img
        },
        {
            menuId: 63,
            category: 3,
            menuName: "피자빵",
            price: 4800,
            description: "치즈와 토핑이 가득한 피자 스타일의 빵",
            menuImage: 피자빵Img
        },

        // 유동 메뉴 - Bakery 카테고리
        /*
        {
            menuId: 64,
            category: 3,
            menuName: "허니브레드",
            price: 7000,
            description: "달콤한 꿀과 부드러운 빵의 조화",
            menuImage: 허니브레드Img
        },
        {
            menuId: 65,
            category: 3,
            menuName: "몽블랑",
            price: 5500,
            description: "고급스러운 밤 크림의 풍미가 가득한 빵",
            menuImage: 몽블랑Img
        },
        {
            menuId: 66,
            category: 3,
            menuName: "치아바타",
            price: 4000,
            description: "바삭한 이탈리아식 치아바타",
            menuImage: 치아바타Img
        },
        {
            menuId: 67,
            category: 3,
            menuName: "호밀빵",
            price: 3500,
            description: "건강한 호밀의 풍미가 가득한 빵",
            menuImage: 호밀빵Img
        }
        */

    ]
};

// 추후 API 연동을 위한 함수들
export const getMenuItems = (categoryId) => {
    return menuItems.content.filter(item => item.category === categoryId);
};

export const getAllCategories = () => {
    return categories;
};