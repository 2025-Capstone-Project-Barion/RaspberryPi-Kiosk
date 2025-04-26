import americanoImg from '../assets/Image/MenuImages/아메리카노.png';
import berryImg from '../assets/Image/MenuImages/베리스무디.png';
import latteImg from '../assets/Image/MenuImages/카페라떼.png';
import honeyBreadImg from '../assets/Image/MenuImages/허니브레드.png';

export const categories = [
    {
        id: 'coffee',
        name: 'Coffee',
        description: '다양한 커피 메뉴'
    },
    {
        id: 'nonCoffee',
        name: 'Non Coffee',
        description: '논커피 음료'
    },
    {
        id: 'dessert',
        name: 'Dessert',
        description: '디저트'
    },
    {
        id: 'bakery',
        name: 'Bakery',
        description: '베이커리'
    }
];

//default menu items
// 각 카테고리별 기본 메뉴 아이템들. 추후 백엔드 DB에서 메뉴가 추가/삭제시 실시간으로 이 menuItems를 업데이트 할 수 있도록 백엔드 API 연동 필요.
export const menuItems = {

    coffee: [
        // 1. 에스프레소 기반 커피
        {
            id: 'coffee-1',
            name: '아메리카노',
            price: 3500,
            description: '깊은 풍미의 에스프레소와 물의 조화',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-2',
            name: '에스프레소',
            price: 3000,
            description: '진하고 강렬한 커피의 기본',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-3',
            name: '아이스커피',
            price: 4000,
            description: '시원하고 깔끔한 맛의 아이스커피',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-4',
            name: '콜드브루',
            price: 4800,
            description: '차가운 물로 오랫동안 추출한 깔끔한 커피',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-5',
            name: '핸드드립',
            price: 5500,
            description: '정성스럽게 한 잔씩 내린 프리미엄 커피',
            image: americanoImg,
            category: 'coffee',
            available: true
        },

        // 2. 우유 베이스 커피 (라떼류)
        {
            id: 'coffee-6',
            name: '카페라떼',
            price: 4000,
            description: '진한 에스프레소와 부드러운 우유의 만남',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-7',
            name: '바닐라라떼',
            price: 4300,
            description: '부드러운 바닐라의 향과 에스프레소의 조화',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-8',
            name: '카푸치노',
            price: 4700,
            description: '풍성한 우유 거품이 특징인 부드러운 커피',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-9',
            name: '돌체라떼',
            price: 5000,
            description: '연유의 달콤함과 에스프레소의 풍미',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-10',
            name: '플랫화이트',
            price: 4200,
            description: '진한 에스프레소와 실키한 우유의 조화',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-11',
            name: '연유라떼',
            price: 4500,
            description: '달콤한 연유가 들어간 부드러운 라떼',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-12',
            name: '코코넛라떼',
            price: 4700,
            description: '상큼한 코코넛 맛이 어우러진 라떼',
            image: americanoImg,
            category: 'coffee',
            available: true
        },

        // 3. 모카/초콜릿 계열
        {
            id: 'coffee-13',
            name: '카페모카',
            price: 4500,
            description: '달콤한 초콜릿과 에스프레소의 환상적인 조합',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-14',
            name: '민트모카',
            price: 4900,
            description: '상쾌한 민트와 초콜릿의 조화',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-15',
            name: '화이트모카',
            price: 5000,
            description: '부드러운 화이트 초콜릿과 에스프레소의 만남',
            image: americanoImg,
            category: 'coffee',
            available: true
        },

        // 4. 스페셜 커피
        {
            id: 'coffee-16',
            name: '아포가토',
            price: 5800,
            description: '바닐라 아이스크림에 에스프레소를 부은 디저트 커피',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-17',
            name: '마키아토',
            price: 5000,
            description: '달콤한 카라멜과 에스프레소의 조화',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-18',
            name: '아인슈페너',
            price: 5200,
            description: '빈티지한 독일식 커피 음료',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-19',
            name: '비엔나커피',
            price: 4800,
            description: '휘핑크림이 올라간 고급스러운 커피',
            image: americanoImg,
            category: 'coffee',
            available: true
        }
    ],

    nonCoffee: [

        {
            id: 'non-1',
            name: '밀크티',
            price: 4300,
            description: '홍차와 우유의 클래식한 조합',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-2',
            name: '버블티',
            price: 5000,
            description: '부드러운 밀크티와 쫄깃한 타피오카 펄의 조화',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-3',
            name: '핫초코',
            price: 4500,
            description: '부드럽고 달콤한 진한 초콜릿 음료',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-4',
            name: '생강차',
            price: 4500,
            description: '따뜻하고 건강한 생강 향의 차',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-5',
            name: '라벤더 티',
            price: 4500,
            description: '은은한 라벤더 향이 가득한 허브차',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-6',
            name: '유자차',
            price: 5000,
            description: '상큼한 유자 맛이 가득한 따뜻한 차',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-7',
            name: '녹차 라떼',
            price: 4800,
            description: '진한 녹차와 부드러운 우유의 조합',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-8',
            name: '고구마 라떼',
            price: 4700,
            description: '달콤한 고구마 맛이 듬뿍 들어간 라떼',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-9',
            name: '곡물 라떼',
            price: 4500,
            description: '고소한 곡물 향이 가득한 라떼',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-10',
            name: '아이스티',
            price: 4500,
            description: '향긋한 복숭아향의 시원한 아이스티',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-11',
            name: '프라페',
            price: 5500,
            description: '달콤하고 시원한 초콜릿 블렌디드 음료',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-12',
            name: '미숫가루',
            price: 4500,
            description: '고소한 곡물 맛이 가득한 전통 음료',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-13',
            name: '딸기 스무디',
            price: 5500,
            description: '신선한 딸기의 상큼함이 가득한 스무디',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-14',
            name: '망고 스무디',
            price: 5500,
            description: '달콤한 망고의 풍미가 가득한 스무디',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },


        {
            id: 'non-15',
            name: '자몽 에이드',
            price: 4800,
            description: '상큼한 자몽의 맛이 가득한 시원한 에이드',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-16',
            name: '레몬 에이드',
            price: 4800,
            description: '상큼한 레몬의 맛이 가득한 시원한 에이드',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-17',
            name: '청포도 에이드',
            price: 4800,
            description: '상큼한 청포도의 맛이 가득한 에이드',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-18',
            name: '유자 에이드',
            price: 4800,
            description: '상큼한 유자 맛이 가득한 에이드',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-19',
            name: '포도 주스',
            price: 4000,
            description: '신선한 포도의 달콤함이 가득한 주스',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-20',
            name: '토마토 주스',
            price: 4000,
            description: '신선한 토마토의 건강한 맛',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },

        {
            id: 'non-21',
            name: '사과 주스',
            price: 4000,
            description: '상큼한 사과의 자연스러운 달콤함',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        }
    ],

    dessert: [
        // dessert 카테고리 항목 - 카페라떼 이미지 사용
        {
            id: 'dessert-1',
            name: '마카롱',
            price: 4500,
            description: '다양한 맛의 부드럽고 달콤한 마카롱 5종 세트',
            image: latteImg,
            category: 'dessert',
            available: true
        },

        {
            id: 'dessert-2',
            name: '푸딩',
            price: 3800,
            description: '부드럽고 달콤한 커스터드 푸딩',
            image: latteImg,
            category: 'dessert',
            available: true
        },

        {
            id: 'dessert-3',
            name: '약과',
            price: 4000,
            description: '달콤하고 쫀득한 전통 한국 디저트',
            image: latteImg,
            category: 'dessert',
            available: true
        },

        {
            id: 'dessert-4',
            name: '크로플',
            price: 4500,
            description: '크로와상과 와플의 만남, 바삭하고 달콤한 크로플',
            image: latteImg,
            category: 'dessert',
            available: true
        },

        {
            id: 'dessert-5',
            name: '치즈케이크',
            price: 5200,
            description: '부드럽고 진한 치즈의 풍미가 일품인 클래식 디저트',
            image: latteImg,
            category: 'dessert',
            available: true
        },

        {
            id: 'dessert-6',
            name: '브라우니',
            price: 4800,
            description: '진한 초콜릿 맛이 가득한 달콤한 브라우니',
            image: latteImg,
            category: 'dessert',
            available: true
        },

        {
            id: 'dessert-7',
            name: '마들렌',
            price: 3500,
            description: '버터 향이 풍부한 프랑스식 마들렌',
            image: latteImg,
            category: 'dessert',
            available: true
        },

        {
            id: 'dessert-8',
            name: '티라미수',
            price: 5800,
            description: '커피 향이 가득한 이탈리안 클래식 디저트',
            image: latteImg,
            category: 'dessert',
            available: true
        },

        {
            id: 'dessert-9',
            name: '스콘',
            price: 3800,
            description: '버터의 풍미가 가득한 영국식 스콘',
            image: latteImg,
            category: 'dessert',
            available: true
        },

        {
            id: 'dessert-10',
            name: '와플',
            price: 6000,
            description: '겉은 바삭하고 속은 촉촉한 수제 와플',
            image: latteImg,
            category: 'dessert',
            available: true
        },

        {
            id: 'dessert-11',
            name: '에그타르트',
            price: 5000,
            description: '바삭한 페이스트리 속 촉촉한 커스터드 크림이 들어간 타르트',
            image: latteImg,
            category: 'dessert',
            available: true
        },

        {
            id: 'dessert-12',
            name: '애플 파이',
            price: 4800,
            description: '달콤한 사과 필링이 가득한 파이',
            image: latteImg,
            category: 'dessert',
            available: true
        }
    ],

    bakery: [
        // bakery 카테고리 항목 - 허니브레드 이미지 사용
        {
            id: 'bakery-1',
            name: '베이글',
            price: 3500,
            description: '쫄깃한 식감이 특징인 도넛 모양의 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },

        {
            id: 'bakery-2',
            name: '소금빵',
            price: 3800,
            description: '겉은 바삭하고 속은 부드러운 짭짤한 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },

        {
            id: 'bakery-3',
            name: '모카번',
            price: 4000,
            description: '달콤한 커피 향이 가득한 부드러운 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },

        {
            id: 'bakery-4',
            name: '바게트',
            price: 3500,
            description: '겉은 바삭하고 속은 쫄깃한 프랑스식 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },

        {
            id: 'bakery-5',
            name: '크로아상',
            price: 3800,
            description: '바삭한 겉과 부드러운 속의 조화가 일품인 프랑스 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },

        {
            id: 'bakery-6',
            name: '초코머핀',
            price: 4000,
            description: '진한 초콜릿 맛이 가득한 머핀',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },

        {
            id: 'bakery-7',
            name: '단팥빵',
            price: 3500,
            description: '달콤한 팥앙금이 들어간 부드러운 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },

        {
            id: 'bakery-8',
            name: '크림빵',
            price: 4500,
            description: '부드러운 크림이 가득한 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },
        {
            id: 'bakery-9',
            name: '샌드위치',
            price: 5800,
            description: '신선한 야채와 햄을 넣은 샌드위치',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },
        {
            id: 'bakery-10',
            name: '꽈배기',
            price: 3800,
            description: '달콤한 맛이 일품인 꼬인 모양의 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },

        {
            id: 'bakery-11',
            name: '소보로빵',
            price: 3800,
            description: '달콤한 소보로 토핑이 올라간 부드러운 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },

        {
            id: 'bakery-12',
            name: '피자빵',
            price: 4800,
            description: '치즈와 토핑이 가득한 피자 스타일의 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },

        {
            // 허니브레드
            id: 'bakery-13',
            name: '허니브레드',
            price: 7000,
            description: '달콤한 꿀과 부드러운 빵의 조화',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },

        {
            id: 'bakery-14',
            name: '몽블랑',
            price: 5500,
            description: '고급스러운 밤 크림의 풍미가 가득한 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },

        {
            id: 'bakery-15',
            name: '치아바타',
            price: 4000,
            description: '바삭한 이탈리아식 치아바타',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },

        {
            id: 'bakery-16',
            name: '호밀빵',
            price: 3500,
            description: '건강한 호밀의 풍미가 가득한 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        }

    ]
};

// 추후 API 연동을 위한 함수들
export const getMenuItems = (category) => {
    return menuItems[category] || [];
};

export const getAllCategories = () => {
    return categories;
};