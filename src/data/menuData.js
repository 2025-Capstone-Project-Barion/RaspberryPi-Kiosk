import americanoImg from '../assets/MenuImages/아메리카노.png';
import berryImg from '../assets/MenuImages/베리스무디.png';

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
    }
];

//default menu items
// 각 카테고리별 기본 메뉴 아이템들. 추후 백엔드 DB에서 메뉴가 추가/삭제시 실시간으로 이 menuItems를 업데이트 할 수 있도록 백엔드 API 연동 필요.
export const menuItems = {
    coffee: [
        {
            id: 'coffee-1',
            name: '아메리카노',
            price: 2500,
            description: '깊은 풍미의 에스프레소와 물의 조화',
            image: americanoImg,
            category: 'coffee',
            available: true
        },
        {
            id: 'coffee-2',
            name: '초코라떼',
            price: 4300,
            description: '달콤한 초콜릿과 에스프레소의 만남',
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
        }
    ],
    dessert: [
        {
            id: 'dessert-1',
            name: '[SET] 에그 샌드위치',
            price: 5800,
            description: '신선한 계란으로 만든 클래식 샌드위치',
            image: berryImg,
            category: 'dessert',
            available: true
        },
        {
            id: 'dessert-2',
            name: '[SET] 먼치킨 케이크',
            price: 5500,
            description: '달콤한 먼치킨 케이크',
            image: berryImg,
            category: 'dessert',
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