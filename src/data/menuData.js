import americanoImg from '../assets/MenuImages/아메리카노.png';
import berryImg from '../assets/MenuImages/베리스무디.png';
import latteImg from '../assets/MenuImages/카페라떼.png';
import honeyBreadImg from '../assets/MenuImages/허니브레드.png';

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
            name: '카페라떼',
            price: 4000,
            description: '진한 에스프레소와 부드러운 우유의 만남',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-3',
            name: '카페모카',
            price: 4500,
            description: '달콤한 초콜릿과 에스프레소의 환상적인 조합',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-4',
            name: '바닐라라떼',
            price: 4300,
            description: '부드러운 바닐라의 향과 에스프레소의 조화',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-5',
            name: '카라멜마끼아또',
            price: 4700,
            description: '달콤한 카라멜과 에스프레소의 특별한 만남',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-6',
            name: '돌체라떼',
            price: 5000,
            description: '연유의 달콤함과 에스프레소의 풍미',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-7',
            name: '콜드브루',
            price: 4800,
            description: '차가운 물로 오랫동안 추출한 깔끔한 커피',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-8',
            name: '에스프레소',
            price: 3000,
            description: '진하고 강렬한 커피의 기본',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-9',
            name: '플랫화이트',
            price: 4200,
            description: '진한 에스프레소와 실키한 우유의 조화',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-10',
            name: '핸드드립 커피',
            price: 5500,
            description: '정성스럽게 한 잔씩 내린 프리미엄 커피',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-11',
            name: '아포가토',
            price: 5800,
            description: '바닐라 아이스크림에 에스프레소를 부은 디저트 커피',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-12',
            name: '티라미수 라떼',
            price: 5500,
            description: '티라미수의 맛을 라떼로 재현한 특별한 음료',
            image: americanoImg,
            category: 'coffee',
            available: true
        }
    ],
    nonCoffee: [
        {
            id: 'non-1',
            name: '라벤더 아이스티',
            price: 4500,
            description: '은은한 라벤더향의 시원한 아이스티',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },
        {
            id: 'non-2',
            name: '그린티 라떼',
            price: 4800,
            description: '진한 녹차와 부드러운 우유의 조합',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },
        {
            id: 'non-3',
            name: '베리 스무디',
            price: 5500,
            description: '신선한 베리의 상큼함이 가득한 스무디',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },
        {
            id: 'non-4',
            name: '망고 스무디',
            price: 5500,
            description: '달콤한 망고의 풍미가 가득한 스무디',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },
        {
            id: 'non-5',
            name: '핫 초콜릿',
            price: 4500,
            description: '부드럽고 달콤한 진한 초콜릿 음료',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },
        {
            id: 'non-6',
            name: '딸기 요구르트',
            price: 5000,
            description: '신선한 딸기와 요구르트의 상큼한 만남',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },
        {
            id: 'non-7',
            name: '자몽 에이드',
            price: 4800,
            description: '상큼한 자몽의 맛이 가득한 시원한 에이드',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },
        {
            id: 'non-8',
            name: '레몬 에이드',
            price: 4800,
            description: '상큼한 레몬의 맛이 가득한 시원한 에이드',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },
        {
            id: 'non-9',
            name: '패션후르츠 티',
            price: 4800,
            description: '열대과일의 향긋한 풍미가 담긴 차',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },
        {
            id: 'non-10',
            name: '얼그레이 티',
            price: 4500,
            description: '베르가못 향이 특징인 클래식한 홍차',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },
        {
            id: 'non-11',
            name: '히비스커스 티',
            price: 4500,
            description: '새콤달콤한 맛이 특징인 붉은색 허브차',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        },
        {
            id: 'non-12',
            name: '캐모마일 티',
            price: 4500,
            description: '은은한 사과향이 나는 편안한 허브차',
            image: berryImg,
            category: 'nonCoffee',
            available: true
        }
    ],
    dessert: [
        // dessert 카테고리 항목 - 카페라떼 이미지 사용
        {
            id: 'dessert-1',
            name: '티라미수',
            price: 5800,
            description: '커피 향이 가득한 이탈리안 클래식 디저트',
            image: latteImg,
            category: 'dessert',
            available: true
        },
        {
            id: 'dessert-2',
            name: '뉴욕 치즈케이크',
            price: 5500,
            description: '부드럽고 진한 치즈의 맛이 일품인 케이크',
            image: latteImg,
            category: 'dessert',
            available: true
        },
        {
            id: 'dessert-3',
            name: '초코 브라우니',
            price: 4800,
            description: '진한 초콜릿의 맛이 가득한 달콤한 브라우니',
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
            name: '마카롱 세트',
            price: 6500,
            description: '다양한 맛의 마카롱 5개 세트',
            image: latteImg,
            category: 'dessert',
            available: true
        },
        {
            id: 'dessert-6',
            name: '스콘',
            price: 3800,
            description: '버터의 풍미가 가득한 영국식 스콘',
            image: latteImg,
            category: 'dessert',
            available: true
        },
        {
            id: 'dessert-7',
            name: '레드벨벳 케이크',
            price: 5500,
            description: '선명한 붉은색과 크림치즈의 조화가 매력적인 케이크',
            image: latteImg,
            category: 'dessert',
            available: true
        },
        {
            id: 'dessert-8',
            name: '아이스크림 와플',
            price: 6000,
            description: '따뜻한 와플 위에 시원한 아이스크림을 올린 디저트',
            image: latteImg,
            category: 'dessert',
            available: true
        }
    ],
    bakery: [
        // bakery 카테고리 항목 - 허니브레드 이미지 사용
        {
            id: 'bakery-1',
            name: '크로아상',
            price: 3800,
            description: '바삭한 겉과 부드러운 속의 조화가 일품인 프랑스 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },
        {
            id: 'bakery-2',
            name: '베이글',
            price: 3500,
            description: '쫄깃한 식감이 특징인 도넛 모양의 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },
        {
            id: 'bakery-3',
            name: '소시지 빵',
            price: 4200,
            description: '소시지를 감싼 부드러운 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },
        {
            id: 'bakery-4',
            name: '초코 머핀',
            price: 4000,
            description: '진한 초콜릿 맛이 가득한 머핀',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },
        {
            id: 'bakery-5',
            name: '블루베리 머핀',
            price: 4000,
            description: '상큼한 블루베리가 들어간 촉촉한 머핀',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },
        {
            id: 'bakery-6',
            name: '단팥빵',
            price: 3500,
            description: '달콤한 팥앙금이 들어간 부드러운 빵',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },
        {
            id: 'bakery-7',
            name: '바게트 샌드위치',
            price: 5800,
            description: '바삭한 바게트에 신선한 야채와 햄을 넣은 샌드위치',
            image: honeyBreadImg,
            category: 'bakery',
            available: true
        },
        {
            id: 'bakery-8',
            name: '에그 샌드위치',
            price: 5500,
            description: '부드러운 계란 샐러드를 넣은 클래식 샌드위치',
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