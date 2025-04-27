import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook para gerenciar o temporizador do pulse e sua lógica de captura
 * @param {Object} options - Opções de configuração
 * @param {number} options.minDuration - Duração mínima em segundos (padrão: 300 - 5 minutos)
 * @param {number} options.maxDuration - Duração máxima em segundos (padrão: 900 - 15 minutos)
 * @param {number} options.pulseDuration - Duração do pulse ativo em segundos (padrão: 30)
 * @param {number} options.superPulseChance - Chance de um Super Pulse (0-1) (padrão: 0.2 - 20%)
 * @param {Function} options.onPulseStart - Callback quando o pulse começa
 * @param {Function} options.onPulseEnd - Callback quando o pulse termina
 * @param {Function} options.onWarning - Callback quando o pulse está próximo
 * @returns {Object} - Estado e funções do temporizador
 */
const usePulseTimer = ({
  minDuration = 300,
  maxDuration = 900,
  pulseDuration = 30,
  superPulseChance = 0.2,
  onPulseStart = () => {},
  onPulseEnd = () => {},
  onWarning = () => {},
  demoMode = false
} = {}) => {
  // Se estiver em modo demo, reduzir os tempos
  if (demoMode) {
    minDuration = 15;
    maxDuration = 60;
    pulseDuration = 15;
  }
  
  // Estado do timer
  const [timeRemaining, setTimeRemaining] = useState(
    Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration
  );
  const [isPulseActive, setIsPulseActive] = useState(false);
  const [isPulseCaptured, setIsPulseCaptured] = useState(false);
  const [isSuperPulse, setIsSuperPulse] = useState(false);
  
  // Refs para controle de timeout
  const pulseTimeoutRef = useRef(null);
  
  // Iniciar um novo temporizador com duração aleatória
  const startNewTimer = useCallback(() => {
    const newDuration = Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration;
    setTimeRemaining(newDuration);
    setIsPulseActive(false);
    setIsPulseCaptured(false);
    setIsSuperPulse(false);
  }, [minDuration, maxDuration]);
  
  // Formatar tempo no formato MM:SS
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);
  
  // Capturar pulse
  const capturePulse = useCallback(() => {
    if (isPulseActive && !isPulseCaptured) {
      setIsPulseCaptured(true);
      return {
        success: true,
        isSuperPulse,
        creditCost: isSuperPulse ? 3 : 1
      };
    }
    return {
      success: false,
      isSuperPulse,
      creditCost: 0
    };
  }, [isPulseActive, isPulseCaptured, isSuperPulse]);
  
  // Efeito para o timer de contagem regressiva
  useEffect(() => {
    // Alertar quando o pulse estiver próximo
    if (timeRemaining === 10 && !isPulseActive) {
      onWarning();
    }
    
    if (timeRemaining <= 0) {
      // Determinar se é um super pulse
      const superPulse = Math.random() < superPulseChance;
      setIsSuperPulse(superPulse);
      
      // Ativar o pulse
      setIsPulseActive(true);
      
      // Notificar início do pulse
      onPulseStart({
        isSuperPulse: superPulse,
        duration: pulseDuration
      });
      
      // Configurar timeout para encerrar o pulse
      pulseTimeoutRef.current = setTimeout(() => {
        setIsPulseActive(false);
        setIsPulseCaptured(false);
        setIsSuperPulse(false);
        
        // Notificar fim do pulse
        onPulseEnd({
          wasCaptured: isPulseCaptured,
          isSuperPulse: superPulse
        });
        
        // Iniciar novo timer
        startNewTimer();
      }, pulseDuration * 1000);
      
      return;
    }
    
    // Decrementar timer a cada segundo
    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      if (pulseTimeoutRef.current) {
        clearTimeout(pulseTimeoutRef.current);
      }
    };
  }, [timeRemaining, isPulseActive, isPulseCaptured, superPulseChance, 
      pulseDuration, onPulseStart, onPulseEnd, onWarning, startNewTimer]);
  
  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    isPulseActive,
    isPulseCaptured,
    isSuperPulse,
    capturePulse,
    resetTimer: startNewTimer
  };
};

export default usePulseTimer;