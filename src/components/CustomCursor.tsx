import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useSite } from '../context/SiteContext';

export const CustomCursor: React.FC = () => {
  const { config } = useSite();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTextTarget, setIsTextTarget] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | 'none'>('none');
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [hasMouseActivity, setHasMouseActivity] = useState(false);

  // Position references
  const lastPosRef = useRef({ x: -100, y: -100 });
  const scrollTimeoutRef = useRef<number | null>(null);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Center pinpoint dot spring physics (ultra-responsive, instant tracking)
  const dotSpringConfig = { stiffness: 1200, damping: 50, mass: 0.08 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // Outer follower round animation (fluid, smooth inertia lag)
  const ringSpringConfig = { stiffness: 280, damping: 26, mass: 0.35 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    // Check if the user is on a touch-first device with zero fine pointer
    const isTouchOnly =
      'ontouchstart' in window &&
      window.matchMedia &&
      window.matchMedia('(pointer: coarse) and (hover: none)').matches;

    if (isTouchOnly) {
      return;
    }

    // Function to check element currently underneath the mouse
    const checkTargetAt = (clientX: number, clientY: number) => {
      const target = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'button, a, [role="button"], input, textarea, select, label, .glass-card, [data-cursor], .cursor-pointer, summary'
      );

      if (interactiveEl) {
        setIsHovered(true);
        const customCursorText = interactiveEl.getAttribute('data-cursor');
        setHoverText(customCursorText || null);

        const isInput =
          interactiveEl.tagName === 'INPUT' ||
          interactiveEl.tagName === 'TEXTAREA' ||
          Boolean((interactiveEl as HTMLElement).isContentEditable);
        setIsTextTarget(isInput);
      } else {
        setIsHovered(false);
        setHoverText(null);
        setIsTextTarget(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!hasMouseActivity) {
        setHasMouseActivity(true);
        document.documentElement.classList.add('custom-cursor-active');
      }

      if (!isVisible) setIsVisible(true);
      checkTargetAt(e.clientX, e.clientY);
    };

    // Smooth scroll & mouse wheel reaction
    const handleWheel = (e: WheelEvent) => {
      setIsScrolling(true);
      if (e.deltaY > 0) {
        setScrollDirection('down');
      } else if (e.deltaY < 0) {
        setScrollDirection('up');
      }

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
        setScrollDirection('none');
      }, 180);

      checkTargetAt(lastPosRef.current.x, lastPosRef.current.y);
    };

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
        setScrollDirection('none');
      }, 180);

      checkTargetAt(lastPosRef.current.x, lastPosRef.current.y);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [hasMouseActivity, isVisible, mouseX, mouseY]);

  // If mouse has not moved yet or user is on touch-only device, keep hidden until first movement
  if (!hasMouseActivity && !isVisible) {
    return null;
  }

  const accentColor = config.primaryColorLight || '#3B82F6';
  const primaryBrand = config.primaryColor || '#2563EB';

  // Compute outer dimensions & scale dynamically
  let ringSize = 40;
  let scaleX = 1;
  let scaleY = 1;

  if (isTextTarget) {
    ringSize = 26;
  } else if (hoverText) {
    ringSize = 78;
  } else if (isHovered) {
    ringSize = 60;
  } else if (isClicked) {
    ringSize = 32;
    scaleX = 0.9;
    scaleY = 0.9;
  } else if (isScrolling) {
    ringSize = 48;
    if (scrollDirection === 'down') {
      scaleY = 1.2;
      scaleX = 0.85;
    } else if (scrollDirection === 'up') {
      scaleY = 1.2;
      scaleX = 0.85;
    }
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[999999] select-none overflow-hidden transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* 1. Ambient Glow Aura that glides behind the cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 130 : isScrolling ? 100 : 70,
          height: isHovered ? 130 : isScrolling ? 100 : 70,
          background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
          filter: 'blur(8px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 24,
        }}
      />

      {/* 2. Outer Smooth Round Follower Ring / Hover Animation */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          scaleX,
          scaleY,
          backgroundColor: isHovered
            ? 'rgba(255, 255, 255, 0.09)'
            : isScrolling
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(255, 255, 255, 0.02)',
          borderColor: isHovered
            ? accentColor
            : isScrolling
            ? accentColor
            : 'rgba(255, 255, 255, 0.3)',
          borderWidth: isHovered || isScrolling ? '1.5px' : '1px',
          boxShadow: isHovered
            ? `0 0 30px -2px ${accentColor}60, inset 0 0 14px ${accentColor}25`
            : isScrolling
            ? `0 0 20px -2px ${accentColor}40, inset 0 0 10px ${accentColor}20`
            : '0 0 14px rgba(0, 0, 0, 0.3)',
          backdropFilter: isHovered ? 'blur(3px)' : 'none',
        }}
        transition={{
          type: 'spring',
          stiffness: 320,
          damping: 22,
        }}
      >
        {/* Contextual Action Pill (e.g. "CASE STUDY", "VIEW", "EXPLORE") */}
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-[9px] font-mono tracking-widest text-white uppercase font-extrabold select-none pointer-events-none"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>

      {/* 3. Center Precision Pinpoint Dot replacing the mouse arrow tip */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isHovered ? '#ffffff' : accentColor,
        }}
        animate={{
          width: isTextTarget ? 2 : isHovered ? (hoverText ? 0 : 5) : isClicked ? 10 : 6,
          height: isTextTarget ? 16 : isHovered ? (hoverText ? 0 : 5) : isClicked ? 10 : 6,
          opacity: hoverText ? 0 : 1,
          boxShadow: isHovered ? `0 0 14px #ffffff` : `0 0 12px ${accentColor}`,
        }}
        transition={{
          type: 'spring',
          stiffness: 900,
          damping: 38,
        }}
      />
    </div>
  );
};
