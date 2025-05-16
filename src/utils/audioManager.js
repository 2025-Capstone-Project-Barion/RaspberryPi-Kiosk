/**
 * 키오스크 음성 안내 및 효과음 관리 유틸리티
 * 모든 음성 안내와 효과음을 한 곳에서 관리하고 재생합니다.
 */

// 현재 재생 중인 오디오 트래킹 (중복 재생 방지용)
let currentlyPlaying = null;

// 오디오 사전 로드 및 관리를 위한 맵 객체
const audioMap = {
    // 효과음
    wakeSound: new Audio('/audio/effects/wake-sound.mp3'),

    // 안내 음성
    welcome: new Audio('/audio/voices/welcome.mp3'),
    menuAdded: new Audio('/audio/voices/menu-added.mp3'),
    menuRemoved: new Audio('/audio/voices/menu-removed.mp3'),
    cartCleared: new Audio('/audio/voices/cart-cleared.mp3'),
    selectPayment: new Audio('/audio/voices/select-payment.mp3'),
    thankYou: new Audio('/audio/voices/thank-you.mp3'),
    tryAgain: new Audio('/audio/voices/try-again.mp3')
};

// 오디오 볼륨 기본 설정
Object.values(audioMap).forEach(audio => {
    audio.volume = 0.8; // 80% 볼륨으로 설정
});

// 효과음은 볼륨을 약간 낮게 설정
audioMap.wakeSound.volume = 0.6;

/**
 * 지정된 오디오를 재생합니다.
 * @param {string} key - 재생할 오디오 키
 * @param {boolean} [interruptCurrent=true] - 현재 재생 중인 오디오를 중단하고 재생할지 여부
 * @returns {Promise} - 오디오 재생 완료 시 resolve되는 Promise
 */
export const playAudio = (key, interruptCurrent = true) => {
    return new Promise((resolve, reject) => {
        const audio = audioMap[key];

        if (!audio) {
            console.warn(`정의되지 않은 오디오 키: ${key}`);
            reject(new Error(`정의되지 않은 오디오 키: ${key}`));
            return;
        }

        // 현재 재생 중인 오디오가 있고, 중단 옵션이 켜져 있을 경우
        if (currentlyPlaying && interruptCurrent) {
            currentlyPlaying.pause();
            currentlyPlaying.currentTime = 0;
        }

        // 오디오 재생 완료 이벤트 설정
        const handleEnded = () => {
            audio.removeEventListener('ended', handleEnded);
            currentlyPlaying = null;
            resolve();
        };

        // 재생 완료 감지를 위한 이벤트 리스너 등록
        audio.addEventListener('ended', handleEnded);

        // 항상 처음부터 재생하기 위해 시간 초기화
        audio.currentTime = 0;

        // 오디오 재생 및 예외 처리
        audio.play().catch(err => {
            console.warn(`오디오 (${key}) 재생 실패:`, err);
            reject(err);
        });

        // 현재 재생 중인 오디오 설정
        currentlyPlaying = audio;
    });
};

/**
 * 현재 재생 중인 모든 오디오를 중지합니다.
 */
export const stopAllAudio = () => {
    if (currentlyPlaying) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;
        currentlyPlaying = null;
    }
};