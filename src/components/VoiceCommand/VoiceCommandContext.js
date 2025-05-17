import { createContext, useState, useContext, useCallback } from 'react';

// Context 생성
const VoiceCommandContext = createContext(null);

/**
 * 음성 명령 시스템의 상태를 전역적으로 관리하는 Provider
 */
export const VoiceCommandProvider = ({ children }) => {
    // 음성 명령 결과 상태
    const [commandResult, setCommandResult] = useState(null);

    // 음성 인식 UI 표시 상태
    const [isListening, setIsListening] = useState(false);

    // 마지막 음성 명령 타임스탬프
    const [lastCommandTimestamp, setLastCommandTimestamp] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);

    // 음성 명령 처리 함수
    const handleVoiceCommand = useCallback((result) => {
        console.log('음성 명령 감지:', result);
        setCommandResult(result);
        setLastCommandTimestamp(new Date().getTime());

        // 5초 후에 commandResult 초기화 (중복 처리 방지)
        // setTimeout(() => {
        //     setCommandResult(null);
        // }, 5000);
    }, []);

    // 음성 인식 상태 설정 함수
    const setListeningState = useCallback((state) => {
        setIsListening(state);
    }, []);

    // 음성 명령 처리 후 초기화 함수 추가
    const resetVoiceCommand = useCallback(() => {
        setCommandResult(null);
    }, []);

    // Provider 값
    const value = {
        commandResult,
        isListening,
        lastCommandTimestamp,
        dialogOpen,
        setDialogOpen,
        handleVoiceCommand,
        resetVoiceCommand,  // 초기화 함수 추가
        setListeningState
    };

    return (
        <VoiceCommandContext.Provider value={value}>
            {children}
        </VoiceCommandContext.Provider>
    );
};

/**
 * 음성 명령 Context를 사용하기 위한 커스텀 Hook
 */
export const useVoiceCommand = () => {
    const context = useContext(VoiceCommandContext);
    if (!context) {
        throw new Error('useVoiceCommand는 VoiceCommandProvider 내에서만 사용할 수 있습니다');
    }
    return context;
};