// Howler.js를 이용한 오디오 관리 유틸리티
import { Howl } from 'howler';

// 현재 재생 중인 오디오 트래킹
//let currentSound = null;

// 오디오 맵 객체 (Howl 인스턴스)
const audioMap = {
    // 효과음
    wakeSound: new Howl({
        src: ['/audio/effects/wake-sound.mp3'],
        volume: 0.8
    }),

    // 안내 음성
    welcome: new Howl({
        src: ['/audio/voices/welcome.mp3'],
        volume: 0.8
    }),
    menuAdded: new Howl({
        src: ['/audio/voices/menu-added.mp3'],
        volume: 0.8
    }),
    menuRemoved: new Howl({
        src: ['/audio/voices/menu-removed.mp3'],
        volume: 0.8
    }),
    cartCleared: new Howl({
        src: ['/audio/voices/cart-cleared.mp3'],
        volume: 0.8
    }),
    selectPayment: new Howl({
        src: ['/audio/voices/select-payment.mp3'],
        volume: 0.8
    }),
    thankYou: new Howl({
        src: ['/audio/voices/thank-you.mp3'],
        volume: 0.8
    }),
    tryAgain: new Howl({
        src: ['/audio/voices/try-again.mp3'],
        volume: 0.8
    }),
    orderCheck: new Howl({
        src: ['/audio/voices/order-check.mp3'],
        volume: 0.8
    }),
    moveToCoffee: new Howl({
        src: ['/audio/voices/move-to-coffee.mp3'],
        volume: 0.8
    }),
    moveToNonCoffee: new Howl({
        src: ['/audio/voices/move-to-noncoffee.mp3'],
        volume: 0.8
    }),
    moveToDessert: new Howl({
        src: ['/audio/voices/move-to-dessert.mp3'],
        volume: 0.8
    }),
    moveToBakery: new Howl({
        src: ['/audio/voices/move-to-bakery.mp3'],
        volume: 0.8
    }),
    recommendedMenu: new Howl({
        src: ['/audio/voices/recommended-menu.mp3'],
        volume: 0.8
    })
};

// 오디오 재생 함수<간단한 버전>
export const playAudio = (key) => {
    const sound = audioMap[key];
    if (sound) {
        sound.stop(); // 중복 방지
        sound.play();
    }
};

/*
// 오디오 재생 함수<상세한 버전>
export const playAudio = (key, interruptCurrent = true) => {
    return new Promise((resolve, reject) => {
        const sound = audioMap[key];

        if (!sound) {
            console.warn(`정의되지 않은 오디오 키: ${key}`);
            reject(new Error(`정의되지 않은 오디오 키: ${key}`));
            return;
        }

        // 현재 재생 중인 오디오가 있고, 중단 옵션이 켜져 있을 경우
        if (currentSound && interruptCurrent && currentSound.playing()) {
            currentSound.stop();
        }

        // 오디오 재생 완료 이벤트 설정
        sound.once('end', () => {
            resolve();
        });

        // 오류 처리
        sound.once('loaderror', (id, err) => {
            console.warn(`오디오 (${key}) 로드 실패:`, err);
            reject(err);
        });

        sound.once('playerror', (id, err) => {
            console.warn(`오디오 (${key}) 재생 실패:`, err);
            reject(err);
        });

        // 재생
        try {
            sound.play();
            currentSound = sound;
        } catch (err) {
            console.warn(`오디오 (${key}) 재생 시도 중 오류:`, err);
            reject(err);
        }
    });
};
*/

// // 모든 오디오 중지
// export const stopAllAudio = () => {
//     if (currentSound) {
//         currentSound.stop();
//         currentSound = null;
//     }
// };