import apiGateway from '@src/utils/apiGateway';
import React, { useEffect, useRef } from 'react';
import logo from "@img/logo2.png"
interface Sponsor {
    id: number;
    name: string;
    logo: string;
    url: string;
}


const Sponsors: React.FC = () => {
    const sponsors: Sponsor[] = [
        { id: 1, name: 'Sponsor 1', logo: logo, url: '#' },
        { id: 2, name: 'Sponsor 2', logo: logo, url: '#' },
        { id: 3, name: 'Sponsor 3', logo: logo, url: '#' },
        { id: 4, name: 'Sponsor 4', logo: logo, url: '#' },
        { id: 5, name: 'Sponsor 5', logo: logo, url: '#' },
        { id: 6, name: 'Sponsor 6', logo: logo, url: '#' },
        { id: 7, name: 'Sponsor 7', logo: logo, url: '#' },
        { id: 8, name: 'Sponsor 8', logo: logo, url: '#' },
        { id: 9, name: 'Sponsor 9', logo: logo, url: '#' },
        { id: 10, name: 'Sponsor 10', logo: logo, url: '#' },
        { id: 11, name: 'Sponsor 11', logo: logo, url: '#' },
        { id: 12, name: 'Sponsor 12', logo: logo, url: '#' },
    ];

    const scrollerRef = useRef<HTMLDivElement>(null);
    const scrollerInnerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollerRef.current || !scrollerInnerRef.current) return;

        const scroller = scrollerRef.current;
        const scrollerInner = scrollerInnerRef.current;

        // Duplicate the sponsors for seamless looping
        scrollerInner.innerHTML = '';
        const content = sponsors.map(sponsor => (
            `<a href="${sponsor.url}" key="${sponsor.id}" class="relative rounded-lg px-4 py-2 flex items-center justify-center w-[200px] h-[100px] flex-shrink-0">
        <img src="${sponsor.logo}" alt="${sponsor.name}" class="max-w-[160px] max-h-[80px] object-contain" />
      </a>`
        )).join('');

        scrollerInner.innerHTML = content + content;

        let animationFrameId: number;
        let speed = 1; // pixels per frame
        let position = 0;
        const maxPosition = scrollerInner.scrollWidth / 2;

        const animate = () => {
            position += speed;

            // Reset position when half way to create infinite loop
            if (position >= maxPosition) {
                position = 0;
            }

            scroller.scrollLeft = position;
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        // Pause on hover
        const handleMouseEnter = () => {
            speed = 0;
        };

        const handleMouseLeave = () => {
            speed = 1;
        };

        scroller.addEventListener('mouseenter', handleMouseEnter);
        scroller.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            scroller.removeEventListener('mouseenter', handleMouseEnter);
            scroller.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [sponsors]);

    return (
        <section className="py-12 sm:px-32 bg-gray-50 w-full">
            <div className="  px-4">
                <div className="sm:text-3xl text-2xl font-bold text-center mb-8">Trusted by the best</div>

                <div
                    ref={scrollerRef}
                    className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
                >
                    <div
                        ref={scrollerInnerRef}
                        className="flex items-center justify-center md:justify-start gap-8"
                    />
                </div>
            </div>
        </section>
    );
};

export default Sponsors;